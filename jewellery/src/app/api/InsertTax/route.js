"use server";
import { NextResponse } from "next/server";
import { getDBConnection } from "../../../../lib/db";

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const body = requestBody.data;

        const pool = await getDBConnection();
        const requestDB = pool.request();

           // Auto-generate next 3-digit category code
           const getMaxCodeQuery = `SELECT MAX(CAST(taxcode AS INT)) AS maxCode FROM ms_tax`;
           const maxCodeResult = await requestDB.query(getMaxCodeQuery);
   
           const nextCode = (parseInt(maxCodeResult.recordset[0].maxCode || "0", 10) + 1)
               .toString()
               .padStart(3, "0"); // Format to 3-digit (e.g., "001", "045")
        
        requestDB.input("taxcode",nextCode);
        requestDB.input("taxname", body.TaxName);
        requestDB.input("taxpercentage", body.TaxPercentage);
        requestDB.input("status", "Active");
        requestDB.input("createdby", body.createdby || "Admin");

         // Execute stored procedure
        const query = `INSERT INTO ms_tax (taxcode, taxname, taxpercentage, status, createdby)
                       OUTPUT INSERTED.taxcode  -- Return inserted taxcode
                       VALUES (@taxcode, @taxname, @taxpercentage, @status, @createdby);
`;
        const qryExec = await requestDB.query(query);

        if (qryExec.recordsets && qryExec.recordsets.length > 0) {
            return NextResponse.json(
                {
                    Output: {
                        status: {
                            code: 200,
                            message: "Saved Successfully",
                        },
                        data: qryExec.recordsets[0],
                    },
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    Output: {
                        status: {
                            code: 400,
                            message: "No records found",
                        },
                        data: [],
                    },
                },
                { status: 400 }
            );
        }
    } catch (err) {
        return NextResponse.json(
            {
                Output: {
                    status: { code: 500, message: err.message },
                },
            },
            { status: 500 }
        );
    }
}

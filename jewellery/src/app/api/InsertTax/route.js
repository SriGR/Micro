"use server";
import { NextResponse } from "next/server";
import { getDBConnection } from "../../../../lib/db";

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const body = requestBody.data;

        const pool = await getDBConnection();
        const requestDB = pool.request();

        requestDB.input("taxcode", body.TaxCode);
        requestDB.input("taxname", body.TaxName);
        requestDB.input("taxpercentage", body.TaxPercentage);
        requestDB.input("status", "Active");
        requestDB.input("createdby", body.createdby || "Admin");

        const checkQuery = `SELECT taxcode FROM ms_tax WHERE taxcode = @taxcode`;
        const checkResult = await requestDB.query(checkQuery);

        if (checkResult.recordset.length > 0) {
            return NextResponse.json(
                {
                    Output: {
                        status: {
                            code: 400,
                            message: "FAILED: Tax Code Already Exists",
                        },
                        data: checkResult.recordset[0],
                    },
                },
                { status: 200 }
            );
        }

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

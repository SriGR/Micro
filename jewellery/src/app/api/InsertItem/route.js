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
        const getMaxCodeQuery = `SELECT MAX(CAST(itemcode AS INT)) AS maxCode FROM ms_item`;
        const maxCodeResult = await requestDB.query(getMaxCodeQuery);

        const nextCode = (parseInt(maxCodeResult.recordset[0].maxCode || "0", 10) + 1)
            .toString()
            .padStart(3, "0"); // Format to 3-digit (e.g., "001", "045")


        requestDB.input("itemcode", nextCode);
        requestDB.input("itemname", body.itemname);
        requestDB.input("hsncode", body.hsncode);
        requestDB.input("uomname", body.uomname);
        requestDB.input("categorycode", body.categorycode);
        requestDB.input("taxcode", body.taxcode);
        requestDB.input("status", body.status);
        requestDB.input("createdby", body.createdby);
        requestDB.input("extra", "");

        const query = `INSERT INTO ms_item (itemcode, itemname, hsncode, uomname, categorycode, taxcode, status, createdby)
                    OUTPUT INSERTED.itemcode  -- Return the inserted itemcode
                VALUES (@itemcode, @itemname, @hsncode, @uomname, @categorycode, @taxcode, @status, @createdby);
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
                        data: [qryExec.recordsets[0]],
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
                { status: 200 }
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

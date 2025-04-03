"use server";
import { NextResponse } from "next/server";
import { getDBConnection } from "../../../../lib/db";

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const body = requestBody.data;

        const pool = await getDBConnection();
        const requestDB = pool.request();

        requestDB.input("itemcode", body.ItemCode);
        requestDB.input("itemname", body.ItemName);
        requestDB.input("hsncode", body.HSNcode);
        requestDB.input("uomname", body.UOMname);
        requestDB.input("categorycode", body.CategoryCode);
        requestDB.input("taxcode", body.TaxCode);
        requestDB.input("status", body.status);
        requestDB.input("createdby", body.createdby);
        requestDB.input("extra", "");

        const checkQuery = `Select itemcode from [ms_item] where itemcode = @itemcode`

        const alreadyExist = await requestDB.query(checkQuery);

        if (alreadyExist.recordset.length > 0) {
            return NextResponse.json(
                {
                    Output: {
                        status: {
                            code: 400,
                            message: "FAILED: Item Code Already Exists",
                        },
                        data: [alreadyExist.recordset[0]],
                    },
                },
                { status: 200 }
            );
        }

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

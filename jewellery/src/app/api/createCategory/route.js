"use server";
import { NextResponse } from "next/server";
import { getDBConnection } from "../../../../lib/db";

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const body = requestBody.data;

        const pool = await getDBConnection();
        const requestDB = pool.request();

        // Bind parameters
        requestDB.input("categorycode", body.CategoryCode);
        requestDB.input("categoryname", body.CategoryName);
        requestDB.input("remarks", body.remarks || null);
        requestDB.input("createdby", body.createdby);
        requestDB.input("status", body.status || "Active");
        requestDB.input("activeby", body.activeby || null);

        // Check if category code already exists
        const checkQuery = `SELECT categorycode FROM ms_category WHERE categorycode = @categorycode`;
        const checkResult = await requestDB.query(checkQuery);

        if (checkResult.recordset.length > 0) {
            return NextResponse.json(
                {
                    Output: {
                        status: {
                            code: 400,
                            message: "FAILED: Category Code Already Exists",
                        },
                        data: checkResult.recordset[0], // Return existing categorycode
                    },
                },
                { status: 400 }
            );
        }

        // Insert the new category
        const insertQuery = `
            INSERT INTO ms_category (categorycode, categoryname, remarks, createdby, createdtime, status, activeby)
            OUTPUT INSERTED.categorycode  -- Return categorycode instead of id
            VALUES (@categorycode, @categoryname, @remarks, @createdby, GETDATE(), @status, @activeby);
        `;

        const insertResult = await requestDB.query(insertQuery);

        return NextResponse.json(
            {
                Output: {
                    status: {
                        code: 200,
                        message: "Category inserted successfully",
                    },
                    data: insertResult.recordset[0], // Return inserted categorycode
                },
            },
            { status: 200 }
        );

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

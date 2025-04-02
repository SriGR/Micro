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
        requestDB.input("statecode", body.StateCode);
        requestDB.input("statename", body.StateName);
        requestDB.input("remarks", body.remarks || null);
        requestDB.input("status", body.status || "Active");
        requestDB.input("createdby", body.createdby);
        requestDB.input("activeby", body.activeby || null);

        // Check if statecode already exists
        const checkQuery = `SELECT statecode FROM ms_state WHERE statecode = @statecode`;
        const checkResult = await requestDB.query(checkQuery);

        if (checkResult.recordset.length > 0) {
            return NextResponse.json(
                {
                    Output: {
                        status: {
                            code: 400,
                            message: "FAILED: State Code Already Exists",
                        },
                        data: checkResult.recordset[0], // Return existing statecode
                    },
                },
                { status: 400 }
            );
        }

        // Insert the new state
        const insertQuery = `
            INSERT INTO ms_state (statecode, statename, remarks, status, createdby, createdtime, activeby)
            OUTPUT INSERTED.statecode  -- Return inserted statecode
            VALUES (@statecode, @statename, @remarks, @status, @createdby, GETDATE(), @activeby);
        `;

        const insertResult = await requestDB.query(insertQuery);

        return NextResponse.json(
            {
                Output: {
                    status: {
                        code: 200,
                        message: "State inserted successfully",
                    },
                    data: insertResult.recordset[0], // Return inserted statecode
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

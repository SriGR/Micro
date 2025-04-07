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
         const getMaxCodeQuery = `SELECT MAX(CAST(statecode AS INT)) AS maxCode FROM ms_state`;
         const maxCodeResult = await requestDB.query(getMaxCodeQuery);
 
         const nextCode = (parseInt(maxCodeResult.recordset[0].maxCode || "0", 10) + 1)
             .toString()
             .padStart(3, "0"); // Format to 3-digit (e.g., "001", "045")

        // Bind parameters
        requestDB.input("statecode", nextCode);
        requestDB.input("statename", body.StateName);
        requestDB.input("remarks", body.remarks || null);
        requestDB.input("status", body.status || "Active");
        requestDB.input("createdby", body.createdby);
        requestDB.input("activeby", body.activeby || null);

      

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
                        message: "Saved successfully",
                    },
                    data: [insertResult.recordset[0]], // Return inserted statecode
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

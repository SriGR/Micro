"use server";
import { NextResponse } from "next/server";
import { getDBConnection } from "../../../../lib/db";


export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const p1 = searchParams.get('p1');
        const pool = await getDBConnection();

        const query = `Exec GetTotalWeightValue @Barcode ='${p1}'`;
       // console.log("Executing Query:", query);
        const qryExec = await pool.request().query(query);

        const result = qryExec.recordset || null;

        if (!result || result.length == 0) {
            return NextResponse.json(
                {
                    Output: {
                        status: { code: 400, message: "Invalid Item Code" },
                    },
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                Output: {
                    status: { code: 200, message: "Success" },
                    data: result,
                },
            },
            { status: 200 }
        );
    } catch (err) {
        // console.error("Error in login API:", err.message);
        return NextResponse.json(
            {
                Output: {
                    status: { code: 500, message: "Internal Server Error" },
                },
            },
            { status: 500 }
        );
    }
}

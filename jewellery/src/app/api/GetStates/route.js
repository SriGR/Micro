"use server";
import { NextResponse } from "next/server";
import { getDBConnection } from "../../../../lib/db";

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const body = requestBody.data
        const reqObject = {
            pageNumber: body.pageNumber || 1,
            pageSize: body.pageSize || 10
        }
        const spName = `EXEC GetStates`

        const query = await queryConstruct(spName, reqObject);
        console.log(query, 'Query')
        const pool = await getDBConnection();

        const qryExec = await pool.request().query(query);
        console.log(qryExec, 'qryExec')

        if (qryExec.recordsets && qryExec.recordsets.length > 0) {
            const result = qryExec.recordsets[0]
            return NextResponse.json(
                {
                    Output: {
                        status: {
                            code: 200,
                            message: "Saved Successfully",
                        },
                        data: result,
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
        console.error("Error in login API:", err.message);
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

async function queryConstruct(spName, json) {
    const query = Object.values(json).map(val => {
        if (typeof val === 'string') {
            return `'${val}'`;
        } else if (typeof val === 'number') {
            return `${val}`;
        } else if (val === null) {
            return `null`;
        } else {
            return `''`;
        }
    }).join(",");

    console.log(query, 'query');
    return `${spName} ${query}`;
}


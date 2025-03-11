"use server";
import { NextResponse } from "next/server";
import { getDBConnection } from "../../../../lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
  
    const { UserName, Password } = body.data || {};

    if (!UserName || !Password) {
      return NextResponse.json(
        {
          Output: {
            status: { code: 400, message: "Missing required fields" },
          },
        },
        { status: 200 }
      );
    }

    const pool = await getDBConnection();

    const query = `Exec sp_UserLogin ${UserName},${Password}`;
    console.log("Executing Query:", query);
    const qryExec = await pool.request().query(query);

    const result = qryExec.recordset[0] || null;

    if (!result) {
      return NextResponse.json(
        {
          Output: {
            status: { code: 400, message: "Invalid Credentials" },
            data: { LoginStatus: 0 },
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        Output: {
          status: { code: 200, message: "Login Successfully" },
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

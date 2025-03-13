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

    const query = `Exec sp_UserLogin '${UserName}','${Password}'`;
    console.log("Executing Query:", query);
    const qryExec = await pool.request().query(query);

    const result = qryExec.recordset[0] || null;
    
    const loginStatus = result?.LoginStatus || 0; 
    return NextResponse.json(
      {
        Output: {
          status: {
            code: loginStatus === 1 ? 200 : 400,
            message: loginStatus === 1 ? "Login Success" : "Login Failed",
          },
          data: { LoginStatus: loginStatus },
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

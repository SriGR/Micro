"use server";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json(); 

    if (body.data.UserName === "admin" && body.data.Password === "admin@123") {
      const Output = {
        Output: {
          status: {
            code: 200,
            message: "Login Successfully",
          },
          data: {
            userId: 1,
          },
        },
      };

      return NextResponse.json(Output, { status: 200 });
    } else {
      return NextResponse.json(
        {
          Output: {
            status: {
              code: 400,
              message: "Invalid Credentials",
            },
            data: {
              userId: "",
            },
          },
        },
        { status: 400 } // ✅ Use status 400 for errors
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        Output: {
          status: {
            code: 500,
            message: err.message,
          },
        },
      },
      { status: 500 }
    );
  }
}

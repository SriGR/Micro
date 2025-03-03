"use server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
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
  } catch (error) {
    return NextResponse.json(
      {
        Output: {
          status: {
            code: 500,
            message: "Internal Server Error",
          },
        },
      },
      { status: 500 }
    );
  }
}

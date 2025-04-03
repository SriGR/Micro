"use server";
import { NextResponse } from "next/server";
import { getDBConnection } from "../../../../lib/db";

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const body = requestBody.data;

        const pool = await getDBConnection();
        const requestDB = pool.request();

        // Convert OpCreditBalance and OpDebitBalance to numbers
        const openingCredit = parseFloat(body.OpCreditBalance) || 0;
        const openingDebit = parseFloat(body.OpDebitBalance) || 0;
        const balance = openingCredit - openingDebit;

        // Bind parameters to avoid SQL injection
        requestDB.input("customername", body.CustomerName || "");
        requestDB.input("address1", body.Address1 || "");
        requestDB.input("address2", body.Address2 || "");
        requestDB.input("address3", body.Address3 || "");
        requestDB.input("phonenumber", body.PhoneNo || "");
        requestDB.input("gstnumber", body.GstNo || "");
        requestDB.input("openingcredit", openingCredit);
        requestDB.input("openingdebit", openingDebit);
        requestDB.input("balance", balance);
        requestDB.input("statecode", body.StateCode || "");
        requestDB.input("status", 1);
        requestDB.input("createdby", body.createdby || "Admin");
        requestDB.input("createdtime", body.createdtime || "");
        requestDB.input("activeby", body.activeby || "Admin");


        // INSERT Query
        const insertQuery = `
            INSERT INTO ms_suppliermaster (customername, address1, address2, address3, phonenumber, gstnumber, openingcredit, openingdebit, balance, statecode, status, createdby)
            OUTPUT INSERTED.customername  -- Return inserted suppliercode
            VALUES (@customername, @address1, @address2, @address3, @phonenumber, @gstnumber, @openingcredit, @openingdebit, @balance, @statecode, @status, @createdby);
        `;

        const insertResult = await requestDB.query(insertQuery);

        return NextResponse.json(
            {
                Output: {
                    status: {
                        code: 200,
                        message: "Saved successfully",
                    },
                    data: [insertResult.recordset[0]], 
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

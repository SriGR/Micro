"use server";
import { NextResponse } from "next/server";
import { getDBConnection } from "../../../../lib/db";

export async function POST(request) {
    try {

        const requestBody = await request.json();
        console.log(typeof requestBody.data)
        const body = requestBody.data

        const x = {
            customername: body.CustomerName ? `'${body.CustomerName}'` : '',
            address1: body.Address1 ? `'${body.Address1}'` : '',
            address2: body.Address2 ? `'${body.Address2}'` : '',
            address3: body.Address3 ? `'${body.Address3}'` : '',
            phonenumber: body.PhoneNo ? `'${body.PhoneNo}'` : '',
            gstnumber: body.GstNo ? `'${body.GstNo}'` : '',
            openingcredit: body.OpCreditBalance ? `${body.OpCreditBalance}` : '',
            openingdebit: body.OpDebitBalance ? `${body.OpDebitBalance}` : '',
            balance: 0.00,
            statecode: body.StateCode ? `'${body.StateCode}'` : '',
            remarks: body.remarks ? `'${body.remarks}'` : '',
            createdby: body.createdby ? `'${body.createdby}'` : `'Admin'`,
            createdtime: body.createdtime ? `'${body.createdtime}'` : '',
            status: 1 ,
            activeby: body.activeby ? `'${body.activeby}'` : `'Admin'`
        };
        
     
        const query = `EXEC InsertSupplier ${x.customername},${x.address1},${x.address2},${x.address3},${x.phonenumber},${x.gstnumber},${x.openingcredit},${x.openingdebit},${x.balance},1,'Active',${x.createdby},''`
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




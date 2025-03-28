"use client";
import React, { useReducer } from "react";

const IssueVoucherReducers = (state, action) => {
    switch (action.type) {
        case "VoucherType":
            return { ...state, VoucherType: action.payload };
        case "ItemType":
            return { ...state, ItemType: action.payload };
        case "GSname":
            return { ...state, GSname: action.payload };
        case "Address":
            return { ...state, Address: action.payload };
        case "OBbalance":
            return { ...state, OBbalance: action.payload };
        case "TotIssueQty":
            return { ...state, TotIssueQty: action.payload };
        case "TotalReceiptQty":
            return { ...state, TotalReceiptQty: action.payload };
        case "NetBalance":
            return { ...state, NetBalance: action.payload };
        case "IssueNo":
            return { ...state, IssueNo: action.payload };
        case "IssueDate":
            return { ...state, IssueDate: action.payload };
        default:
            return state;
    }
};

const initialState = {
    VoucherType: "",
    ItemType: "",
    GSname: "",
    Address: "",
    OBbalance: "",
    TotIssueQty: "",
    TotalReceiptQty: "",
    NetBalance: "",
    IssueNo: "",
    IssueDate: "",
};

const MonthYearTable = () => {
    const [state, dispatch] = useReducer(IssueVoucherReducers, initialState);

    const itemTypes = [
        { id: 1, name: "Item1" },
        { id: 2, name: "Item2" },
        { id: 3, name: "Item3" },
        { id: 4, name: "Item4" },
    ];

    return (
        <div className="w-full h-screen p-2 flex flex-col gap-3 justify-start items-start bg-[#fff] overflow-hidden">
            <div className="w-full h-36 flex justify-start items-start border border-red-300">
                <div className="w-1/4 h-full flex flex-col gap-2 justify-start items-start">
                    {/* Voucher Type Input */}
                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[100px] h-full flex justify-start items-center text-sm">
                            Voucher Type:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.VoucherType}
                            onChange={(e) => dispatch({ type: "VoucherType", payload: e.target.value })}
                        />
                    </div>

                    {/* Item Type Dropdown */}
                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[100px] h-full flex justify-start items-center text-sm">
                            Item Type:
                        </label>
                        <select
                            className="InputStyle50"
                            value={state.ItemType}
                            onChange={(e) => dispatch({ type: "ItemType", payload: e.target.value })}
                        >
                            {itemTypes.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="w-1/4 h-full flex flex-col gap-2 justify-start items-start">
                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[80px] h-full flex justify-start items-center text-sm">
                            GS Name:
                        </label>
                        <input
                            type="text"
                            style={{ height: "28px" }}
                            className="InputStyle2"
                            value={state.GSname}
                            onChange={(e) => dispatch({ type: "GSname", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-full h-[auto] flex justify-start items-start">
                        <label className="w-[80px] h-full flex justify-start items-start text-sm p-1">
                            Address:
                        </label>
                        <textarea
                            className="Textarea50"
                            value={state.Address}
                            onChange={(e) => dispatch({ type: "Address", payload: e.target.value })}
                        />
                    </div>
                </div>

                <div className="w-1/4 h-full flex flex-col gap-2 justify-start items-start">
                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[120px] h-full flex justify-start items-center text-sm">
                            OB Balance:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.OBbalance}
                            onChange={(e) => dispatch({ type: "OBbalance", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[120px] h-full flex justify-start items-center text-sm">
                            Total Issue Qty:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.TotIssueQty}
                            onChange={(e) => dispatch({ type: "TotIssueQty", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[120px] h-full flex justify-start items-center text-sm">
                            Total Receipt Qty:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.TotalReceiptQty}
                            onChange={(e) => dispatch({ type: "TotalReceiptQty", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[120px] h-full flex justify-start items-center text-sm">
                            Net Balance:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.NetBalance}
                            onChange={(e) => dispatch({ type: "NetBalance", payload: e.target.value })}
                        />
                    </div>
                </div>

                <div className="w-1/4 h-full flex flex-col gap-2 justify-start items-start">
                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[80px] h-full flex justify-start items-center text-sm">
                            Issue No:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.IssueNo}
                            onChange={(e) => dispatch({ type: "IssueNo", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[80px] h-full flex justify-start items-center text-sm">
                            Issue Date:
                        </label>

                        <input
                            type="date"
                            className="InputStyle50"
                            value={state.IssueDate}
                            onChange={(e) => dispatch({ type: "IssueDate", payload: e.target.value })}
                        />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default MonthYearTable;

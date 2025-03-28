"use client";
import React, { useReducer } from "react";

const IssueVoucherReducers = (state, action) => {
    return {
        ...state,
        [action.type]: action.payload,
    };
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
    MCtouch: "",
    Remarks: "",
    PureWt: "",
    Wastage: "",
    Rate: "",
    WastageMC: "",
    StoneCost: "",
    TotalMC: "",
    AddWgt: "",
    LessWgt: "",
    NetBalance: ""
};

const IssueVoucher = () => {
    const [state, dispatch] = useReducer(IssueVoucherReducers, initialState);

    const itemTypes = [
        { id: 1, name: "Item1" },
        { id: 2, name: "Item2" },
        { id: 3, name: "Item3" },
        { id: 4, name: "Item4" },
    ];

    const headers = [
        "S.No", "Item Name", "Cash", "G.Rate", "PCS", "Wt.Form", "Gross.Wt",
        "Metal Touch", "Stone.Wt", "Peral.Wt", "Coral.Wt", "Nava.Wt", "Other.Wt",
        "Net.Wt", "Wastage Type", "Gram Wstg(%)", "Gram Wstg", "Touch Wstg(%)",
        "Melting(%)", "T(%)", "T Wt", "Pure Wt", "Description"
    ];

    const sampleData = Array.from({ length: 10 }, (_, index) => [
        index + 1, `Item ${index + 1}`, (Math.random() * 1000).toFixed(2),
        (Math.random() * 50).toFixed(2), Math.floor(Math.random() * 10),
        "Form A", (Math.random() * 200).toFixed(2), "Gold",
        (Math.random() * 5).toFixed(2), (Math.random() * 2).toFixed(2),
        (Math.random() * 3).toFixed(2), (Math.random() * 1).toFixed(2),
        (Math.random() * 2).toFixed(2), (Math.random() * 50).toFixed(2),
        "Type B", (Math.random() * 5).toFixed(2), (Math.random() * 10).toFixed(2),
        (Math.random() * 3).toFixed(2), (Math.random() * 2).toFixed(2),
        (Math.random() * 10).toFixed(2), (Math.random() * 15).toFixed(2),
        (Math.random() * 10).toFixed(2), ""
    ]);

    const footerTotals = headers.map((_, index) => {
        if (index === 0 || index === 1 || index === headers.length - 1) return "—";
        return sampleData.reduce((sum, row) => sum + parseFloat(row[index]), 0).toFixed(2);
    });

    return (
        <div className="w-full h-screen p-2 flex flex-col gap-3 justify-start items-start bg-[#fff] overflow-hidden">
            <div className="w-full h-36 flex justify-start items-start">
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

            <div className="w-full h-[calc(100vh-260px)] overflow-x-auto bg-gray-100">
                <table className="w-full border-collapse border border-gray-300 text-center min-w-[1200px]">
                    <thead className="sticky top-0 bg-gray-200 z-10">
                        <tr className="border border-gray-300">
                            {headers.map((header, index) => (
                                <th key={index} className="p-2 border border-gray-300 whitespace-nowrap text-sm">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {sampleData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-100">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="p-1 border border-gray-300 text-sm">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="sticky bottom-0 bg-gray-200 font-bold">
                        <tr className="border border-gray-300">
                            {footerTotals.map((total, index) => (
                                <td key={index} className="p-1 border border-gray-300 text-sm">{total}</td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="w-full h-[116px] flex justify-start items-start">
                <div className="w-1/4 h-full flex flex-col gap-2 justify-start items-start">
                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[80px] h-full flex justify-start items-center text-sm">
                            MC Touch:
                        </label>
                        <input
                            type="text"
                            style={{ height: "28px" }}
                            className="InputStyle2"
                            value={state.MCtouch}
                            onChange={(e) => dispatch({ type: " MCtouch", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-full h-[auto] flex justify-start items-start">
                        <label className="w-[80px] h-full flex justify-start items-start text-sm p-1">
                            Remarks:
                        </label>
                        <textarea
                            className="Textarea50"
                            value={state.Remarks}
                            onChange={(e) => dispatch({ type: "Remarks", payload: e.target.value })}
                        />
                    </div>
                </div>

                <div className="w-1/4 h-full flex flex-col gap-2 justify-start items-start">
                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[100px] h-full flex justify-start items-center text-sm">
                            Pure Wt:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.PureWt}
                            onChange={(e) => dispatch({ type: "PureWt", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[100px] h-full flex justify-start items-center text-sm">
                            Wastage:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.Wastage}
                            onChange={(e) => dispatch({ type: "Wastage", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[100px] h-full flex justify-start items-center text-sm">
                            Rate:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.Rate}
                            onChange={(e) => dispatch({ type: "Rate", payload: e.target.value })}
                        />
                    </div>
                </div>

                <div className="w-1/4 h-full flex flex-col gap-2 justify-start items-start">
                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[120px] h-full flex justify-start items-center text-sm">
                            Wastage MC:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.WastageMC}
                            onChange={(e) => dispatch({ type: "WastageMC", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[120px] h-full flex justify-start items-center text-sm">
                            Stone Cost:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.StoneCost}
                            onChange={(e) => dispatch({ type: "StoneCost", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[120px] h-full flex justify-start items-center text-sm">
                            Total MC:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.TotalMC}
                            onChange={(e) => dispatch({ type: "TotalMC", payload: e.target.value })}
                        />
                    </div>

                </div>

                <div className="w-1/4 h-full flex flex-col gap-2 justify-start items-start">
                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[120px] h-full flex justify-start items-center text-sm">
                            Add Wgt:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.AddWgt}
                            onChange={(e) => dispatch({ type: "AddWgt", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-full h-[28px] flex justify-start items-center">
                        <label className="w-[120px] h-full flex justify-start items-center text-sm">
                            Less Wgt:
                        </label>
                        <input
                            type="text"
                            className="InputStyle50"
                            value={state.LessWgt}
                            onChange={(e) => dispatch({ type: "LessWgt", payload: e.target.value })}
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
            </div>
        </div>
    );
};

export default IssueVoucher;

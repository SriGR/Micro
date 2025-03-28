"use client";
import { useState, useReducer } from "react";

const ItemMasterReducers = (state, action) => {
    switch (action.type) {
        case "RESET":
            return initialState;
        default:
            return {
                ...state,
                [action.type]: action.payload,
            };
    }
};

const initialState = {
    ItemCode: "",
    ItemName: "",
    CategoryName: "",
    HSNcode: "",
    TaxName: "",
    UomName: "",
};

const ItemMaster = () => {
    const [state, dispatch] = useReducer(ItemMasterReducers, initialState);
    const [tableData, setTableData] = useState([]);

    const CategoryTypes = [
        { id: 1, name: "Category1" },
        { id: 2, name: "Category2" },
        { id: 3, name: "Category3" }
    ];

    const TaxSelect = [
        { id: 1, name: "Tax1" },
        { id: 2, name: "Tax2" },
        { id: 3, name: "Tax3" }
    ];

    const UomSelect = [
        { id: 1, name: "UOM1" },
        { id: 2, name: "UOM2" },
        { id: 3, name: "UOM3" }
    ];

    const headers = [
        "Item Name", "Item Sorting", "Category Name", "Brand Name", "Size Name", "Model Name", "UOM Name",
        "Tax Name", "MRP", "Pure Rate", "Opening Status"
    ];

    const handleSave = () => {
        if (!state.ItemCode || !state.ItemName || !state.CategoryName || !state.HSNcode || !state.TaxName || !state.UomName) {
            alert("All fields are mandatory!");
            return;
        }

        const newData = [
            state.ItemName,
            0,
            state.CategoryName,
            0,
            0,
            0,
            state.UomName,
            state.TaxName,
            0,
            0,
            0
        ];
        setTableData([...tableData, { id: tableData.length + 1, values: newData }]);
        dispatch({ type: "RESET" });
    };

    const handleCancel = () => {
        dispatch({ type: "RESET" });
    };

    return (
        <div className="w-full h-screen p-2 flex flex-col gap-3 justify-start items-start bg-[#fff] overflow-hidden">
            <div className="w-full h-10 flex justify-start items-center">
                <p className="w-full h-full text-base tracking-wide font-bold bg-yellow-100 flex justify-center items-center">
                    ITEM MASTER
                </p>
            </div>

            <div className="w-full h-[155px]">
                <div className="w-full flex justify-start items-center flex-wrap gap-[10px]">
                    <div className="w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[4px]">
                        <label className="w-full text-sm">Item Code:</label>
                        <input
                            type="text"
                            className="InputStyle"
                            value={state.ItemCode}
                            onChange={(e) => dispatch({ type: "ItemCode", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[4px]">
                        <label className="w-full text-sm">Item Name:</label>
                        <input
                            type="text"
                            className="InputStyle"
                            value={state.ItemName}
                            onChange={(e) => dispatch({ type: "ItemName", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[4px]">
                        <label className="w-full text-sm">Category Name:</label>
                        <select
                            className="InputStyle"
                            value={state.CategoryName}
                            onChange={(e) => dispatch({ type: "CategoryName", payload: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {CategoryTypes.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[4px]">
                        <label className="w-full text-sm">HSN Code:</label>
                        <input
                            type="text"
                            className="InputStyle"
                            value={state.HSNcode}
                            onChange={(e) => dispatch({ type: "HSNcode", payload: e.target.value })}
                        />
                    </div>

                    <div className="w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[4px]">
                        <label className="w-full text-sm">Tax Name:</label>
                        <select
                            className="InputStyle"
                            value={state.TaxName}
                            onChange={(e) => dispatch({ type: "TaxName", payload: e.target.value })}
                        >
                            <option value="">Select Tax</option>
                            {TaxSelect.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[4px]">
                        <label className="w-full text-sm">UOM Name:</label>
                        <select
                            className="InputStyle"
                            value={state.UomName}
                            onChange={(e) => dispatch({ type: "UomName", payload: e.target.value })}
                        >
                            <option value="">Select UOM</option>
                            {UomSelect.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-full flex justify-end items-center gap-[10px]">
                    <button
                        onClick={handleSave}
                        className="w-[100px] h-[30px] text-sm rounded outline-none bg-green-700 font-normal text-white hover:bg-green-800"
                    >
                        Save
                    </button>

                    <button
                        onClick={handleCancel}
                        className="w-[100px] h-[30px] text-sm rounded outline-none bg-red-600 font-normal text-white hover:bg-red-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <div className="w-full h-[calc(100vh-196px)] overflow-auto">
                <table className="w-full border-collapse border border-gray-300 text-center">
                    <thead className="sticky top-0 z-10 bg-gray-200">
                        <tr className="border border-gray-300">
                            {headers.map((header) => (
                                <th key={header} className="p-2 border border-gray-300 text-sm font-bold">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length > 0 ? (
                            tableData.map((row) => (
                                <tr key={row.id} className="bg-white hover:bg-gray-100">
                                    {row.values.map((value, index) => (
                                        <td key={index} className="p-2 border border-gray-300 text-sm">{value}</td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white hover:bg-gray-100">
                                <td colSpan={11} className="p-2 h-20 border border-gray-300 text-sm">No Records Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemMaster;

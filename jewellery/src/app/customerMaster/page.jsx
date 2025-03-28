"use client";
import { useState, useReducer } from "react";

const CustomerMasterReducers = (state, action) => {
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
    CustomerName: "",
    Address1: "",
    Address2: "",
    Address3: "",
    StateName: "",
    StateCode: "",
    PhoneNo: "",
    GSTno: "",
    OpDebitBalance: "",
    OpCreditBalance: "",
};

const CustomerMaster = () => {
    const [state, dispatch] = useReducer(CustomerMasterReducers, initialState);
    const [customers, setCustomers] = useState([
        // {
        //     id: 1,
        //     values: ["John Doe", "123 Street", "Suite 5", "City A", "9876543210", "GST12345"]
        // },
        // {
        //     id: 2,
        //     values: ["Jane Smith", "456 Avenue", "Floor 2", "City B", "9876543211", "GST67890"]
        // },
        // {
        //     id: 3,
        //     values: ["Mark Johnson", "789 Boulevard", "Building 10", "City C", "9876543212", "GST11121"]
        // }
    ]);

    const StateSelectDatas = [
        { id: 1, name: "State1" },
        { id: 2, name: "State2" },
        { id: 3, name: "State3" }
    ];

    const headers = ["Customer Name", "Address1", "Address2", "Address3", "Phone No", "GST No"];

    const handleSave = () => {
        if (!state.CustomerName.trim()) {
            alert("Customer Name is required!");
            return;
        }

        const newCustomer = {
            id: customers.length + 1,
            values: [state.CustomerName, state.Address1, state.Address2, state.Address3, state.PhoneNo, state.GSTno]
        };

        setCustomers([...customers, newCustomer]);
        dispatch({ type: "RESET" });
    };

    const handleCancel = () => {
        dispatch({ type: "RESET" });
    };

    return (
        <div className="w-full h-screen p-2 flex flex-col gap-3 justify-start items-start bg-[#fff] overflow-hidden">
            <div className="w-full h-10 flex justify-start items-center">
                <p className='w-full h-full text-base tracking-wide font-bold bg-yellow-100 flex justify-center items-center'>
                    CUSTOMER MASTER
                </p>
            </div>

            <div className="w-full h-[220px]">
                <div className="w-full flex justify-start items-center flex-wrap gap-[10px]">
                    {[
                        { label: "Customer Name", type: "CustomerName" },
                        { label: "Address 1", type: "Address1" },
                        { label: "Address 2", type: "Address2" },
                        { label: "Address 3", type: "Address3" },
                        { label: "Phone No", type: "PhoneNo" },
                        { label: "GST No", type: "GSTno" }
                    ].map(({ label, type }) => (
                        <div key={type} className="w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[4px]">
                            <label className="w-full text-sm">{label}:</label>
                            <input
                                type="text"
                                className="InputStyle"
                                value={state[type]}
                                onChange={(e) => dispatch({ type, payload: e.target.value })}
                            />
                        </div>
                    ))}

                    <div className="w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[4px]">
                        <label className="w-full text-sm">State Name:</label>
                        <select
                            className="InputStyle"
                            value={state.StateName}
                            onChange={(e) => dispatch({ type: "StateName", payload: e.target.value })}
                        >
                            {StateSelectDatas.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {[
                        { label: "State Code", type: "StateCode" },
                        { label: "OP Debit Balance", type: "OpDebitBalance" },
                        { label: "OP Credit Balance", type: "OpCreditBalance" }
                    ].map(({ label, type }) => (
                        <div key={type} className="w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[4px]">
                            <label className="w-full text-sm">{label}:</label>
                            <input
                                type="text"
                                className="InputStyle"
                                value={state[type]}
                                onChange={(e) => dispatch({ type, payload: e.target.value })}
                            />
                        </div>
                    ))}
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

            <div className="w-full h-[calc(100vh-260px)] overflow-auto">
                <table className="w-full border-collapse border border-gray-300 text-center">
                    <thead className="sticky top-0 z-10 bg-gray-200">
                        <tr className="border border-gray-300">
                            {headers.map((header) => (
                                <th key={header} className="p-2 border border-gray-300 text-sm font-bold">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? customers.map((row) => (
                            <tr key={row.id} className="bg-white hover:bg-gray-100">
                                {row.values.map((value, index) => (
                                    <td key={index} className="p-2 border border-gray-300 text-sm">{value}</td>
                                ))}
                            </tr>
                        )) :
                            <tr className="bg-white hover:bg-gray-100">
                                <td colSpan={6} className="p-2 h-20 border border-gray-300 text-sm">No Records Found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerMaster;

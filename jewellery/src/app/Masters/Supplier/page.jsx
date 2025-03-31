"use client";
import { useState, useReducer } from "react";
import Image from "next/image";
import { X, Home, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { MdClear } from "react-icons/md";
import { IoFolderOutline } from "react-icons/io5";
import { HiBars3BottomLeft } from "react-icons/hi2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import showToast from '../../../utils/toastService';
import { ToastContainer } from "react-toastify";
import { SlHome } from "react-icons/sl";
import CommonAPISave from "../../Components/CommonAPISave";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className={`bg-gray-900 text-white w-[230px] min-h-screen p-5 transition-all ${isOpen ? "block" : "hidden"} md:block`}>
            <div className="flex justify-between items-center">
                <Image src="/images/BrandLogo.jpg" alt="Brand Logo" width={170} height={0} className="w-[120px] sm:w-[140px] md:w-[170px]" />
                <button onClick={toggleSidebar} className="md:hidden">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <ul className="mt-5 space-y-2">
                <li>
                    <Link href="/dashboard"
                        className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded">
                        <SlHome className="w-5 h-5 mr-2" /> Dashboard
                    </Link>
                </li>

                {/* Masters Section */}
                <li>
                    <button onClick={() => toggleSection("Masters")} className="flex justify-between w-full p-2 hover:bg-gray-700 rounded">
                        <span className="flex items-center font-light text-[14px]"><IoFolderOutline className="w-5 h-5 mr-2" /> Masters</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "Masters" ? "rotate-180" : ""}`} />
                    </button>
                    {openSection === "Masters" && (
                        <ul className="mt-1 space-y-1">
                            <li><Link href="/Masters/Category"
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded">
                                <HiBars3BottomLeft className="w-4 h-4 mr-3" /> Category</Link></li>

                            <li><Link href="/Masters/Item"
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded">
                                <HiBars3BottomLeft className="w-4 h-4 mr-3" /> Item</Link></li>

                            <li><Link href="/Masters/Supplier"
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded activeBar">
                                <HiBars3BottomLeft className="w-4 h-4 mr-3" /> Supplier</Link></li>

                            <li><Link href="/Masters/State"
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded">
                                <HiBars3BottomLeft className="w-4 h-4 mr-3" /> State</Link></li>

                            <li><Link href="/Masters/Tax"
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded">
                                <HiBars3BottomLeft className="w-4 h-4 mr-3" /> Tax</Link></li>
                        </ul>
                    )}
                </li>

                <li>
                    <button onClick={() => toggleSection("Transaction")} className="flex justify-between w-full p-2 hover:bg-gray-700 rounded">
                        <span className="flex items-center font-light text-[14px]"><IoFolderOutline className="w-5 h-5 mr-2" /> Transaction</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "Transaction" ? "rotate-180" : ""}`} />
                    </button>
                    {openSection === "Transaction" && (
                        <ul className="mt-1 space-y-1">
                            <li><Link href="/Transaction/Purchase"
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded">
                                <HiBars3BottomLeft className="w-4 h-4 mr-3" /> Purchase</Link></li>
                        </ul>
                    )}
                </li>

                <li>
                    <button onClick={() => toggleSection("Reports")} className="flex justify-between w-full p-2 hover:bg-gray-700 rounded">
                        <span className="flex items-center font-light text-[14px]"><IoFolderOutline className="w-5 h-5 mr-2" /> Reports</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "Reports" ? "rotate-180" : ""}`} />
                    </button>
                    {openSection === "Reports" && (
                        <ul className="mt-1 space-y-1">
                        </ul>
                    )}
                </li>

                <li>
                    <button onClick={() => toggleSection("Purchase Register")} className="flex justify-between w-full p-2 hover:bg-gray-700 rounded">
                        <span className="flex items-center font-light text-[14px]"><IoFolderOutline className="w-5 h-5 mr-2" /> Purchase Register</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "Purchase Register" ? "rotate-180" : ""}`} />
                    </button>
                    {openSection === "Purchase Register" && (
                        <ul className="mt-1 space-y-1">
                        </ul>
                    )}
                </li>

                <li>
                    <button onClick={() => toggleSection("Utilities")} className="flex justify-between w-full p-2 hover:bg-gray-700 rounded">
                        <span className="flex items-center font-light text-[14px]"><IoFolderOutline className="w-5 h-5 mr-2" /> Utilities</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "Utilities" ? "rotate-180" : ""}`} />
                    </button>
                    {openSection === "Utilities" && (
                        <ul className="mt-1 space-y-1">
                        </ul>
                    )}
                </li>
            </ul>

            <button className="mt-4 w-full flex items-center p-2 bg-red-600 hover:bg-red-700 rounded text-white">
                <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
        </div>
    );
};

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
    CustomerName: "",
    Address1: "",
    Address2: "",
    Address3: "",
    PhoneNo: "",
    GstNo: "",
    StateCode: "",
    StateName: "",
    OpCreditBalance: "",
    OpDebitBalance: ""
};

const SupplierMaster = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const [state, dispatch] = useReducer(ItemMasterReducers, initialState);
    console.log(state, "state");

    const [StateSelect,setStateSelect]=useState([
        { code: 1, name: "State1" },
        { code: 2, name: "State2" },
        { code: 3, name: "State3" }
    ])
    
    const [tableData, setTableData] = useState([{
        CustomerName: "001", Address1: "Address1", Address2: "Address2", Address3: "Address3",
        PhoneNo: 234234234, GstNo: 2312312351235, StateCode: "423423", StateName: "Covai",
        OpCreditBalance: 8900, OpDebitBalance: 9887878
    }]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const ValidateFunction = () => {
        if (!state.CustomerName) {
            return showToast("Kindly enter the Customer Code", "warn")
        }
        else if (!state.StateCode) {
            return showToast("Kindly select the State", "warn")
        }
        handleSave();
    }

    const handleSave = () => {
        setTableData([...tableData, {
            CustomerName: state.CustomerName, Address1: state.Address1, Address2: state.Address2,
            Address3: state.Address3, PhoneNo: state.PhoneNo, GstNo: state.GstNo,
            StateCode: state.StateCode, StateName: state.StateName,
            OpCreditBalance: state.OpCreditBalance, OpDebitBalance: state.OpDebitBalance
        }]);
        dispatch({ type: "RESET" });
    };

    const handleCancel = () => {
        dispatch({ type: "RESET" });
    };

    const dropDownSelect = async()=>{
        const url = '/api/InsertSupplier';
        const params ={

        }
        await CommonAPISave({url,params}).then((res)=>{
            if (res.Output.status.code && res.Output.data.length > 0) {
                const data = res.Output.data
                setStateSelect(data)
                showToast(res.Output.status.message, "success")
            } else {
                showToast(res.Output.status.message, "warn")
            }
        })
    }

    const saveFunction = async () => {
        const url = '/api/InsertSupplier';
        const params = {
            "data": state
        }
        for (let key in state) {
            if (!state[key]) {
                showToast(`Kindly enter the ${key}`, "warn")
                return false
            }
            await CommonAPISave({ url, params }).then((res) => {
                console.log(res, 'component')
                if (res.Output.status.code && res.Output.data.length > 0) {
                    const data = res.Output.data
                    showToast(res.Output.status.message, "success")
                } else {
                    showToast(res.Output.status.message, "warn")
                }
            })
        }
    }

    const tableSelect = async () => {
        const url = '/api/GetCategories';
        const params = {
                pageNumber: 1,
                pageSize: 10
            
        }
        await CommonAPISave({ url, params }).then((res) => {
            console.log(res, 'component')
            if (res.Output.status.code && res.Output.data.length > 0) {
                const data = res.Output.data
                console.log(data, 'data')
                // setTableData(data)
            }
        })

    }

    useEffect(() => {
        tableSelect()
    }, [])



    return (
        <div className="flex h-screen">
            <ToastContainer />
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <section className="flex-1 h-full">
                <div className="w-full h-10 bg-gray-200 flex items-center px-2">
                    <span className="text-sm font-medium">Supplier Master</span>
                </div>
                <div className="w-full h-[235px] p-2 pt-4">
                    <div className="w-full flex justify-start items-center flex-wrap gap-[10px]">
                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">Customer Name:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter Customer Name"
                                    value={state.CustomerName}
                                    onChange={(e) => dispatch({ type: "CustomerName", payload: e.target.value })}
                                />
                                {state.CustomerName && (
                                    <span
                                        onClick={() => dispatch({ type: "CustomerName", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">Address 1:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter Address 1"
                                    value={state.Address1}
                                    onChange={(e) => dispatch({ type: "Address1", payload: e.target.value })}
                                />
                                {state.Address1 && (
                                    <span
                                        onClick={() => dispatch({ type: "Address1", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">Address 2:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter Address 2"
                                    value={state.Address2}
                                    onChange={(e) => dispatch({ type: "Address2", payload: e.target.value })}
                                />
                                {state.Address2 && (
                                    <span
                                        onClick={() => dispatch({ type: "Address2", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">Address 3:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter Address 3"
                                    value={state.Address3}
                                    onChange={(e) => dispatch({ type: "Address3", payload: e.target.value })}
                                />
                                {state.Address3 && (
                                    <span
                                        onClick={() => dispatch({ type: "Address3", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">Phone No:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter Phone No"
                                    value={state.PhoneNo}
                                    onChange={(e) => dispatch({ type: "PhoneNo", payload: e.target.value })}
                                />
                                {state.PhoneNo && (
                                    <span
                                        onClick={() => dispatch({ type: "PhoneNo", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">GST No:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter GST No"
                                    value={state.GstNo}
                                    onChange={(e) => dispatch({ type: "GstNo", payload: e.target.value })}
                                />
                                {state.GstNo && (
                                    <span
                                        onClick={() => dispatch({ type: "GstNo", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[4px]">
                            <label className="w-full text-sm">State Name:</label>
                            <div className="relative w-full">
                                <select
                                    className="InputStyle w-full pr-8 appearance-none"
                                    value={state.StateName}
                                    onClick={dropDownSelect}
                                    onChange={(e) => {
                                        const selectedCategory = StateSelect.find(item => item.name === e.target.value);
                                        dispatch({ type: "StateName", payload: e.target.value });
                                        dispatch({ type: "StateCode", payload: selectedCategory ? selectedCategory.code : "" });
                                    }}
                                >
                                    <option value="">Select State</option>
                                    {StateSelect.map((item) => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>

                                {state.StateName && (
                                    <span
                                        onClick={() => {
                                            dispatch({ type: "StateName", payload: "" });
                                            dispatch({ type: "StateCode", payload: "" });
                                        }}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">OP Credit Balance:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter OP Credit Balance"
                                    value={state.OpCreditBalance}
                                    onChange={(e) => dispatch({ type: "OpCreditBalance", payload: e.target.value })}
                                />
                                {state.OpCreditBalance && (
                                    <span
                                        onClick={() => dispatch({ type: "OpCreditBalance", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">OP Debit Balance:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter OP Debit Balance"
                                    value={state.OpDebitBalance}
                                    onChange={(e) => dispatch({ type: "OpDebitBalance", payload: e.target.value })}
                                />
                                {state.OpDebitBalance && (
                                    <span
                                        onClick={() => dispatch({ type: "OpDebitBalance", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-end items-center gap-[10px]">
                        <button
                            onClick={ValidateFunction}
                            className="w-[90px] h-[30px] text-sm rounded outline-none bg-green-700 font-light text-white hover:bg-green-800"
                        >
                            Save
                        </button>

                        <button
                            onClick={handleCancel}
                            className="w-[90px] h-[30px] text-sm rounded outline-none bg-red-600 font-light text-white hover:bg-red-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                {/* Table Section */}
                <div className="w-full p-2 overflow-auto height280">
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Customer Name</TableCell>
                                    <TableCell>Address 1</TableCell>
                                    <TableCell>Address 2</TableCell>
                                    <TableCell>Address 3</TableCell>
                                    <TableCell>Phone No</TableCell>
                                    <TableCell>GST No</TableCell>
                                    <TableCell>State Name</TableCell>
                                    <TableCell>OP Debit Balance</TableCell>
                                    <TableCell>OP Credit Balance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(tableData && tableData.length > 0) && tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow>
                                        <TableCell>{row.CustomerName}</TableCell>
                                        <TableCell>{row.Address1}</TableCell>
                                        <TableCell>{row.Address2}</TableCell>
                                        <TableCell>{row.Address3}</TableCell>
                                        <TableCell>{row.PhoneNo}</TableCell>
                                        <TableCell>{row.GstNo}</TableCell>
                                        <TableCell>{row.StateName}</TableCell>
                                        <TableCell>{row.OpCreditBalance}</TableCell>
                                        <TableCell>{row.OpDebitBalance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 50, 100]}
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />
                </div>
            </section>
        </div>
    );
};

export default SupplierMaster;

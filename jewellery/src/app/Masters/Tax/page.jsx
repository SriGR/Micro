"use client";
import { useState, useReducer, useEffect, useCallback } from "react";
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
import { RiMenuFold2Line } from "react-icons/ri";
import { RiMenuFoldLine } from "react-icons/ri";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className={`bg-gray-900 text-white w-[230px] min-h-screen p-5 transition-all ${isOpen ? "block" : "hidden"} `}>
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
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded">
                                <HiBars3BottomLeft className="w-4 h-4 mr-3" /> Supplier</Link></li>

                            <li><Link href="/Masters/State"
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded">
                                <HiBars3BottomLeft className="w-4 h-4 mr-3" /> State</Link></li>

                            <li><Link href="/Masters/Tax"
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded activeBar">
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
                            <li><Link href="/Reports/PurchaseSummary"
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded">
                                <HiBars3BottomLeft className="w-4 h-4 mr-3" /> Purchase Summary</Link></li>
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

const TaxMasterReducers = (state, action) => {
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
    TaxCode: "",
    TaxName: "",
    TaxPercentage: ""
};

const TaxMaster = () => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const [state, dispatch] = useReducer(TaxMasterReducers, initialState);
    const [tableData, setTableData] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const ValidateFunction = () => {
        if (!state.TaxName) {
            window.alert("Kindly enter the Tax Name");
            return;
        }
        else if (!state.TaxPercentage) {
            window.alert("Kindly enter the Tax Percentage");
            return;
        }
        saveFunction()
    }



    const handleCancel = () => {
        dispatch({ type: "RESET" });
    };


    const saveFunction = useCallback(async () => {
        const url = '/api/InsertTax';
        const params = {
            ...state
        }
        await CommonAPISave({ url, params }).then((res) => {

            if (res.Output.status.code && res.Output.data.length > 0) {
                const data = res.Output.data
                showToast(res.Output.status.message, "success");
                dispatch({ type: "RESET" });
            } else {
                showToast(res.Output.status.message, "warn")
            }

            tableSelect()
        })

    }, [state])

    const tableSelect = useCallback(async () => {
        const url = '/api/GetTaxes';
        const params = {
            status: 'Active',
            pageNumber: 1,
            pageSize: 10
        }
        await CommonAPISave({ url, params }).then((res) => {
            if (res.Output.status.code && res.Output.data.length > 0) {
                const data = res.Output.data
                setTableData(data)
            }
        })

    }, [])

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
                <div className="w-full h-10 bg-gray-200 flex items-center px-2 text-black gap-2">
                    {isOpen ? <RiMenuFoldLine onClick={toggleSidebar} className="w-5 h-5 cursor-pointer" /> :
                        <RiMenuFold2Line onClick={toggleSidebar} className="w-5 h-5 cursor-pointer" />}
                    <span className="text-sm font-medium">Tax Master</span>
                </div>
                <div className="w-full h-[110px] p-2 pt-4">
                    <div className="w-full flex justify-start items-center flex-wrap gap-[10px]">
                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">Tax Code:</label>
                            <div className="relative w-full">
                                <input
                                    type="number"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Auto Generate"
                                    disabled
                                    value={state.TaxCode}
                                    onChange={(e) => dispatch({ type: "TaxCode", payload: e.target.value })}
                                />
                                {state.TaxCode && (
                                    <span
                                        onClick={() => dispatch({ type: "TaxCode", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">Tax Name:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter Tax Name"
                                    value={state.TaxName}
                                    onChange={(e) => dispatch({ type: "TaxName", payload: e.target.value })}
                                />
                                {state.TaxName && (
                                    <span
                                        onClick={() => dispatch({ type: "TaxName", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">Tax Percentage:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter Tax Percentage"
                                    value={state.TaxPercentage}
                                    onChange={(e) => dispatch({ type: "TaxPercentage", payload: e.target.value })}
                                />
                                {state.TaxPercentage && (
                                    <span
                                        onClick={() => dispatch({ type: "TaxPercentage", payload: "" })}
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
                <div className="w-full p-2 overflow-auto height145">
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tax Code</TableCell>
                                    <TableCell>Tax Name</TableCell>
                                    <TableCell>Tax Percentage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(tableData && tableData.length > 0) && tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow>
                                        <TableCell>{row.taxcode}</TableCell>
                                        <TableCell>{row.taxname}</TableCell>
                                        <TableCell>{row.taxpercentage}</TableCell>
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

export default TaxMaster;

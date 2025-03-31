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
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded activeBar">
                                <HiBars3BottomLeft className="w-4 h-4 mr-3" /> Item</Link></li>

                            <li><Link href="/Masters/Supplier"
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded">
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
    ItemCode: "",
    ItemName: "",
    CategoryCode: "",
    CategoryName: "",
    HSNcode: "",
    TaxCode: "",
    TaxName: "",
    UOMname: ""
};

const ItemMaster = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const [state, dispatch] = useReducer(ItemMasterReducers, initialState);
    console.log(state, "state");


    const CategorySelect = [
        { code: 1, name: "Category1" },
        { code: 2, name: "Category2" },
        { code: 3, name: "Category3" }
    ];

    const TaxSelect = [
        { code: 1, name: "Tax1" },
        { code: 2, name: "Tax2" },
        { code: 3, name: "Tax3" }
    ];

    const [tableData, setTableData] = useState([{
        ItemCode: "001", ItemName: "Item Name 1", CategoryName: "Category Name 1", HSNcode: "HSN Code",
        TaxName: "Tax Name", UOMname: "UOM Name"
    }]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const ValidateFunction = () => {
        if (!state.ItemCode) {
            return showToast("Kindly enter the Item Code", "warn")
        }
        else if (!state.ItemName) {
            return showToast("Kindly enter the Item Name", "warn")
        }
        else if (!state.CategoryCode) {
            return showToast("Kindly select the Category", "warn")
        }
        else if (!state.TaxCode) {
            return showToast("Kindly select the Tax", "warn")
        }
        handleSave();
    }

    const handleSave = () => {
        saveFunction()
        dispatch({ type: "RESET" });
    };

    const handleCancel = () => {
        dispatch({ type: "RESET" });
    };

     const saveFunction = async () => {
            const url = '/api/createCategory';
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
                "data": {
                    status: 'Active',
                    pageNumber: 1,
                    pageSize: 10
                }
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
                    <span className="text-sm font-medium">Item Master</span>
                </div>
                <div className="w-full h-[175px] p-2 pt-4">
                    <div className="w-full flex justify-start items-center flex-wrap gap-[10px]">
                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">Item Code:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter Item Code"
                                    value={state.ItemCode}
                                    onChange={(e) => dispatch({ type: "ItemCode", payload: e.target.value })}
                                />
                                {state.ItemCode && (
                                    <span
                                        onClick={() => dispatch({ type: "ItemCode", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">Item Name:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter Item Name"
                                    value={state.ItemName}
                                    onChange={(e) => dispatch({ type: "ItemName", payload: e.target.value })}
                                />
                                {state.ItemName && (
                                    <span
                                        onClick={() => dispatch({ type: "ItemName", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[4px]">
                            <label className="w-full text-sm">Category Name:</label>
                            <div className="relative w-full">
                                <select
                                    className="InputStyle w-full pr-8 appearance-none"
                                    value={state.CategoryName}
                                    onChange={(e) => {
                                        const selectedCategory = CategorySelect.find(item => item.name === e.target.value);
                                        dispatch({ type: "CategoryName", payload: e.target.value });
                                        dispatch({ type: "CategoryCode", payload: selectedCategory ? selectedCategory.code : "" });
                                    }}
                                >
                                    <option value="">Select Category</option>
                                    {CategorySelect.map((item) => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>

                                {state.CategoryName && (
                                    <span
                                        onClick={() => {
                                            dispatch({ type: "CategoryName", payload: "" });
                                            dispatch({ type: "CategoryCode", payload: "" });
                                        }}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">HSN Code:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter HSN Code"
                                    value={state.HSNcode}
                                    onChange={(e) => dispatch({ type: "HSNcode", payload: e.target.value })}
                                />
                                {state.HSNcode && (
                                    <span
                                        onClick={() => dispatch({ type: "HSNcode", payload: "" })}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[4px]">
                            <label className="w-full text-sm">Tax Name:</label>
                            <div className="relative w-full">
                                <select
                                    className="InputStyle w-full pr-8 appearance-none"
                                    value={state.TaxName}
                                    onChange={(e) => {
                                        const selectedTax = TaxSelect.find(item => item.name === e.target.value);
                                        dispatch({ type: "TaxName", payload: e.target.value });
                                        dispatch({ type: "TaxCode", payload: selectedTax ? selectedTax.code : "" });
                                    }}
                                >
                                    <option value="">Select Tax</option>
                                    {TaxSelect.map((item) => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>

                                {state.TaxName && (
                                    <span
                                        onClick={() => {
                                            dispatch({ type: "TaxName", payload: "" });
                                            dispatch({ type: "TaxCode", payload: "" });
                                        }}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>


                        <div className="relative w-[calc(25%-10px)] h-auto flex flex-col justify-start items-start gap-[6px]">
                            <label className="w-full text-xs">UOM Name:</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInputField100 pr-8"
                                    placeholder="Enter UOM Name"
                                    value={state.UOMname}
                                    onChange={(e) => dispatch({ type: "UOMname", payload: e.target.value })}
                                />
                                {state.UOMname && (
                                    <span
                                        onClick={() => dispatch({ type: "UOMname", payload: "" })}
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
                <div className="w-full p-2 overflow-auto height220">
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item Code</TableCell>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Category Percentage</TableCell>
                                    <TableCell>HSN Code</TableCell>
                                    <TableCell>Tax Name</TableCell>
                                    <TableCell>UOM Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(tableData && tableData.length > 0) && tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow>
                                        <TableCell>{row.ItemCode}</TableCell>
                                        <TableCell>{row.ItemName}</TableCell>
                                        <TableCell>{row.CategoryName}</TableCell>
                                        <TableCell>{row.HSNcode}</TableCell>
                                        <TableCell>{row.TaxName}</TableCell>
                                        <TableCell>{row.UOMname}</TableCell>
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

export default ItemMaster;

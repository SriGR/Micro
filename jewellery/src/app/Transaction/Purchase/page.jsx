"use client";
import { useState, useReducer, useEffect } from "react";
import Image from "next/image";
import { X, LogOut, ChevronDown } from "lucide-react";
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
// import showToast from '../../../utils/toastService';
import { ToastContainer } from "react-toastify";
import { SlHome } from "react-icons/sl";
import CommonAPISave from "app/Components/CommonAPISave";

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
                                className="flex items-center font-light text-[14px] p-2 hover:bg-gray-700 rounded activeBar">
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
    CustomerCode: "",
    CustomerName: "",
    Address1: "",
    Address2: "",
    PhoneNo: "",
    PurchaseNo: "",
    PurchaseDate: new Date().toISOString().split("T")[0],
    PurchaseRefNo: "",
    ItemCode: "",
    ItemName: "",
    Description: "",
    Qty: "",
    UOM: "",
    Rate: "",
    Total: "",
    GrandTotal: "",
    Remarks: "",
    TaxCode: "",
    TaxName: "",
    TaxValue: "",
    RoundOff: "",
    FreightCharge: "",
    InvoiceTotal: "",
};

const ItemMaster = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const [state, dispatch] = useReducer(ItemMasterReducers, initialState);
    console.log(state, 'State')

    const [tableData, setTableData] = useState([]);

    const [ItemSelect, setItemSelect] = useState([])
    const [CustomerSelect, setCustomerSelect] = useState([]);
    const [TaxSelect, setTaxSelect] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleAddRow = () => {
        const newRow = {
            id: tableData.length + 1,
            ItemName: "",
            ItemCode: "",
            Description: "",
            Qty: "",
            UOM: "",
            Rate: "",
            Total: ""
        };
        setTableData([...tableData, newRow]);
    };


    const dropDownSelect = async (endPoint, TablePagination, index) => {
        const url = `/api/${endPoint}`;
        const params = {
            status: 'Active',
            pageNumber: TablePagination.pageNumber,
            pageSize: TablePagination.pageSize
        }
        await CommonAPISave({ url, params }).then((res) => {
            if (res.Output.status.code && res.Output.data.length > 0) {
                const data = res.Output.data    
                if (endPoint == 'GetItems') {
                    setItemSelect(data)
                } else if (endPoint == 'getSupplier') {
                    setCustomerSelect(data)
                } else if (endPoint == 'GetTaxes') {
                    setTaxSelect(data)
                }
            }
        })
    }
    useEffect(() => {
        const GrandTotal = tableData.reduce((acc, row) =>
            row.Total ? acc + Number(row.Total) : acc, 0
        );

        dispatch({ type: "GrandTotal", payload: GrandTotal || "" });
    }, [tableData]);


    const handleFileGenerate = async (type) => {
        console.log(state, 'State');
        console.log(tableData, 'tableData');
        console.log(type, 'type');
    
        const url = '/api/fileGenerate';
        const params = { state, tableData, type };
    
        try {
            const res = await CommonAPISave({ url, params });
    
            if (res.Output.status.code == 200) {
                const pdfbuffer = Object.values(res.Output.data.pdfBuffer)
                const byteArray = new Uint8Array(pdfbuffer);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(blob);
                const uniqueFileName = `invoice_${Date.now()}.pdf`;
    
                if (type === 'print') {
                    // Open PDF in a new tab for printing
                    const printWindow = window.open(pdfUrl, '_blank');
                    // if (printWindow) {
                    //     printWindow.onload = () => printWindow.print();
                    // }
                } else if (type === 'download') {
                    // Create a link and trigger download
                    const link = document.createElement('a');
                    link.href = pdfUrl;
                    link.download = uniqueFileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            } else {
                console.error('PDF buffer is missing in the response');
            }
        } catch (error) {
            console.error('Error generating file:', error);
        }
    };

    
    return (
        <div className="flex h-screen">
            <ToastContainer />
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <section className="flex-1 h-full">
                <div className="w-full h-10 bg-gray-200 flex items-center px-2 text-black">
                    <span className="text-sm font-medium">Purchase Entry</span>
                </div>

                <div className="w-full h-36 flex justify-between items-start p-2">
                    <div className="w-[280px] h-full flex flex-col gap-2 justify-start items-start">
                        <div className="relative w-full h-[28px] flex justify-start items-center">
                            <label className="w-[100px] h-full flex justify-start items-center text-xs">Customer :</label>
                            <div className="relative w-full">
                                <select
                                    className="InputStyle w-full pr-8 appearance-none"
                                    value={state.CustomerName}
                                    onClick={() => { dropDownSelect('getSupplier', { pageNumber: 1, pageSize: 10 }) }}
                                    onChange={(e) => {
                                        const selectedCustomer = CustomerSelect.find(item => item.customername === e.target.value);
                                        dispatch({ type: "CustomerName", payload: e.target.value });
                                        dispatch({ type: "Address1", payload: selectedCustomer ? selectedCustomer.address1 : "" });
                                        dispatch({ type: "Address2", payload: selectedCustomer ? selectedCustomer.address2 : "" });
                                        dispatch({ type: "Address3", payload: selectedCustomer ? selectedCustomer.address3 : "" });
                                        dispatch({ type: "PhoneNo", payload: selectedCustomer ? selectedCustomer.phonenumber : "" });

                                    }}
                                >
                                    <option value="">Select Customer</option>
                                    {CustomerSelect.map((item, index) => (
                                        <option key={index} value={item.customername}>
                                            {item.customername}
                                        </option>
                                    ))}
                                </select>

                                {state.CustomerName && (
                                    <span
                                        onClick={() => {
                                            dispatch({ type: "CustomerName", payload: "" });
                                            dispatch({ type: "Address1", payload: "" });
                                            dispatch({ type: "Address2", payload: "" });
                                            dispatch({ type: "Address3", payload: "" });
                                            dispatch({ type: "PhoneNo", payload: "" });
                                        }}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                                    >
                                        <MdClear />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative w-full h-[28px] flex justify-start items-center">
                            <label className="w-[100px] h-full flex justify-start items-center text-xs">Address 1 :</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInput2Field100 pr-8"
                                    value={state.Address1}
                                    readOnly
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

                        <div className="relative w-full h-[28px] flex justify-start items-center">
                            <label className="w-[100px] h-full flex justify-start items-center text-xs">Address 2 :</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="EntryInput2Field100 pr-8"
                                    value={state.Address2}
                                    readOnly
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

                        <div className="relative w-full h-[28px] flex justify-start items-center">
                            <label className="w-[100px] h-full flex justify-start items-center text-xs">Phone No :</label>
                            <div className="relative w-full">
                                <input
                                    type="number"
                                    className="EntryInput2Field100 pr-8"
                                    value={state.PhoneNo}
                                    readOnly
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
                    </div>


                    <div className="w-[320px] h-full flex flex-col gap-2 justify-start items-start">
                        <div className="w-full h-[28px] flex justify-start items-center">
                            <label className="w-[170px] h-full flex justify-start items-center text-xs">Purchase No :</label>
                            <div className="w-full">
                                <input
                                    type="number"
                                    className="EntryInput2Field100 pr-8"
                                    value={state.PurchaseNo}
                                    onChange={(e) => dispatch({ type: "PurchaseNo", payload: e.target.value })}
                                // readOnly
                                />
                            </div>
                        </div>

                        <div className="w-full h-[28px] flex justify-start items-center">
                            <label className="w-[170px] h-full flex justify-start items-center text-xs">Purchase Date :</label>
                            <div className="w-full">
                                <input
                                    type="date"
                                    className="EntryInput2Field100 pr-8"
                                    value={state.PurchaseDate}
                                    onChange={(e) => dispatch({ type: "PurchaseDate", payload: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="w-full h-[28px] flex justify-start items-center">
                            <label className="w-[170px] h-full flex justify-start items-center text-xs">Purchase Ref No :</label>
                            <div className="w-full">
                                <input
                                    type="number"
                                    className="EntryInput2Field100 pr-8"
                                    value={state.PurchaseRefNo}
                                    onChange={(e) => dispatch({ type: "PurchaseRefNo", payload: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Table Section */}
                <div className="w-full p-2 overflow-auto height330">
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Qty</TableCell>
                                    <TableCell>UOM</TableCell>
                                    <TableCell>Rate</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="px-10">{index + 1}</TableCell>
                                        <TableCell className="TableInputTD">
                                            <select
                                                className="TableItemInput"
                                                value={row.ItemName}
                                                onClick={() => { dropDownSelect('GetItems', { pageNumber: 1, pageSize: 10 }, index) }}
                                                onChange={(e) => {
                                                    const selectedItem = ItemSelect.find(item => item.itemname === e.target.value);
                                                    const updatedData = [...tableData];
                                                    updatedData[index] = {
                                                        ...updatedData[index],
                                                        ItemName: e.target.value,
                                                        ItemCode: selectedItem ? selectedItem.itemcode : "",
                                                        uomname: selectedItem ? selectedItem.uomname : ""
                                                    };
                                                    setTableData(updatedData);
                                                }}
                                            >
                                                <option value="">Select Item</option>
                                                {ItemSelect.map((item) => (
                                                    <option key={item.itemcode} value={item.itemname}>
                                                        {item.itemname}
                                                    </option>
                                                ))}
                                            </select>
                                        </TableCell>
                                        <TableCell className="TableInputTD">
                                            <input
                                                type="text"
                                                className="TableInput"
                                                value={row.Description}
                                                onChange={(e) => {
                                                    const updatedData = [...tableData];
                                                    updatedData[index].Description = e.target.value;
                                                    setTableData(updatedData);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell className="TableInputTD">
                                            <input
                                                type="text"
                                                className="TableInput"
                                                value={row.Qty}
                                                onChange={(e) => {
                                                    const updatedData = [...tableData];
                                                    updatedData[index].Qty = e.target.value;
                                                    setTableData(updatedData);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell className="TableInputTD">
                                            <input
                                                type="text"
                                                className="TableInput"
                                                value={row.uomname}
                                            // onChange={(e) => {
                                            //     const updatedData = [...tableData];
                                            //     updatedData[index].UOM = e.target.value;
                                            //     setTableData(updatedData);
                                            // }}
                                            />
                                        </TableCell>
                                        <TableCell className="TableInputTD">
                                            <input
                                                type="text"
                                                className="TableInput"
                                                value={row.Rate}
                                                onChange={(e) => {
                                                    const updatedData = [...tableData];
                                                    updatedData[index].Rate = e.target.value;
                                                    updatedData[index].Total = (row.Qty && row.Rate) ? Number(row.Qty || 0) * Number(row.Rate || 0) : 0;
                                                    setTableData(updatedData);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell className="TableInputTD">
                                            <input
                                                type="text"
                                                className="TableInput"
                                                value={row.Total}
                                                readOnly
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>

                                </TableRow>
                                <TableCell colSpan={7}>
                                    <button onClick={handleAddRow} className="bg-blue-500 text-white px-4 py-1 rounded">
                                        Add Items</button>
                                </TableCell>
                                <TableRow>
                                    <TableCell colSpan={2} className="TableInputTDtotal">
                                        Total
                                    </TableCell>
                                    <TableCell className="TableInputTDtotal">
                                        <input
                                            type="text"
                                            value={state.GrandTotal}
                                            readOnly
                                            className="TableInput1" />
                                    </TableCell>
                                    <TableCell className="TableInputTDtotal">
                                        <input
                                            type="text"
                                            className="TableInput1" />
                                    </TableCell>
                                    <TableCell className="TableInputTDtotal">
                                        <input
                                            type="text"
                                            className="TableInput1" />
                                    </TableCell>
                                    <TableCell className="TableInputTDtotal">
                                        <input
                                            type="text"
                                            className="TableInput1" />
                                    </TableCell>
                                    <TableCell className="TableInputTDtotal">
                                        <input
                                            type="text"
                                            className="TableInput1" />
                                    </TableCell>
                                </TableRow>
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

                <div className="w-full h-36 flex justify-between items-start p-2">
                    <div className="w-[280px] h-full flex flex-col gap-2 justify-start items-start">
                        <div className="w-full h-full flex justify-start items-start">
                            <label className="w-[100px] h-full flex justify-start items-start text-xs pt-1">Remarks :</label>
                            <textarea
                                type="number"
                                className="TextAreaForPurchase pr-8"
                                value={state.Remarks}
                                onChange={(e) => dispatch({ type: "Remarks", payload: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                    <div className="w-auto flex justify-center items-end h-full gap-4">
                        {/* print and Download */}
                        <div className="w-full flex justify-end items-center gap-[10px]">
                            <button
                                onClick={()=>{handleFileGenerate('print')}}
                                className="w-[90px] h-[30px] text-sm rounded outline-none bg-sky-600 font-light text-white hover:bg-sky-800"
                            >
                                Print
                            </button>
                            <button
                                onClick={()=>{handleFileGenerate('download')}}
                                className="w-[90px] h-[30px] text-sm rounded outline-none bg-sky-600 font-light text-white hover:bg-sky-800"
                            >
                                Download
                            </button>
                        </div>
                        <div className="w-[400px] h-full flex flex-col gap-2 justify-start items-start">
                            <div className="w-full h-[28px] flex justify-start items-center">
                                <div className="w-[170px] h-full flex justify-start items-center">
                                    <label className="h-full flex justify-start items-center text-xs">Tax : </label>
                                    <select
                                        className="TaxInputForPurchase flex-1 pr-8 appearance-none"
                                        value={state.TaxName}
                                        onClick={() => { dropDownSelect('GetTaxes', { pageNumber: 1, pageSize: 10 }) }}
                                        onChange={(e) => {
                                            const selectedTax = TaxSelect.find(item => item.taxname === e.target.value);
                                            dispatch({ type: "TaxName", payload: e.target.value });
                                            dispatch({ type: "TaxValue", payload: selectedTax ? selectedTax.taxpercentage : "" });
                                        }}
                                    >
                                        <option value=""></option>
                                        {TaxSelect.map((item, i) => (
                                            <option key={i} value={item.taxname}>
                                                {item.taxname}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <input
                                    type="number"
                                    className="EntryInput2Field100 pr-8"
                                    value={state.TaxValue}
                                    onChange={(e) => dispatch({ type: "TaxValue", payload: e.target.value })}
                                />
                            </div>

                            <div className="w-full h-[28px] flex justify-start items-center">
                                <label className="w-[170px] h-full flex justify-start items-center text-xs">Freight Charge :</label>
                                <input
                                    type="number"
                                    className="EntryInput2Field100 pr-8"
                                    value={state.FreightCharge}
                                    onChange={(e) => dispatch({ type: "FreightCharge", payload: e.target.value })}
                                />
                            </div>

                            <div className="w-full h-[28px] flex justify-start items-center">
                                <label className="w-[170px] h-full flex justify-start items-center text-xs">Round Off :</label>
                                <input
                                    type="number"
                                    className="EntryInput2Field100 pr-8"
                                    value={state.RoundOff}
                                    onChange={(e) => dispatch({ type: "RoundOff", payload: e.target.value })}
                                />
                            </div>

                            <div className="w-full h-[28px] flex justify-start items-center">
                                <label className="w-[170px] h-full flex justify-start items-center text-xs">Invoice Total :</label>
                                <input
                                    type="number"
                                    className="EntryInput2Field100 pr-8"
                                    value={state.InvoiceTotal}
                                    onChange={(e) => dispatch({ type: "InvoiceTotal", payload: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    );
};

export default ItemMaster;

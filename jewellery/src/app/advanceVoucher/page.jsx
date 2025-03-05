"use client"
import React, { useReducer, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { IoIosClose } from "react-icons/io";
import showToast from '@/utils/toastService';
import { ToastContainer } from "react-toastify";

const initialState = {
    VoucherNo: '',
    AdvanceDate: new Date().toISOString().split('T')[0],
    EmpName: '',
    PaymentMode: '',
    BankName: '',
    ChequeDDnum: '',
    ChequeDDdate: '',
    AdvanceAmount: '',
    Remark: ''
};

const AdvanceReducer = (state, action) => {
    switch (action.type) {
        case 'VoucherNo':
        case 'AdvanceDate':
        case 'EmpName':
        case 'PaymentMode':
        case 'BankName':
        case 'ChequeDDnum':
        case 'ChequeDDdate':
        case 'AdvanceAmount':
        case 'Remark':
            return { ...state, [action.type]: action.payload };
        case 'Reset':
            return initialState;
        default:
            return state;
    }
};


const AdvanceVoucher = () => {
    const [state, dispatch] = useReducer(AdvanceReducer, initialState);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const data = [
        { empID: '1', EmpName: 'User 1' },
        { empID: '2', EmpName: 'User 2' },
        { empID: '3', EmpName: 'User 3' },
        { empID: '4', EmpName: 'User 4' },
        { empID: '5', EmpName: 'User 5' }
    ];

    const BankList = [
        { bankID: '1', BankName: 'Bank 1' },
        { bankID: '2', BankName: 'Bank 2' },
        { bankID: '3', BankName: 'Bank 3' },
        { bankID: '4', BankName: 'Bank 4' },
        { bankID: '5', BankName: 'Bank 5' }
    ];

    const handleSelectChange = (e) => {
        const selectedItem = data.find(item => item.EmpName === e.target.value);
        if (selectedItem) {
            dispatch({ type: 'EmpName', payload: selectedItem.EmpName });
        }
    };

    const handleBankSelectChange = (e) => {
        const selectedItem = BankList.find(item => item.BankName === e.target.value);
        if (selectedItem) {
            dispatch({ type: 'BankName', payload: selectedItem.BankName });
        }
    };

    const handleChange = (type, val) => {
        dispatch({ type: type, payload: val });
    }

    const ValidateFunction = () => {
        if (!state.EmpName) {
            showToast("Kindly select the Employee Name", "warn")
        }
        else if (!state.PaymentMode) {
            showToast("Kindly select the Payment Mode", "warn")
        }
        else if (state.PaymentMode == 'Bank' && !state.BankName) {
            showToast("Kindly select the Bank Name", "warn")
        }
        else if (state.PaymentMode == 'Bank' && !state.ChequeDDnum) {
            showToast("Kindly enter the Cheque/DD No", "warn")
        }
        else if (state.PaymentMode == 'Bank' && !state.ChequeDDdate) {
            showToast("Kindly select the Cheque/DD Date", "warn")
        }
        else if (!state.AdvanceAmount) {
            showToast("Kindly enter the advance amount", "warn")
        }
        else if (!state.Remark) {
            showToast("Kindly enter the remark", "warn")
        } else {
            showToast("Record saved successfully", "success")
            dispatch({ type: 'Reset' })
        }
    }

    return (
        <div className='w-full h-screen p-5 flex justify-center items-center bg-[#f1f1f1] overflow-hidden'>
            <ToastContainer />
            <form className='w-[500px] h-[500px] px-5 py-3 flex flex-col justify-start items-start gap-3 bg-[#fff] overflow-hidden rounded-lg'>
                <span className='w-full text-[18px] font-medium pb-1'>Salary Advance Voucher</span>
                <div className='w-full flex gap-4'>
                    <div className="w-[50%] flex flex-col justify-start items-start gap-[4px]">
                        <span className="text-sm w-[full] text-gray-700">Voucher No : </span>
                        <input
                            type="text"
                            placeholder="Enter Voucher No"
                            className="InputStyle w-[full]"
                            value={state.VoucherNo}
                            onChange={(e) => handleChange('VoucherNo', e.target.value)}
                        />
                    </div>

                    <div className="w-[50%] flex flex-col justify-start items-start gap-[4px]">
                        <span className="text-sm w-[full] text-gray-700">Date : </span>
                        <input
                            type="date"
                            placeholder="Select Date"
                            className="InputStyle w-[full]"
                            value={state.AdvanceDate}
                            readOnly
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                    <span className="text-sm w-[full] text-gray-700">Employee Name : </span>

                    <select className='InputStyle' onChange={handleSelectChange} value={state.EmpName}>
                        <option value="">Select Employee</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.EmpName} className='Selected'>
                                {item.EmpName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='w-full flex gap-4'>
                    <div className="w-[50%] flex flex-col justify-start items-start">
                        <span className="text-sm w-[full] text-gray-700">Payment Mode : </span>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="payment-mode"
                            value={state.PaymentMode}
                            onChange={(e) => handleChange('PaymentMode', e.target.value)}
                        >
                            <FormControlLabel
                                value="Cash"
                                control={<Radio sx={{ transform: "scale(0.8)" }} />}
                                label={<span className="text-sm">Cash</span>}
                            />
                            <FormControlLabel
                                value="Bank"
                                control={<Radio sx={{ transform: "scale(0.8)" }} />}
                                label={<span className="text-sm">Bank</span>}
                            />
                        </RadioGroup>
                    </div>

                    {state.PaymentMode == 'Bank' && <div className='w-[50%] flex justify-end items-center'>
                        <Button variant="contained" className='MUIbutton' onClick={handleOpen}
                            color={state.BankName && state.ChequeDDnum && state.ChequeDDdate ? 'success' : 'error'}>
                            Bank Details</Button>
                    </div>}
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                    <span className="text-sm w-[full] text-gray-700">Advance Amount : </span>
                    <input
                        type="number"
                        placeholder="Enter Advance Amount"
                        className="InputStyle w-[full]"
                        value={state.AdvanceAmount}
                        onChange={(e) => handleChange('AdvanceAmount', e.target.value)}
                    />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                    <span className="text-sm w-[full] text-gray-700">Remarks : </span>
                    <textarea
                        type="text"
                        placeholder="Enter Remark"
                        className="TextAreaStyle w-[full]"
                        value={state.Remark}
                        onChange={(e) => handleChange('Remark', e.target.value)}
                    ></textarea>
                </div>

                <div className="w-full flex justify-end items-start gap-3 pt-1">
                    <Button variant="outlined" className='MUIbutton' onClick={() => dispatch({ type: 'Reset' })}>
                        Reset</Button>
                    <Button variant="contained" className='MUIbutton' onClick={ValidateFunction}>Submit</Button>
                </div>

            </form>

            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='BankDetailsModalMain'
            >
                <div className='BankDetailsModalSub'>
                    <div className='w-full h-[32px] flex justify-between items-center'>
                        <span className='text-sm tracking-wide font-medium'>Bank Details</span>
                        <IoIosClose style={{ fontSize: "24px", color: "red", cursor: "pointer" }} onClick={handleClose} />
                    </div>
                    <form className='w-full h-auto flex flex-col justify-start items-start gap-2 py-3'>

                        <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                            <span className="text-xs w-[full] text-gray-700">Our Bank Name : </span>

                            <select className='InputStyle' onChange={handleBankSelectChange} value={state.BankName}>
                                <option value="">Select Bank Name</option>
                                {BankList.map((item, index) => (
                                    <option key={index} value={item.BankName} className='Selected'>
                                        {item.BankName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                            <span className="text-xs w-[full] text-gray-700">Cheque/DD No : </span>
                            <input
                                type="number"
                                placeholder="Enter Cheque/DD No"
                                className="InputStyle w-[full]"
                                value={state.ChequeDDnum}
                                onChange={(e) => handleChange('ChequeDDnum', e.target.value)}
                            />
                        </div>

                        <div className="w-full flex flex-col justify-start items-start gap-[4px]">
                            <span className="text-xs w-[full] text-gray-700">Cheque Date : </span>
                            <input
                                type="date"
                                placeholder="Select Date"
                                className="InputStyle w-[full]"
                                value={state.ChequeDDdate}
                                onChange={(e) => handleChange('ChequeDDdate', e.target.value)}
                            />
                        </div>


                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AdvanceVoucher
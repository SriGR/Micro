"use client"
import React, { useReducer } from 'react';

const AttendanceReducer = (state, action) => {
    switch (action.type) {
        case "RefNo":
            return { ...state, RefNo: action.payload };
        case "SelectedDate":
            return { ...state, SelectedDate: action.payload };
    }
}

const initialState = {
    RefNo: '',
    SelectedDate: ''
}

const Status = () => {
    const [state, dispatch] = useReducer(AttendanceReducer, initialState);

    const employees = [
        { name: "Shahul", role: "Team leader", status: "Present", color: "bg-green-800" },
        { name: "Gokul", role: "Node developer", status: "Present", color: "bg-green-800" },
        { name: "Sree", role: "Frontend developer", status: "Absent", color: "bg-[#ff0000]" },
        { name: "Karthi", role: "Frontend developer", status: "Half Day", color: "bg-[#ffa500]" },
        { name: "Afrid", role: "Backend developer", status: "Present", color: "bg-green-800" },
        { name: "Shahul", role: "Team leader", status: "Present", color: "bg-green-800" },
        { name: "Gokul", role: "Node developer", status: "Present", color: "bg-green-800" },
        { name: "Sree", role: "Frontend developer", status: "Half Day", color: "bg-[#ffa500]" },
        { name: "Karthi", role: "Frontend developer", status: "Present", color: "bg-green-800" },
        { name: "Afrid", role: "Backend developer", status: "Present", color: "bg-green-800" },
        { name: "Shahul", role: "Team leader", status: "Absent", color: "bg-[#ff0000]" },
        { name: "Gokul", role: "Node developer", status: "Absent", color: "bg-[#ff0000]" },
        { name: "Sree", role: "Frontend developer", status: "Present", color: "bg-green-800" },
        { name: "Karthi", role: "Frontend developer", status: "Present", color: "bg-green-800" },
        { name: "Afrid", role: "Backend developer", status: "Present", color: "bg-green-800" },
        { name: "Shahul", role: "Team leader", status: "Present", color: "bg-green-800" },
        { name: "Gokul", role: "Node developer", status: "Present", color: "bg-green-800" },
        { name: "Sree", role: "Frontend developer", status: "Present", color: "bg-green-800" },
        { name: "Karthi", role: "Frontend developer", status: "Present", color: "bg-green-800" },
        { name: "Afrid", role: "Backend developer", status: "Present", color: "bg-green-800" },
        { name: "Shahul", role: "Team leader", status: "Present", color: "bg-green-800" },
        { name: "Gokul", role: "Node developer", status: "Present", color: "bg-green-800" },
        { name: "Sree", role: "Frontend developer", status: "Present", color: "bg-green-800" },
        { name: "Karthi", role: "Frontend developer", status: "Present", color: "bg-green-800" },
        { name: "Afrid", role: "Backend developer", status: "Present", color: "bg-green-800" },
    ];

    return (
        <div className='w-full h-screen p-5 flex flex-col gap-3 justify-start items-start bg-[#f1f1f1] overflow-hidden'>
            <div className='w-full h-10 flex justify-between items-center'>
                <p className='w-1/2 text-base tracking-wide font-medium'>Attendance Status</p>
                <div className='w-1/2 h-full flex justify-end items-center gap-3'>
                    <div className='w-1/4'>
                        <input
                            type="text"
                            placeholder="Enter Ref No"
                            className="InputStyle"
                            value={state.RefNo}
                            onChange={(e) => dispatch({ type: "RefNo", payload: e.target.value })}
                        />
                    </div>

                    <div className='w-1/4'>
                        <input
                            type="date"
                            placeholder="Select date"
                            className="InputStyle"
                            value={state.SelectedDate}
                            onChange={(e) => dispatch({ type: "SelectedDate", payload: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className='w-full h-24 flex justify-between items-center gap-5'>
                <div className='w-1/4 h-full bg-white rounded p-4'>
                    <div className='border-l-2 border-blue-500 w-full h-full flex flex-col items-start justify-center p-3 gap-1'>
                        <span className='text-sm tracking-wide text-[#4b4b4b]'>Total</span>
                        <span className='text-2xl tracking-wide font-semibold text-[#000]'>30</span>
                    </div>
                </div>
                <div className='w-1/4 h-full bg-white rounded p-4'>
                    <div className='border-l-2 border-green-800 w-full h-full flex flex-col items-start justify-center p-3 gap-1'>
                        <span className='text-sm tracking-wide text-[#4b4b4b]'>Present</span>
                        <span className='text-2xl tracking-wide font-semibold text-[#000]'>25</span>
                    </div>
                </div>
                <div className='w-1/4 h-full bg-white rounded p-4'>
                    <div className='border-l-2 border-[#ff0000] w-full h-full flex flex-col items-start justify-center p-3 gap-1'>
                        <span className='text-sm tracking-wide text-[#4b4b4b]'>Absent</span>
                        <span className='text-2xl tracking-wide font-semibold text-[#000]'>3</span>
                    </div>
                </div>
                <div className='w-1/4 h-full bg-white rounded p-4'>
                    <div className='border-l-2 border-[#ffa500] w-full h-full flex flex-col items-start justify-center p-3 gap-1'>
                        <span className='text-sm tracking-wide text-[#4b4b4b]'>Half Day</span>
                        <span className='text-2xl tracking-wide font-semibold text-[#000]'>2</span>
                    </div>
                </div>
            </div>

            <div className='w-full h-[calc(100vh-200px)] flex flex-col justify-start items-start'>
                <p className='w-full text-sm tracking-wide font-medium pb-3'>Employee's List :</p>
                <div className="w-full h-full overflow-y-auto flex flex-wrap gap-[1.25%] justify-start items-start ScrollBarForStatus pr-2">
                    {employees.map((emp, index) => (
                        <div key={index} className="w-[19%] h-auto mb-[1.23%] bg-white rounded p-4 flex flex-col items-start justify-center gap-1">
                            <span className="text-base tracking-wide text-[#000]">{emp.name}</span>
                            <span className="text-sm tracking-wide text-[#4b4b4b]">{emp.role}</span>
                            <div className={`text-sm h-[26px] px-3 ${emp.color} rounded text-white mt-1 tracking-wider font-normal flex items-center justify-center`}>
                                {emp.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Status
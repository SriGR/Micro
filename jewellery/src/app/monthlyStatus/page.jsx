"use client"
import { useState } from "react";
import { FcPrint } from "react-icons/fc";


const MonthYearTable = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const headers = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const statusOptions = ["A", "P", "H"];

    const sampleData = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Johnson" },
        { id: 4, name: "Robert Brown" },
        { id: 5, name: "Emily Davis" },
        { id: 6, name: "John Doe" },
        { id: 7, name: "Jane Smith" },
        { id: 8, name: "Alice Johnson" },
        { id: 9, name: "Robert Brown" },
        { id: 10, name: "Emily Davis" }
    ].map(user => ({
        ...user,
        values: Array.from({ length: daysInMonth }, () => statusOptions[Math.floor(Math.random() * statusOptions.length)])
    }));

    return (
        <div className="w-full h-screen p-5 flex flex-col gap-3 justify-start items-start bg-[#fff] overflow-hidden">
            <div className="w-full h-10 flex justify-between items-center">
                <p className='w-1/2 text-base tracking-wide font-medium'>Monthly Attendance Status</p>
                <div className='w-1/2 h-full flex justify-end items-center gap-3'>

                    <div className='w-[160px]'>
                        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} className="InputStyle">
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {new Date(0, i).toLocaleString("en", { month: "long" })}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='w-[160px]'>
                        <input
                            type="number"
                            className="InputStyle"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            min="1900"
                            max="2100"
                        />
                    </div>

                    <div className='w-[100px] h-[32px] bg-gray-200 cursor-pointer hover:bg-gray-300
                     border-1 border-black flex justify-center items-center rounded text-sm gap-2 font-medium'
                        onClick={() => window.print()}
                    >
                        <FcPrint style={{ fontSize: "20px" }} />
                        Print
                    </div>
                </div>
            </div>

            <div className="w-full h-[calc(100vh-70px)] overflow-auto">
                <table className="w-full border-collapse border border-gray-300 text-center">
                    <thead className="sticky top-0 z-10 bg-gray-200">
                        <tr className="border border-gray-300">
                            <th className="p-2 border border-gray-300">S.No</th>
                            <th className="p-2 border border-gray-300">Name</th>
                            {headers.map((day) => (
                                <th key={day} className="p-2 border border-gray-300">{day}</th>
                            ))}
                            {/* <th className="p-2 border border-gray-300">Tot.Attend</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {sampleData.map((row, index) => (
                            <tr key={row.id} className="bg-white hover:bg-gray-100">
                                <td className="p-2 border border-gray-300 text-sm">{index + 1}</td>
                                <td
                                    className="p-2 border border-gray-300 text-sm truncate max-w-[150px] overflow-hidden whitespace-nowrap"
                                    title={row.name}
                                >
                                    {row.name}
                                </td>
                                {row.values.map((value, index) => (
                                    <td key={index} className="p-2 border border-gray-300 text-sm">{value}</td>
                                ))}
                                {/* <td className="p-2 border border-gray-300 font-bold text-sm">5</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default MonthYearTable;


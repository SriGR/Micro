"use client";
import React, { useReducer, useRef, useState } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";

const AttendanceReducers = (state, action) => {
    switch (action.type) {
        case "SetDatas":
            return { ...state, ...action.payload };
        case "EmpCode":
            return { ...state, EmpCode: action.payload }
        default:
            return state;
    }
};

const initialState = {
    EmpCode: "",
    EmpName: "",
    RegisteredDate: "",
    RegisteredTime: "",
    AttendanceStatus: "",
    CameraData: ""
};

const Page = () => {
    const [state, dispatch] = useReducer(AttendanceReducers, initialState);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [view, setView] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const openCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = canvas.toDataURL("image/png");
                const stream = video.srcObject;
                if (stream instanceof MediaStream) {
                    stream.getTracks().forEach((track) => track.stop());
                }
                setCapturedImage(imageData);
                setIsCameraOpen(false);
                const now = new Date();
                dispatch({
                    type: "SetDatas",
                    payload: {
                        EmpName: "Shahul",
                        RegisteredDate: now.toISOString().split("T")[0],
                        RegisteredTime: now.toLocaleTimeString(),
                        AttendanceStatus: "Present",
                        CameraData: imageData,
                    },
                });
            }
        }
    };

    return (
        <div className="ParentSection">
            <div className="w-screen h-screen overflow-hidden flex justify-center items-center ParentBg p-6">
                <div className="w-full h-auto bg-[#fff] p-7 flex flex-col justify-center items-center rounded-xl gap-5 CardShadow md:w-[350px]">
                    <Image
                        src="/images/BrandLogo.jpg"
                        alt="Brand Logo"
                        width={150}
                        height={0}
                        className="w-[140px] md:w-[150px]"
                    />
                    <span className="text-base tracking-wide font-medium mt-1">
                        Attendance Registry
                    </span>
                    {!isCameraOpen && !view &&
                        <form className="w-full flex flex-col justify-center items-center gap-5 mt-1">
                            <div className="w-full flex justify-center items-center gap-3">
                                <div className="w-[85%] flex justify-center items-center gap-[2px]">
                                    <input
                                        type="text"
                                        placeholder="Employee Code"
                                        className="InputStyle"
                                        value={state.EmpCode}
                                        onChange={(e) => dispatch({ type: "EmpCode", payload: e.target.value })}
                                    />
                                </div>

                                <div
                                    className="w-[15%] h-[32px] flex justify-center items-center border border-[#ddd] rounded cursor-pointer hover:bg-gray-200"
                                    onClick={openCamera}
                                >
                                    <FaCamera style={{ fontSize: "18px" }} />
                                </div>
                            </div>

                            <input
                                type="text"
                                placeholder="Name"
                                className="InputStyle"
                                value={state.EmpName}
                                readOnly
                            />

                            <div className="w-full flex justify-center items-center gap-3">
                                <div className="w-[50%] flex justify-center items-center gap-[2px]">
                                    <input
                                        type="text"
                                        placeholder="Date"
                                        className="InputStyle"
                                        value={state.RegisteredDate}
                                        readOnly
                                    />
                                </div>

                                <div className="w-[50%] flex justify-center items-center gap-[2px]">
                                    <input
                                        type="text"
                                        placeholder="Time"
                                        className="InputStyle"
                                        value={state.RegisteredTime}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="w-[100%] flex justify-center items-center gap-[2px]">
                                <span className="text-sm w-[50%] text-gray-700 md:w-[30%]">Attendance : </span>
                                <input
                                    type="text"
                                    placeholder="Status"
                                    className="InputStyle2 w-[50%] md:w-[70%]"
                                    value={state.AttendanceStatus}
                                    readOnly
                                />
                            </div>
                        </form>}

                    {isCameraOpen && !view && (
                        <div className="w-full flex flex-col justify-center items-center gap-5">
                            <video ref={videoRef} autoPlay playsInline className="w-full h-auto bg-black rounded-md" />
                            <button onClick={captureImage} className="w-[70%] h-[32px] text-sm rounded bg-blue-500 text-white">
                                Capture
                            </button>
                        </div>
                    )}

                    {view && !isCameraOpen && <div className="w-full flex flex-col justify-center items-center gap-3">
                        <img src={capturedImage} alt="Captured" className="w-full h-auto" />
                        <button className="w-full h-[32px] rounded bg-[#FF0000] text-white text-sm" onClick={() => setView(false)}>
                            Close
                        </button>
                    </div>}

                    {capturedImage && !view && !isCameraOpen &&
                        <div className="w-full h-[32px] bg-green-500 rounded flex justify-center items-center text-sm text-white"
                            onClick={() => setView(true)}>
                            {"Attached (Click to view)"}
                        </div>
                    }
                    <canvas ref={canvasRef} className="hidden" />
                </div>
            </div>
        </div>
    );
};

export default Page;

"use client";
import React, { useReducer, useEffect, useState, useRef } from "react";
import Image from "next/image";
import BarcodeScannerComponent from "../../../Barcodescanner";
import { MdQrCodeScanner } from "react-icons/md";
import CommonGETAPICall from "../../utils/CommonGETCall";
import { TbLogout2 } from "react-icons/tb";
import { useRouter } from "next/navigation";

// Initial state
const initialState = {
  Barcode: "",
  Purity: "",
  Grosswgt: "",
  TotalWeightValue: "",
  Netwgt: "",
  SalWastPer: "",
};

// Reducer function
const ItemsReducers = (state, action) => {
  switch (action.type) {
    case "SetItems":
      return { ...state, ...action.payload };
    case "Barcode":
      return { ...state, Barcode: action.payload };
    case "Clear":
      return initialState;
    default:
      return state;
  }
};

const Page = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(ItemsReducers, initialState);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const barCodeRef = useRef(null);

  useEffect(() => {
    if (state.Barcode) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        handleBarcodeScan(state.Barcode);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [state.Barcode]);

  const handleBarcodeScan = (scannedCode) => {
    const url = `/api/scanner?p1=${scannedCode}`;

    CommonGETAPICall({ url }).then((response) => {
      const { Output } = response;
      if (Output.status.code === 200) {
        dispatch({ type: "SetItems", payload: Output.data[0] });
      } else {
        alert(Output.status.message);
      }
      setIsLoading(false);
    });
  };

  const handleCloseCamera = () => {
    setIsScanning(!isScanning);
  };

  const clear = () => {
    dispatch({ type: "Clear" });
  };

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="ParentSection relative w-full h-full">
      {/* Logout Button */}
      <div className="absolute flex justify-center items-center border cursor-pointer"
        style={{ width: "30px", height: "30px", backgroundColor: "#ddd", right: "20px", top: "10px" }}
        title="logout" onClick={logout}>
        <TbLogout2 style={{ width: "25px", height: "25px" }} />
      </div>

      {/* Main Container */}
      <div className="w-screen h-screen overflow-auto flex justify-center items-center ParentBg p-6">
        <div className="w-full h-auto bg-[#fff] p-7 flex flex-col justify-center items-center rounded-xl gap-4 CardShadow md:w-[350px]">
          
          <Image src="/images/BrandLogo.jpg" alt="Latha Jewellery Logo" width={170} height={0}
            className="w-[140px] md:w-[170px]" />
          <span className="text-base tracking-wide font-medium text-yellow-500 mt-1 md:text-lg">
            Latha Jewellery
          </span>

          {/* Form Section */}
          <form className="w-full flex flex-col justify-center items-center gap-5 mt-1">
            {/* Barcode Scanner */}
            {isScanning && (
              <div className="w-full h-auto p-7 flex flex-col justify-center items-center rounded-xl gap-4 ">
                <BarcodeScannerComponent onScanSuccess={handleBarcodeScan} CloseCamera={handleCloseCamera} />
              </div>
            )}

            {/* Barcode Input */}
            <div className={`flex justify-center items-center gap-2 w-full ${isScanning ? "mt-[5rem]" : ""}`}>
              <div style={{ width: "90%", position: "relative" }}>
                <label htmlFor="barcode" className="text-sm">Barcode</label>
                <input
                  type="text"
                  id="barcode"
                  ref={barCodeRef}
                  placeholder="Enter barcode"
                  className="InputStyle"
                  value={state.Barcode}
                  style={{ paddingRight: "30px" }}
                  disabled={isLoading}
                  onChange={(e) => dispatch({ type: "Barcode", payload: e.target.value })}
                />
                <div
                  style={{ position: "absolute", top: "25px", right: "10px" }}
                  className="text-gray-500 cursor-pointer"
                  onClick={clear}
                >
                  x
                </div>
              </div>
              <div className="mt-6">
                <MdQrCodeScanner onClick={handleCloseCamera} />
              </div>
            </div>

            {/* Loading Indicator */}
            {isLoading && <p className="text-blue-500">Loading...</p>}

            {/* Details Section */}
            <div className="w-full flex flex-col gap-3 border-b text-xs">
              <p className="flex justify-between">
                <span className="text-black text-base">Purity:</span>
                <span className="font-bold text-green-800 text-lg">{state.Purity}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-black text-base">Gross Weight:</span>
                <span className="font-bold text-green-800 text-lg">{state.Grosswgt}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-black text-base">Net Weight:</span>
                <span className="font-bold text-green-800 text-lg">{state.Netwgt}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-black text-base">Sal Wast Per:</span>
                <span className="font-bold text-green-800 text-lg">{state.SalWastPer}</span>
              </p>
            </div>

            {/* Total Weight */}
            <div className="w-full flex flex-col gap-3">
              <p className="flex justify-between">
                <span className="text-black text-base">Total Weight:</span>
                <span className="font-bold text-green-800 text-lg">{state.TotalWeightValue}</span>
              </p>
            </div>
          </form>

          {/* Clear Button */}
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={clear}
            disabled={isLoading}
          >
            {isLoading ? "Clearing..." : "Clear"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

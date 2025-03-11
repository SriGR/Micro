"use client";
import React, { useReducer, useEffect, useState, useRef  } from "react";
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

// Reducer function to handle state updates
const ItemsReducers = (state, action) => {
  switch (action.type) {
    case "SetItems":
      return { ...state, ...action.payload };
    case "Barcode":
      return { ...state, Barcode: action.payload };
    default:
      return state;
  }
};

const Page = () => {
  // useReducer hook to handle state
  const router = useRouter();
  const [state, dispatch] = useReducer(ItemsReducers, initialState);
  const [isScanning, setIsScanning] = useState(false); // Manage scanner visibility
  const barCodeRef = useRef(null);

  useEffect(() => {
    if (state.Barcode) {
      const timeout = setTimeout(() => {
        dispatch({ type: "Barcode", payload: state.Barcode });
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
        console.log("Output:", Output.data[0]);
        dispatch({ type: "SetItems", payload: Output.data[0] });
      } else {
        alert(Output.status.message);
      }
    });
  };

  const handleCloseCamera = () => {
    setIsScanning(!isScanning);
  };

  async function clear() {
    dispatch({ type: "Barcode", payload: "" });
    dispatch({ type: "Purity", payload: "" });  
    dispatch({ type: "Grosswgt", payload: "" });
    dispatch({ type: "TotalWeightValue", payload: "" });
    dispatch({ type: "Netwgt", payload: "" });
    dispatch({ type: "SalWastPer", payload: "" });
  }

  async function logout() {
   
    localStorage.clear()
    router.push('/login');
  }

  return (
    <div className="ParentSection relative w-full h-full">
      <div className="absolute flex justify-center items-center border cursor-pointer " style={{width:'30px',height:'30px',backgroundColor:'#ddd',right:'20px',top:'10px'}} title="logout" onClick={logout}>
      <TbLogout2  style={{width:'25px',height:'25px'}}/>
      </div>
      <div className="w-screen h-screen overflow-auto flex justify-center items-center ParentBg p-6">
        <div className="w-full h-auto bg-[#fff] p-7 flex flex-col justify-center items-center rounded-xl gap-4 CardShadow md:w-[350px]">
          <Image
            src="/images/BrandLogo.jpg"
            alt="Latha Jewellery Logo"
            width={170}
            height={0}
            className="w-[140px] md:w-[170px]"
          />
          <span className="text-base tracking-wide font-medium text-yellow-500 mt-1 md:text-lg">
            Latha Jewellery
          </span>

          <form className="w-full flex flex-col justify-center items-center gap-5 mt-1">
            {isScanning && (
              <div className="w-full h-auto p-7 flex flex-col justify-center items-center rounded-xl gap-4 ">
                <BarcodeScannerComponent
                  onScanSuccess={handleBarcodeScan}
                  CloseCamera={handleCloseCamera}
                />
              </div>
            )}
            <div className={` flex justify-center items-center gap-2 w-full ${isScanning ? "mt-[5rem]" : ""}`}>
              <div style={{ width: "90%", position: 'relative' }}>
                <label htmlFor="barcode" className="text-sm">Barcode</label>
                <input
                  type="text"
                  id="barcode"
                  ref={barCodeRef}
                  placeholder="Enter barcode"
                  className="InputStyle"
                  value={state.Barcode}
                  style={{ paddingRight: '30px' }}
                  onChange={(e) => {
                    dispatch({ type: "Barcode", payload: e.target.value });
                  }}
                />
                <div style={{ position: 'absolute', top: '25px', right: '10px' }} className="text-gray-500 cursor-pointer" onClick={ clear }>x</div>
              </div>
              <div className="mt-6"> <MdQrCodeScanner onClick={handleCloseCamera} /></div>
            </div>

            <div className="w-full flex flex-col gap-3">
              <label htmlFor="purity" className="text-sm">Purity</label>
              <input
                type="text"
                id="purity"
                placeholder="Purity"
                className="InputStyle"
                value={state.Purity}
                readOnly
              />

              <label htmlFor="grosswgt" className="text-sm">Gross Weight</label>
              <input
                type="text"
                id="grosswgt"
                placeholder="Gross Weight"
                className="InputStyle"
                value={state.Grosswgt}
                readOnly
              />

              <label htmlFor="totalwgt" className="text-sm">Total Weight</label>
              <input
                type="text"
                id="totalwgt"
                placeholder="Total Weight"
                className="InputStyle"
                value={state.TotalWeightValue}
                readOnly
              />

              <label htmlFor="netwgt" className="text-sm">Net Weight</label>
              <input
                type="text"
                id="netwgt"
                placeholder="Net Weight"
                className="InputStyle"
                value={state.Netwgt}
                readOnly
              />

              <label htmlFor="salwastper" className="text-sm">Sal Wast Per</label>
              <input
                type="text"
                id="salwastper"
                placeholder="Sal Wast Per"
                className="InputStyle"
                value={state.SalWastPer}
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

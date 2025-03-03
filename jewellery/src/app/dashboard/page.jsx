"use client"
import React, { useReducer, useEffect ,useState } from 'react';
import Image from 'next/image';
import BarcodeScannerComponent from '../../../Barcodescanner'
import { MdQrCodeScanner } from "react-icons/md";

// Initial state
const initialState = {
  ItemCode: '',
  Purity: '',
  GrossWt: '',
  StoneWt: '',
  NetWt: '',
  Wastage: ''
};

// Reducer function to handle state updates
const ItemsReducers = (state, action) => {
  switch (action.type) {
    case 'SetItems':
      return { ...state, ...action.payload }; // update the state with item details
    case 'ItemCode':
      // Find the item based on the barcode (ItemCode) and update state
      const selectedItem = data.find(item => item.ItemCode === action.payload);
      return selectedItem ? { ...state, ...selectedItem } : state;
    default:
      return state;
  }
};

const page = () => {
  // useReducer hook to handle state
  const [state, dispatch] = useReducer(ItemsReducers, initialState);
  const [isScanning, setIsScanning] = useState(false); // Manage scanner visibility

  const data = [
    { "Purity": "22K", "GrossWt": "15.2g", "StoneWt": "2.5g", "NetWt": "12.7g", "Wastage": "1%" },
    { "Purity": "18K", "GrossWt": "10.5g", "StoneWt": "1.8g", "NetWt": "8.7g", "Wastage": "1.5%" },
    { "Purity": "24K", "GrossWt": "20.3g", "StoneWt": "3.0g", "NetWt": "17.3g", "Wastage": "0.8%" },
    { "Purity": "21K", "GrossWt": "12.8g", "StoneWt": "1.2g", "NetWt": "11.6g", "Wastage": "1.2%" },
    { "Purity": "22K", "GrossWt": "18.7g", "StoneWt": "2.9g", "NetWt": "15.8g", "Wastage": "1%" }
  ];

  const handleBarcodeScan = (scannedCode) => {
    dispatch({ type: 'SetItems', payload: { "ItemCode": scannedCode, "Purity": "22K", "GrossWt": "15.2g", "StoneWt": "2.5g", "NetWt": "12.7g", "Wastage": "1%" }, });

  };

  const handleCloseCamera = () => {
    // Hide the camera scanner
    setIsScanning(!isScanning);
  }

  return (
    <div className='ParentSection'>
      <div className='w-screen h-screen overflow-hidden flex justify-center items-center ParentBg p-6'>
        <div className='w-full h-auto bg-[#fff] p-7 flex flex-col justify-center items-center rounded-xl gap-4 CardShadow md:w-[350px]'>
          <Image
            src="/images/BrandLogo.jpg"
            alt="Description of image"
            width={170}
            height={0}
            className="w-[140px] md:w-[170px]"
          />
          <span className='text-base tracking-wide font-medium text-yellow-500 mt-1 md:text-lg'>Latha Jewellery</span>
          <form className='w-full flex flex-col justify-center items-center gap-5 mt-1'>
            {/* Input fields now correctly reflect the state */}

            {isScanning && <div className='w-full h-auto p-7 flex flex-col justify-center items-center rounded-xl gap-4  '>
              <BarcodeScannerComponent
                barCode={handleBarcodeScan}  CloseCamera={handleCloseCamera}/>
            </div>}
            <div className={`flex justify-center items-center gap-2 w-full ${isScanning ? 'mt-[5rem]':''}`}>
             <div style={{width:'90%'}}>
             <input type='text' placeholder='Item Code' className='InputStyle' value={state.ItemCode} onChange={(e) => {
                dispatch({ type: 'SetItems', payload: { "ItemCode": e.target.value, "Purity": "22K", "GrossWt": "15.2g", "StoneWt": "2.5g", "NetWt": "12.7g", "Wastage": "1%" }, });
              }} />
             </div>
              <MdQrCodeScanner  onClick={handleCloseCamera}/>
            </div>
            <input type='text' placeholder='Purity' className='InputStyle' value={state.Purity} readOnly />

            <input type='text' placeholder='G.Wt' className='InputStyle' value={state.GrossWt} readOnly />
            <input type='text' placeholder='St.Wt' className='InputStyle' value={state.StoneWt} readOnly />
            <input type='text' placeholder='Nt.Wt' className='InputStyle' value={state.NetWt} readOnly />
            <input type='text' placeholder='Wastage' className='InputStyle' value={state.Wastage} readOnly />
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;

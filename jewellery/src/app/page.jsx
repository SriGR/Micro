"use client"
import React, { useReducer } from 'react';
import Image from 'next/image';

const ItemsReducers = (state, action) => {
  switch (action.type) {
    case 'SetItems':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const initialState = {
  ItemCode: '',
  Purity: '',
  GrossWt: '',
  StoneWt: '',
  NetWt: '',
  Wastage: ''
};

const page = () => {
  const [state, dispatch] = useReducer(ItemsReducers, initialState);

  const data = [
    { "ItemCode": "J001", "Purity": "22K", "GrossWt": "15.2g", "StoneWt": "2.5g", "NetWt": "12.7g", "Wastage": "1%" },
    { "ItemCode": "J002", "Purity": "18K", "GrossWt": "10.5g", "StoneWt": "1.8g", "NetWt": "8.7g", "Wastage": "1.5%" },
    { "ItemCode": "J003", "Purity": "24K", "GrossWt": "20.3g", "StoneWt": "3.0g", "NetWt": "17.3g", "Wastage": "0.8%" },
    { "ItemCode": "J004", "Purity": "21K", "GrossWt": "12.8g", "StoneWt": "1.2g", "NetWt": "11.6g", "Wastage": "1.2%" },
    { "ItemCode": "J005", "Purity": "22K", "GrossWt": "18.7g", "StoneWt": "2.9g", "NetWt": "15.8g", "Wastage": "1%" }
  ];

  const handleSelectChange = (e) => {
    const selectedItem = data.find(item => item.ItemCode === e.target.value);
    if (selectedItem) {
      dispatch({ type: 'SetItems', payload: selectedItem });
    }
  };

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
            <select className='InputStyle' onChange={handleSelectChange} value={state.ItemCode}>
              <option value="">Select Item Code</option>
              {data.map((item, index) => (
                <option key={index} value={item.ItemCode} className='Selected'>
                  {item.ItemCode}
                </option>
              ))}
            </select>
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

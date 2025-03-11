"use client";
import { useState ,useRef } from "react";
import { MdClear } from "react-icons/md";

export default function TextField() {
  const [value, setValue] = useState("");
  const labelRef = useRef(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const clearInput = () => {
    setValue("");
  };
  const lableClick = () => {
    inputRef.current.focus();
    labelRef.current.style.top = "-10px";
    labelRef.current.style.left = "-10px";
  }

  return (
    <div className="relative w-full flex items-center border border-gray-300 rounded-md px-3" style={{height: "2rem"}}>
      <label className="absolute top:-10 left:10 text-sm w-full " ref={labelRef} onClick={lableClick} >Item Code</label>
      <input
        type="text"
        ref={inputRef}
        className="w-full h-9 text-sm text-gray-900 bg-transparent outline-none"
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button
          type="button"
          onClick={clearInput}
          className="text-gray-400 hover:text-gray-600 transition duration-200"
        >
          <MdClear size={18} />
        </button>
      )}
    </div>
  );
}

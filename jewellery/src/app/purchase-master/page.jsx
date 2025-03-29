"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, Home, Settings, User, LogOut, PlusCircle, Search } from "lucide-react";
import Link from "next/link";

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`bg-gray-900 text-white w-64 min-h-screen p-5 transition-all ${isOpen ? "block" : "hidden"} md:block`}>
      <div className="flex justify-between items-center">
        <Image src="/images/BrandLogo.jpg" alt="Brand Logo" width={170} height={0} className="w-[120px] sm:w-[140px] md:w-[170px]" />
        <button onClick={toggleSidebar} className="md:hidden">
          <X className="w-6 h-6" />
        </button>
      </div>
      <ul className="mt-5 space-y-2">
              <li>
                <Link href="/dashboard" className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <Home className="w-5 h-5 mr-2" /> Dashboard
                </Link>
              </li>
              <li>
                <Link href="/supplier" className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <User className="w-5 h-5 mr-2" /> Supplier
                </Link>
              </li>
              <li>
                <Link href="/purchase-details" className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <User className="w-5 h-5 mr-2" /> Purchase Details
                </Link>
              </li>
              <li>
                <Link href="/purchase-master" className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <User className="w-5 h-5 mr-2" /> Purchase Master
                </Link>
              </li>
              <li>
                <Link href="/category" className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <User className="w-5 h-5 mr-2" /> Category Master
                </Link>
              </li>
              <li>
                <Link href="/item-master" className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <User className="w-5 h-5 mr-2" /> Item Master
                </Link>
              </li>
              <li>
                <Link href="/settings" className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <Settings className="w-5 h-5 mr-2" /> Settings
                </Link>
              </li>
            </ul>
      <button className="mt-5 w-full flex items-center p-2 bg-red-600 hover:bg-red-700 rounded text-white"><LogOut className="w-5 h-5 mr-2" /> Logout</button>
    </div>
  );
};

// Header Component
const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="md:hidden"><Menu className="w-6 h-6" /></button>
      <h2 className="text-xl font-semibold">Purchase Master</h2>
    </header>
  );
};

// Purchase Form Component
const PurchaseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    PurRefNo: "",
    PurchaseDate: "",
    SupInvNo: "",
    SupplierIndex: "",
    TotalAmount: "",
    FrieghtChrg: "",
    DiscountAmt: "",
    RoundOff: "",
    NetAmount: "",
    Remarks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      PurRefNo: "",
      PurchaseDate: "",
      SupInvNo: "",
      SupplierIndex: "",
      TotalAmount: "",
      FrieghtChrg: "",
      DiscountAmt: "",
      RoundOff: "",
      NetAmount: "",
      Remarks: "",
    });
  };

  return (
    <form className="bg-white p-4 space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-2">Add Purchase</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="number" name="PurRefNo" placeholder="Purchase Reference No" value={formData.PurRefNo} onChange={handleChange} className="w-full p-2 border rounded text-sm" required />
        <input type="date" name="PurchaseDate" value={formData.PurchaseDate} onChange={handleChange} className="w-full p-2 border rounded text-sm" required />
        <input type="text" name="SupInvNo" placeholder="Supplier Invoice No" value={formData.SupInvNo} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
        <input type="number" name="SupplierIndex" placeholder="Supplier Index" value={formData.SupplierIndex} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
        <input type="number" step="0.01" name="TotalAmount" placeholder="Total Amount" value={formData.TotalAmount} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
        <input type="number" step="0.01" name="FrieghtChrg" placeholder="Freight Charges" value={formData.FrieghtChrg} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
        <input type="number" step="0.01" name="DiscountAmt" placeholder="Discount Amount" value={formData.DiscountAmt} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
        <input type="number" step="0.01" name="RoundOff" placeholder="Round Off" value={formData.RoundOff} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
        <input type="number" step="0.01" name="NetAmount" placeholder="Net Amount" value={formData.NetAmount} onChange={handleChange} className="w-full p-2 border rounded text-sm" required />
        <input type="text" name="Remarks" placeholder="Remarks" value={formData.Remarks} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-3">Submit</button>
    </form>
  );
};

// Purchase Table Component
const PurchaseTable = ({ data }) => {
  return (
    <div className="bg-white p-4 overflow-x-auto">
      <h2 className="text-sm font-semibold mb-4">Purchase Records</h2>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">PurRefNo</th>
            <th className="border p-2">Purchase Date</th>
            <th className="border p-2">SupInvNo</th>
            <th className="border p-2">Supplier Index</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Freight Charges</th>
            <th className="border p-2">Discount Amount</th>
            <th className="border p-2">Round Off</th>
            <th className="border p-2">Net Amount</th>
            <th className="border p-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, i) => (
                <td key={i} className="border p-2">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Dashboard Layout
const DashboardLayout = () => {
  const [purchaseData, setPurchaseData] = useState([]);

  const addPurchase = (newPurchase) => {
    setPurchaseData([...purchaseData, newPurchase]);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-5">
          <PurchaseForm onSubmit={addPurchase} />
          <PurchaseTable data={purchaseData} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

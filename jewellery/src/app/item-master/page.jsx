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
        <Image
          src="/images/BrandLogo.jpg"
          alt="Brand Logo"
          width={170}
          height={0}
          className="w-[120px] sm:w-[140px] md:w-[170px]"
        />
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
      <button className="mt-5 w-full flex items-center p-2 bg-red-600 hover:bg-red-700 rounded text-white">
        <LogOut className="w-5 h-5 mr-2" /> Logout
      </button>
    </div>
  );
};

// Header Component
const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="md:hidden">
        <Menu className="w-6 h-6" />
      </button>
      <h2 className="text-xl font-semibold">Item Master</h2>
    </header>
  );
};

// Item Form Component
const ItemForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    hsnCode: "",
    categoryIndex: "",
    taxIndex: "",
    uomIndex: "",
    purRate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.itemCode.trim() || !formData.itemName.trim()) return;
    onSubmit(formData);
    setFormData({
      itemCode: "",
      itemName: "",
      hsnCode: "",
      categoryIndex: "",
      taxIndex: "",
      uomIndex: "",
      purRate: "",
    });
  };

  return (
    <form className="bg-white p-4 space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-2">Add Item</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="number" name="itemCode" placeholder="Item Code" value={formData.itemCode} onChange={handleChange} className="w-full p-2 border rounded text-sm" required />
        <input type="text" name="itemName" placeholder="Item Name" value={formData.itemName} onChange={handleChange} className="w-full p-2 border rounded text-sm" required />
        <input type="text" name="hsnCode" placeholder="HSN Code" value={formData.hsnCode} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
        <input type="number" name="categoryIndex" placeholder="Category Index" value={formData.categoryIndex} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
        <input type="number" name="taxIndex" placeholder="Tax Index" value={formData.taxIndex} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
        <input type="number" name="uomIndex" placeholder="UOM Index" value={formData.uomIndex} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
        <input type="number" step="0.01" name="purRate" placeholder="Purchase Rate" value={formData.purRate} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-3">
        Submit
      </button>
    </form>
  );
};

// Item Table Component with Search
const ItemTable = ({ data }) => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.itemName.toLowerCase().includes(search.toLowerCase()) ||
    item.itemCode.includes(search) ||
    item.hsnCode.includes(search)
  );

  return (
    <div className="bg-white p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Item Records</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded text-sm"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Index</th>
            <th className="border p-2">Item Code</th>
            <th className="border p-2">Item Name</th>
            <th className="border p-2">HSN Code</th>
            <th className="border p-2">Category Index</th>
            <th className="border p-2">Tax Index</th>
            <th className="border p-2">UOM Index</th>
            <th className="border p-2">Purchase Rate</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{item.itemCode}</td>
              <td className="border p-2">{item.itemName}</td>
              <td className="border p-2">{item.hsnCode}</td>
              <td className="border p-2">{item.categoryIndex}</td>
              <td className="border p-2">{item.taxIndex}</td>
              <td className="border p-2">{item.uomIndex}</td>
              <td className="border p-2">{item.purRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Dashboard Layout Component
const ItemMaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [itemData, setItemData] = useState([]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleForm = () => setShowForm(!showForm);
  const addItem = (newItem) => {
    setItemData([...itemData, newItem]);
    setShowForm(false);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-5">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold"></h2>
          <button onClick={toggleForm} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center">
            <PlusCircle className="w-5 h-5 mr-2" /> Add Item
          </button>
          </div>
          {showForm && <ItemForm onSubmit={addItem} />}
          <ItemTable data={itemData} />
        </main>
      </div>
    </div>
  );
};

export default ItemMaster;

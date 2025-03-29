"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, Home, Settings, User, LogOut, ShoppingCart, CreditCard, BarChart } from "lucide-react";
import Link from "next/link";

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

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center shadow-md">
      <button onClick={toggleSidebar} className="md:hidden">
        <Menu className="w-6 h-6" />
      </button>
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Admin</span>
      </div>
    </header>
  );
};

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            <div className="bg-blue-500 p-5 rounded-lg text-white flex items-center space-x-3">
              <ShoppingCart className="w-10 h-10" />
              <div>
                <h2 className="text-lg font-bold">Purchase History</h2>
                <p>120 Orders</p>
              </div>
            </div>
            <div className="bg-green-500 p-5 rounded-lg text-white flex items-center space-x-3">
              <CreditCard className="w-10 h-10" />
              <div>
                <h2 className="text-lg font-bold">Total Transactions</h2>
                <p>$25,000</p>
              </div>
            </div>
            <div className="bg-purple-500 p-5 rounded-lg text-white flex items-center space-x-3">
              <BarChart className="w-10 h-10" />
              <div>
                <h2 className="text-lg font-bold">Analytics</h2>
                <p>450 Visitors</p>
              </div>
            </div>
          </div>
         
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className="bg-[#232F3E] text-white">
      <div className="container mx-auto px-4">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link to="/home" className="flex-shrink-0">
            <h1 className="text-2xl font-bold">
              <span className="text-[#FF9900]">amazon</span>
              <span className="text-sm">.clone</span>
            </h1>
          </Link>

          {/* Search Bar - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex flex-grow mx-4 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Amazon"
              className="w-full rounded-md py-2 px-4 text-black focus:outline-none"
            />
            <button className="absolute right-0 top-0 bottom-0 bg-[#FF9900] px-4 rounded-r-md">
              <Search className="h-5 w-5 text-[#232F3E]" />
            </button>
          </div>

          {/* Right Nav Items */}
          <div className="flex items-center space-x-4">
            <Link to={user ? "/account" : "/login"} className="hidden sm:flex flex-col text-xs">
              <span>Hello, {user ? user.name : "Sign In"}</span>
              <span className="font-bold">Account & Lists</span>
            </Link>

            <Link to="/orders" className="hidden sm:flex flex-col text-xs">
              <span>Returns</span>
              <span className="font-bold">& Orders</span>
            </Link>

            <Link to="/cart" className="flex items-center">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF9900] text-[#232F3E] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline ml-1 font-bold">Cart</span>
            </Link>

            <button
              className="md:hidden flex items-center"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-2">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Amazon"
              className="w-full rounded-md py-2 px-4 text-black focus:outline-none"
            />
            <button className="absolute right-0 top-0 bottom-0 bg-[#FF9900] px-4 rounded-r-md">
              <Search className="h-5 w-5 text-[#232F3E]" />
            </button>
          </div>
        </div>

        {/* Categories Navigation */}
        <nav className="flex items-center py-1 overflow-x-auto scrollbar-hide">
          <button className="flex items-center text-sm px-2 py-1 whitespace-nowrap">
            <Menu className="h-4 w-4 mr-1" /> All
          </button>
          <a href="#" className="text-sm px-2 py-1 whitespace-nowrap">Today's Deals</a>
          <a href="#" className="text-sm px-2 py-1 whitespace-nowrap">Customer Service</a>
          <a href="#" className="text-sm px-2 py-1 whitespace-nowrap">Registry</a>
          <a href="#" className="text-sm px-2 py-1 whitespace-nowrap">Gift Cards</a>
          <a href="#" className="text-sm px-2 py-1 whitespace-nowrap">Sell</a>
        </nav>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-[#232F3E] border-t border-gray-700 absolute left-0 right-0 z-50">
          <div className="container mx-auto px-4 py-2">
            <Link to={user ? "/account" : "/login"} className="flex items-center py-2">
              <User className="h-5 w-5 mr-2" />
              {user ? `Hello, ${user.name}` : "Sign In / Register"}
            </Link>
            <Link to="/orders" className="flex items-center py-2">Returns & Orders</Link>
            {user && (
              <button onClick={logout} className="flex items-center py-2 text-left w-full">
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

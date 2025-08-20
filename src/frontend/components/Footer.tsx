
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#232F3E] text-white mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          <div>
            <h3 className="text-lg font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#">Careers</Link></li>
              <li><Link to="#">Blog</Link></li>
              <li><Link to="#">About Amazon</Link></li>
              <li><Link to="#">Investor Relations</Link></li>
              <li><Link to="#">Amazon Devices</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#">Sell products on Amazon</Link></li>
              <li><Link to="#">Sell on Amazon Business</Link></li>
              <li><Link to="#">Sell apps on Amazon</Link></li>
              <li><Link to="#">Become an Affiliate</Link></li>
              <li><Link to="#">Advertise Your Products</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Amazon Payment Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#">Amazon Business Card</Link></li>
              <li><Link to="#">Shop with Points</Link></li>
              <li><Link to="#">Reload Your Balance</Link></li>
              <li><Link to="#">Amazon Currency Converter</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#">Amazon and COVID-19</Link></li>
              <li><Link to="#">Your Account</Link></li>
              <li><Link to="#">Your Orders</Link></li>
              <li><Link to="#">Shipping Rates & Policies</Link></li>
              <li><Link to="#">Returns & Replacements</Link></li>
              <li><Link to="#">Help</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 py-6 text-center">
          <Link to="/home">
            <h1 className="text-2xl font-bold mb-4">
              <span className="text-[#FF9900]">amazon</span>
              <span className="text-sm">.clone</span>
            </h1>
          </Link>
          <p className="text-sm">&copy; {new Date().getFullYear()} Amazon Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

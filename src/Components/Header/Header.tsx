import React from "react";
import brandLogo from "../../assets/Brand/anvi-logo.png";
import categoryIcon from "../../assets/icons/categoryIcon.svg";
import CustomInput from "../CustomInput/CustomInput";
import CartSection from "../CartSection/CartSection";

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-[#920000] px-6 h-[100px]">
      {/* Logo Section */}
      <div>
        <img src={brandLogo} className="h-[100px] w-auto object-contain" alt="Brand Logo" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <img src={categoryIcon} className="h-6 w-6" alt="Categories" />
          <h2 className="text-white font-semibold font-sans">Categories</h2>
        </div>

        <CustomInput
          placeholder="Search for Chicken, Mutton and More.."
          height="50px"
          width="450px"
        />

        <button className="text-white font-medium">Login</button>

        <CartSection />
      </div>
    </div>
  );
};

export default Header;

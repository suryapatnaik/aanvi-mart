import React, { useEffect, useState } from "react";
import brandLogo from "../../assets/Brand/anvi-logo.png";
import categoryIcon from "../../assets/icons/categoryIcon.svg";
import CustomInput from "../CustomInput/CustomInput";
import CartSection from "../CartSection/CartSection";
import { fetchLocationDetails } from "../../utils/common/common.helpers";

// Add a location icon (using a Unicode emoji for now, replace with your SVG if needed)
const locationIcon = (
  <span role="img" aria-label="location" className="text-white text-lg">
    📍
  </span>
);

const fetchAndSetLocation = async (
  setLocation: React.Dispatch<React.SetStateAction<string>>,
  setPlusCode: React.Dispatch<React.SetStateAction<string>>
) => {
  const result = await fetchLocationDetails();
  if ("error" in result) {
    setLocation(result.error);
    setPlusCode("");
  } else {
    setPlusCode(result.plusCode);
    setLocation(result.address);
  }
};

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [location, setLocation] = useState<string>("Fetching location...");
  const [plusCode, setPlusCode] = useState<string>("");

  useEffect(() => {
    fetchAndSetLocation(setLocation, setPlusCode);
  }, []);

  return (
    <div className={`md:flex items-center md:justify-between bg-[#920000] p-2 ${className}`}>
      {/* Logo Section */}
      <div className="flex items-center gap-2 md:gap-4">
        <img
          src={brandLogo}
          className="w-[70px] object-contain"
          alt="Brand Logo"
        />

        <div className="flex flex-col text-white">
          <div className="flex items-center gap-1">
            {locationIcon}
            <span className="font-semibold">{plusCode || "--"}</span>
          </div>
          <span className="text-xs md:text-sm truncate w-full">
            {location}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-1">
          <img src={categoryIcon} className="h-6 w-6" alt="Categories" />
          <h2 className="text-white font-semibold font-sans cursor-pointer">
            Categories
          </h2>
        </div>

        <CustomInput
          placeholder="Search for Chicken, Mutton and More.."
          height="50px"
          width="450px"
        />

        <button className="text-white font-medium hidden md:block cursor-pointer">
          Login
        </button>

        <div className="hidden md:block">
          <CartSection />
        </div>
      </div>
    </div>
  );
};

export default Header;

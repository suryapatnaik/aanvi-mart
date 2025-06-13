import React, { useState } from "react";
import CartIcon from "../../assets/icons/CartIcon.svg";
import arrowRightIcon from "../../assets/icons/ArrowRight.svg";
const CartSection: React.FC = () => {
  const [itemCount, setItemCount] = useState(0);
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex justify-between border border-white p-2 rounded-lg m-2 font-medium">
      <div className="flex flex-col items-center justify-center text-white">
        <span>Items: {itemCount}</span>
        <span>Amount: &#8377;{amount}</span>
      </div>
      <div className="flex items-center justify-center gap-1">
        <img src={CartIcon} className="h-6 w-6" alt="cartIcon"></img>
        <img src={arrowRightIcon} className="h-5 w-5" alt="arrow-right"></img>
      </div>
    </div>
  );
};

export default CartSection;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../store/cartSlice';
import type { RootState } from '../store';

interface AddToCartBtnProps {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  className?: string;
}

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({ 
  id, 
  name, 
  image, 
  price, 
  description, 
  className = '' 
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => 
    state.cart.items.find(item => item.id === id)
  );
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    dispatch(addToCart({
      id,
      name,
      image,
      price,
      description,
      quantity: 1
    }));
  };

  const handleIncrement = () => {
    if (currentQuantity === 0) {
      handleAddToCart();
    } else {
      dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
    }
  };

  const handleDecrement = () => {
    if (currentQuantity === 1) {
      dispatch(removeFromCart(id));
    } else if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  if (currentQuantity === 0) {
    return (
      <button
        className={`cursor-pointer border border-red-700 rounded-lg bg-white text-red-700 font-semibold text-lg px-4 py-2 transition-colors duration-200 hover:bg-red-50 ${className}`}
        onClick={handleAddToCart}
      >
        ADD <span className="font-bold text-xl">+</span>
      </button>
    );
  }

  return (
    <div className={`flex items-center justify-between border border-red-700 rounded-lg bg-white text-red-700 font-semibold text-lg px-2 py-2 ${className}`}>
      <button
        className="px-3 text-xl font-bold focus:outline-none cursor-pointer"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="px-2 select-none">{currentQuantity}</span>
      <button
        className="px-3 text-xl font-bold focus:outline-none cursor-pointer"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default AddToCartBtn; 
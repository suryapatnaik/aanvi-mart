import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { updateQuantity, removeFromCart, addToCart } from "../../store/cartSlice";
import { bestSellerData } from "../../utils/mockData";
import { generateDeliverySlots } from "../../utils/common/common.helpers";
import cartIcon from '../../assets/icons/cartRedIcon.svg'
interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  
  // Add state for delivery slots
  const [deliverySlots, setDeliverySlots] = useState<Array<{ date: string; label: string; slots: string[] }>>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  
  let items: any[] = [];
  let total = 0;
  let cartIds: string[] = [];
  let suggestions: any[] = [];

  try {
    items = useSelector((state: RootState) => state.cart.items);
    total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartIds = items.map(item => item.id);
    suggestions = bestSellerData.filter(item => !cartIds.includes(item.name)).slice(0, 2);
  } catch (error) {
    console.error('Error accessing cart state in CartModal:', error);
    // Provide fallback values
    items = [];
    total = 0;
    cartIds = [];
    suggestions = [];
  }

  // Generate delivery slots when component mounts
  useEffect(() => {
    const slots = generateDeliverySlots();
    setDeliverySlots(slots);
    if (slots.length > 0) {
      setSelectedDate(slots[0].date);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" onClick={onClose}></div>
      {/* Modal */}
      <div className="relative w-full max-w-[450px] h-full bg-white shadow-lg animate-slideInRight overflow-y-auto z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img src={cartIcon} alt="logo" className="w-6 h-6" />
            <span className="text-lg font-semibold">Your cart</span>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {/* Cart Items */}
        <div className="p-4 border-b border-gray-100">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-4">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                  <div className="text-sm font-semibold">₹ {item.price}</div>
                </div>
                <div className="flex items-center border border-gray-200 rounded px-2 py-1 gap-2">
                  <button className="text-lg" onClick={() => {
                    try {
                      if (item.quantity === 1) {
                        dispatch(removeFromCart(item.id));
                      } else {
                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                      }
                    } catch (error) {
                      console.error('Error updating cart:', error);
                    }
                  }}>-</button>
                  <span>{item.quantity}</span>
                  <button className="text-lg" onClick={() => {
                    try {
                      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
                    } catch (error) {
                      console.error('Error updating cart:', error);
                    }
                  }}>+</button>
                </div>
                <button className="ml-2 text-xs text-red-500 hover:underline" onClick={() => {
                  try {
                    dispatch(removeFromCart(item.id));
                  } catch (error) {
                    console.error('Error removing from cart:', error);
                  }
                }}>Remove</button>
              </div>
            ))
          )}
        </div>
        {/* Before you checkout (dynamic) */}
        <div className="p-4 border-b border-gray-100">
          <div className="font-semibold mb-2 text-sm">Before you checkout</div>
          {suggestions.length === 0 ? (
            <div className="text-gray-400 text-xs">No more suggestions!</div>
          ) : (
            suggestions.map((item) => (
              <div key={item.name} className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                  <div className="text-sm font-semibold">₹ {item.price}</div>
                </div>
                <button
                  className="border border-gray-200 rounded px-3 py-1 text-[#920000] font-semibold"
                  onClick={() => {
                    try {
                      dispatch(addToCart({ id: item.name, name: item.name, image: item.image, price: item.price, description: item.description, quantity: 1 }));
                    } catch (error) {
                      console.error('Error adding to cart:', error);
                    }
                  }}
                >
                  ADD +
                </button>
              </div>
            ))
          )}
        </div>
        {/* Delivery Instructions */}
        <div className="p-4 border-b border-gray-100">
          <div className="font-semibold mb-2 text-sm">Delivery Instructions</div>
          <textarea
            className="w-full border bg-gray-200 border-gray-100 rounded p-2 text-sm focus:outline-blue-300"
            placeholder="Start Typing ..."
            rows={3.5}
          />
        </div>
        {/* Delivery Slot */}
        <div className="p-4 border-b border-gray-100">
          <div className="font-semibold mb-2 text-sm">Select a delivery slot</div>
          <div className="text-xs text-gray-600 mb-3">
            Slots are available from 8 AM to 8 PM with a 2-hour advance booking requirement
          </div>
          
          {/* Date Selection */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
            {deliverySlots.map((dateSlot) => (
              <button
                key={dateSlot.date}
                onClick={() => setSelectedDate(dateSlot.date)}
                className={`whitespace-nowrap rounded px-3 py-1 text-xs transition-colors ${
                  selectedDate === dateSlot.date
                    ? 'bg-[#920000] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dateSlot.label}
              </button>
            ))}
          </div>
          
          {/* Time Slots */}
          {selectedDate && (
            <div className="grid grid-cols-2 gap-2">
              {deliverySlots
                .find(dateSlot => dateSlot.date === selectedDate)
                ?.slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`border rounded px-2 py-1 text-xs transition-colors ${
                      selectedSlot === slot
                        ? 'border-[#920000] bg-[#920000] text-white'
                        : 'border-gray-200 hover:bg-[#920000] hover:text-white hover:border-[#920000]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
            </div>
          )}
          
          {/* Selected Slot Display */}
          {selectedSlot && (
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm">
              <span className="text-green-800 font-medium">Selected: </span>
              <span className="text-green-700">
                {deliverySlots.find(dateSlot => dateSlot.date === selectedDate)?.label} - {selectedSlot}
              </span>
            </div>
          )}
        </div>
        {/* Coupons */}
        <div className="p-4 border-b border-gray-100">
          <div className="font-semibold mb-2 text-sm">View All Coupons</div>
          <button className="w-full border border-gray-200 rounded bg-green-50 text-green-700 py-2 text-xs">See more coupons</button>
        </div>
        {/* Address Selection */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm">Select Delivery Address</span>
            <button className="bg-yellow-200 text-yellow-900 rounded px-3 py-1 text-xs font-semibold">Select</button>
          </div>
        </div>
        {/* Payment and Order Summary */}
        <div className="p-4 flex flex-col gap-2">
          <div className="flex gap-2">
            <button className="flex-1 border border-gray-200 bg-gray-200 rounded px-2 py-2 text-xs">PAY VIA <br />COD</button>
            <div className="flex-1 flex flex-col items-end">
              <div className="font-bold text-lg">₹{total.toFixed(2)}</div>
              <div className="text-xs text-gray-500">TOTAL</div>
            </div>
          </div>
          <button 
            className="w-full bg-[#920000] text-white rounded py-3 font-semibold mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed" 
            disabled={items.length === 0 || !selectedSlot}
          >
            Place Order &rarr;
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
};

export default CartModal; 
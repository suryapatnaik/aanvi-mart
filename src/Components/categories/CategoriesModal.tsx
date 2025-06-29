import React, { ReactNode, useEffect } from 'react';
import CustomInput from '../CustomInput/CustomInput';

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const CategoriesModal: React.FC<CategoriesModalProps> = ({ isOpen, onClose, children, className }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className={`relative bg-white w-screen h-screen flex flex-col pt-2 ${className || ''}`}> 
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100">
          <CustomInput
            placeholder="Search for Chicken, Mutton and More.."
            height="48px"
            width="100%"
          />
        </div>
        {/* Categories Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
        {/* Bottom Bar with Back Button */}
        <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 flex justify-end">
          <button
            className="bg-[#920000] text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
            onClick={onClose}
            aria-label="Back"
          >
            Back
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
};

export default CategoriesModal; 
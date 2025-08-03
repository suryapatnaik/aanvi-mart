import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../store/wishlistSlice';
import type { RootState } from '../store';
import { Product } from '../utils/mockData';

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ 
  product, 
  className = '',
  size = 'md'
}) => {
  const dispatch = useDispatch();
  const isInWishlist = useSelector((state: RootState) => 
    state.wishlist.items.some(item => item.id === product.id)
  );

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      description: product.description,
      category: product.category,
      subCategory: product.subCategory,
      weight: product.weight,
      serves: product.serves,
      inStock: product.inStock,
    }));
  };

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <button
      onClick={handleToggleWishlist}
      className={`absolute top-2 right-2 z-10 p-1 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 hover:scale-110 ${className}`}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg
        className={`${sizeClasses[size]} transition-all duration-200 ${
          isInWishlist 
            ? 'text-red-500 fill-current' 
            : 'text-gray-400 hover:text-red-400'
        }`}
        fill={isInWishlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};

export default WishlistButton; 
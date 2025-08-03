import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import { removeFromWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import AddToCartBtn from '../Components/AddToCartBtn';


const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      description: item.description,
      quantity: 1
    }));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8  mt-4">
        <div className="text-center max-w-sm sm:max-w-md lg:max-w-lg w-full">
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">Your Wishlist is Empty</h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 px-2 sm:px-0">Start adding products to your wishlist by clicking the heart icon on any product.</p>
            <button
              onClick={() => navigate('/')}
              className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm sm:text-base lg:text-lg"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-4">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <img
                src="/src/assets/icons/ArrowLeft.svg"
                alt="Back"
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 truncate">My Wishlist</h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-0.5 sm:mt-1">{wishlistItems.length} items in your wishlist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {wishlistItems.map((item) => (
            <WishlistItemCard 
              key={item.id} 
              item={item} 
              onRemove={handleRemoveFromWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Wishlist Item Card Component
const WishlistItemCard: React.FC<{
  item: any;
  onRemove: (productId: string) => void;
  onAddToCart: (item: any) => void;
}> = ({ item, onRemove, onAddToCart }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={handleProductClick}
        />
        {item.discount && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {item.discount}% OFF
          </div>
        )}
        {/* Remove from Wishlist Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 hover:scale-110"
          aria-label="Remove from wishlist"
        >
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
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
        {!item.inStock && (
          <div className="absolute inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
            <span className="text-red-600 font-bold">Out of Stock!!</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 
          className="font-semibold text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-red-600 transition-colors min-h-[2.5rem]"
          onClick={handleProductClick}
        >
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2 min-h-[2.5rem]">{item.description}</p>

        <div className="flex items-center justify-between mb-3 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
            {item.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {item.weight} • {item.serves}
          </div>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="mb-3">
          {item.inStock ? (
            <AddToCartBtn
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              description={item.description}
            />
          ) : (
            <button
              disabled
              className="w-full border border-gray-300 rounded-lg bg-gray-100 text-gray-500 font-semibold text-sm px-4 py-2 cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}
        </div>

        {/* Added Date */}
        <div className="text-xs text-gray-500 border-t border-gray-100 pt-2 mt-auto">
          Added on {new Date(item.addedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Wishlist; 
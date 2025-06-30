import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../utils/mockData';
import AddToCartBtn from '../AddToCartBtn';

interface SearchResultsProps {
  products: Product[];
  searchQuery: string;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ products, searchQuery, onClose }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Search: "{searchQuery}"
          </p>
        </div>
        <div className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try searching with different keywords</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {products.length} result{products.length !== 1 ? 's' : ''} for "{searchQuery}"
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="flex items-center space-x-4">
              {/* Product Image */}
              <div className="relative flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                {product.discount && (
                  <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1 py-0.5 rounded">
                    {product.discount}%
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-600 truncate">
                  {product.description}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                  <span className="text-xs text-gray-500">• {product.weight}</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                {product.inStock && (
                  <AddToCartBtn
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    description={product.description}
                    className="px-3 py-1 text-xs"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults; 
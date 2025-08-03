import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, Product } from '../utils/mockData';
import AddToCartBtn from '../Components/AddToCartBtn';
import WishlistButton from '../Components/WishlistButton';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = useMemo(() => {
    return productId ? getProductById(productId) : null;
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
            <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-3 mt-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <img
                src="/src/assets/icons/ArrowLeft.svg"
                alt="Back"
                className="w-5 h-5"
              />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold text-gray-900 truncate">Product Details</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">
            {/* Product Image */}
            <div className="lg:col-span-1 relative bg-gray-100">
              <div className="aspect-square lg:aspect-square max-w-sm mx-auto lg:max-w-none relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {product.discount && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    {product.discount}% OFF
                  </div>
                )}
                {/* Wishlist Button */}
                <WishlistButton 
                  product={product} 
                  size="lg"
                  className="top-3 right-3"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-red-500 font-bold text-lg">Out of Stock!!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-2 p-4 lg:p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h1>
                
                <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
                  {product.description}
                </p>

                {/* Price Section */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  {product.discount && (
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-semibold text-sm">
                        Save ₹{product.originalPrice ? product.originalPrice - product.price : 0}
                      </span>
                      <span className="text-xs text-gray-500">({product.discount}% discount)</span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Weight</span>
                    <span className="font-semibold text-sm">{product.weight}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Serves</span>
                    <span className="font-semibold text-sm">{product.serves}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Category</span>
                    <span className="font-semibold text-sm capitalize">{product.category.replace('-', ' ')}</span>
                  </div>
                  {product.subCategory && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Type</span>
                      <span className="font-semibold text-sm capitalize">{product.subCategory.replace('-', ' ')}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 text-sm">Availability</span>
                    <span className={`font-semibold text-sm flex items-center space-x-1 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              {product.inStock && (
                <div className="mb-4">
                  <AddToCartBtn
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    description={product.description}
                    className="w-full py-3 text-base font-semibold rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  />
                </div>
              )}

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Why Choose This Product?
                </h3>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    Fresh and high-quality meat
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    Hygienically processed
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    Delivered to your doorstep
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    Best price guarantee
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 
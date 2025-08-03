import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductsByCategory, Product } from '../utils/mockData';
import { getCategoryByValue } from '../utils/categories/categories.helpers';
import AddToCartBtn from '../Components/AddToCartBtn';
import WishlistButton from '../Components/WishlistButton';

const CategoryProducts: React.FC = () => {
  const { categoryValue } = useParams<{ categoryValue: string }>();
  const navigate = useNavigate();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  const category = useMemo(() => {
    return categoryValue ? getCategoryByValue(categoryValue) : null;
  }, [categoryValue]);

  const products = useMemo(() => {
    return categoryValue ? getProductsByCategory(categoryValue) : [];
  }, [categoryValue]);

  const subCategories = useMemo(() => {
    const subCats = [...new Set(products.map(product => product.subCategory).filter(Boolean))];
    return subCats;
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedSubCategory === 'all') {
      return products;
    }
    return products.filter(product => product.subCategory === selectedSubCategory);
  }, [products, selectedSubCategory]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <img
                src="/src/assets/icons/ArrowLeft.svg"
                alt="Back"
                className="w-6 h-6"
              />
            </button>
            <img
              src={category.imageSrc}
              alt={category.label}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{category.label}</h1>
              <p className="text-gray-600 mt-1">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Category Filter */}
      {subCategories.length > 0 && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSubCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedSubCategory === 'all'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                All ({products.length})
              </button>
              {subCategories.map((subCat) => {
                if (!subCat) return null;
                const count = products.filter(p => p.subCategory === subCat).length;
                return (
                  <button
                    key={subCat}
                    onClick={() => setSelectedSubCategory(subCat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedSubCategory === subCat
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {subCat.charAt(0).toUpperCase() + subCat.slice(1).replace('-', ' ')} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different sub-category or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
        {/* Wishlist Button */}
        <WishlistButton 
          product={product} 
          size="md"
          className="top-2 right-2"
        />
        {!product.inStock && (
          <div className="absolute inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
            <span className="text-red-600 font-bold">Out of Stock!!</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {product.weight} • {product.serves}
          </div>
        </div>

        {product.inStock && (
          <div onClick={(e) => e.stopPropagation()}>
            <AddToCartBtn
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts; 
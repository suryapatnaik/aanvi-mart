import React, { ReactNode, useEffect, useState, useMemo } from 'react';
import CustomInput from '../CustomInput/CustomInput';
import SearchResults from '../SearchResults';
import { categories } from '../../utils/categories/categories.helpers';
import { searchProducts } from '../../utils/mockData';

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const CategoriesModal: React.FC<CategoriesModalProps> = ({ isOpen, onClose, children, className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

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

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    
    const searchTerm = searchQuery.toLowerCase().trim();
    
    return categories.filter(category => 
      category.label.toLowerCase().includes(searchTerm) ||
      category.description.toLowerCase().includes(searchTerm) ||
      category.value.toLowerCase().includes(searchTerm)
    );
  }, [searchQuery]);

  // Search products for search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchProducts(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearchResults(true);
  };

  const handleCloseSearchResults = () => {
    setShowSearchResults(false);
    setSearchQuery('');
  };

  if (!isOpen) return null;

  // Clone children and pass onClose function as prop
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClose } as any);
    }
    return child;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className={`relative bg-white w-screen h-screen flex flex-col pt-2 ${className || ''}`}> 
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100">
          <CustomInput
            placeholder="Search for Chicken, Mutton and More.."
            height="48px"
            width="100%"
            value={searchQuery}
            onSearch={handleSearch}
            showSearchResults={showSearchResults}
            searchResults={
              showSearchResults && searchResults.length > 0 ? (
                <SearchResults
                  products={searchResults}
                  searchQuery={searchQuery}
                  onClose={() => {
                    handleCloseSearchResults();
                    onClose();
                  }}
                />
              ) : undefined
            }
          />
        </div>
        {/* Categories Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {searchQuery.trim() ? (
            // Show filtered categories when searching
            <div className="space-y-6">
              <div className="text-lg font-semibold text-gray-900">
                Categories matching "{searchQuery}"
              </div>
              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-2 md:gap-x-8">
                {filteredCategories.map((cat) => (
                  <div 
                    key={cat.value} 
                    className="flex flex-col items-start cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => {
                      // Navigate to category page
                      window.location.href = `/category/${cat.value}`;
                      onClose();
                    }}
                  >
                    <img
                      src={cat.imageSrc}
                      alt={cat.label}
                      className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-xl object-cover mb-2 shadow-sm"
                    />
                    <span className="text-xs md:text-sm font-normal text-center mt- text-nowrap">
                      {cat.label}
                    </span>
                  </div>
                ))}
              </div>
              {filteredCategories.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                  <p className="text-gray-600">Try searching with different keywords</p>
                </div>
              )}
            </div>
          ) : (
            // Show original children (Categories component) when not searching
            childrenWithProps
          )}
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
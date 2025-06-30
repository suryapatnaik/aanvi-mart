import React, { useState, useRef, useEffect } from "react";
import SearchIcon from '../../assets/icons/SearchIcon.svg';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  height?: string;
  width?: string;
  onSearch?: (query: string) => void;
  showSearchResults?: boolean;
  searchResults?: React.ReactNode;
  value?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder = "",
  height = "40px",
  width = "100%",
  onSearch,
  showSearchResults = false,
  searchResults,
  value: controlledValue,
  style,
  ...rest
}) => {
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use controlled value if provided, otherwise use internal state
  const searchQuery = controlledValue !== undefined ? controlledValue : internalSearchQuery;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Update internal state only if not controlled
    if (controlledValue === undefined) {
      setInternalSearchQuery(value);
    }
    
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height,
        width,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          color: "#888",
          pointerEvents: "none",
        }}
      >
        <img src={SearchIcon} className="h-5 w-5" alt="searchIcon"></img>
      </span>
      <input
        ref={inputRef}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        style={{
            height: '100%',
            width: '100%',
            paddingLeft: '40px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            background:'white',
            outline: 'none',
            ...style,
          }}
        {...rest}
      />
      
      {/* Search Results Dropdown */}
      {showSearchResults && isFocused && searchResults && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50">
          {searchResults}
        </div>
      )}
    </div>
  );
};

export default CustomInput;

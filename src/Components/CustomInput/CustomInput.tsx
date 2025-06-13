import React from "react";
import SearchIcon from '../../assets/icons/Searchicon.svg';
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  height?: string;
  width?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder = "",
  height = "40px",
  width = "100%",
  style,
  ...rest
}) => {
  return (
    <div
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
    </div>
  );
};

export default CustomInput;

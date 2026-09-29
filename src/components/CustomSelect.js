import React, { useState, useRef, useEffect } from "react";

export default function CustomSelect({ options, placeholder, onChange }) {
  const [selected, setSelected] = useState(placeholder);
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef(null);

  const handleSelect = (value, label) => {
    setSelected(label);
    setIsOpen(false);
    if (onChange) onChange(value); // return selected value
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div style={isOpen ?{zIndex:9999999999999999999999999999}:{}} className={`custom-select ${isOpen ? "active skpe" : ""}`} ref={selectRef}>
      <div className="selected" onClick={() => setIsOpen(!isOpen)}>
        {selected}
      </div>

      <div style={{zIndex: '999999999999999999', width:'fit-content'}}>
        <ul style={{zIndex:9999999999999999999}} className="options"  >
        {options.map((opt) => (
          <li
            key={opt.value}
            onClick={() => handleSelect(opt.value, opt.label)}
          >
            {opt.label}
          </li>
        ))}
      </ul>
      </div>
    </div> 
  );
}

import React, { useState, useRef, useEffect } from "react";
import { MdFilter, MdFilterList } from "react-icons/md";

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
    <div style={{width:'200px'}} className={`custom-select ${isOpen ? "active" : ""}`} ref={selectRef}>
      <div className="selected" onClick={() => setIsOpen(!isOpen)}>
        <MdFilterList size={30} />
        {selected}
      </div>

      <ul className="options">
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
  );
}

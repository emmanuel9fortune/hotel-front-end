import React, { useState, useRef, useEffect } from "react";
import { MdLogout, MdPerson } from "react-icons/md";

export default function CustomDetSelect({ options, placeholder, onChange }) {
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
    <div style={{width:'100%', border:'none', color:'#000'}} className={`custom-select ${isOpen ? "active" : ""}`} ref={selectRef}>
      <div style={{display:'flex', alignItems:'center', border:'none', width:'100%'}} className="selected" onClick={() => setIsOpen(!isOpen)}>
        
        <p style={{color:'#000'}}>
            {selected}
        </p>
      </div>

      <ul className="options" style={{color:'#000'}}>
        {options.map((opt) => (
          <li
            key={opt.value}
            onClick={() => handleSelect(opt.value, opt.label)}
            style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}
          >
            <p style={{color:'#000'}}>
                {opt.label}
            </p>
            {
                opt?.value === 'out'&&
                <MdLogout/>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

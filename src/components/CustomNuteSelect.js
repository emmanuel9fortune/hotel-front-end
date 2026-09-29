import React, { useState, useRef, useEffect } from "react";
import { MdLogout, MdPerson } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectinfo } from "../features/infoSlice";

export default function CustomNuteSelect({ options, placeholder, onChange }) {
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const info = useSelector(selectinfo)

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

  const dim = window.innerWidth <= 450

  return (
    <div style={dim ?{width:'150px'}:{width:'fit-content'}} className={`custom-select ${isOpen ? "active" : ""}`} ref={selectRef}>
      <div style={{display:'flex', alignItems:'center', border:'none'}} className="selected" onClick={() => setIsOpen(!isOpen)}>
        
        <div
            style={{display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#d6d6d6ff', height:'40px', width:'40px', borderRadius:'50%', flexShrink:0}}
        >
            <MdPerson size={25} color="grey" />
        </div>
        {
            !dim ?
            <div style={{padding:'0 5px'}}>
              <p>
                  {selected || info?.info?.first_name + " " + info?.info?.last_name}
              </p>
              
              {
                info?.info?.first_name ?
                <p style={{width:'100%', textAlign:'right', fontWeight:600}}>
                  ${Number(info?.info?.balance).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                </p>
                : null
              }
            </div>
            : 
            <div style={{padding:'0 5px'}}>
              <p>
                {selected?.slice(0, 9)}...
              </p>
              
              {
                info?.info?.first_name ?
                <p style={{width:'100%', textAlign:'right', fontWeight:600}}>
                  ${info?.info?.balance}.00
                </p>
                : null
              }
            </div>
        }
        
      </div>

      <ul className="options">
        {options.map((opt) => (
          <li
            key={opt.value}
            onClick={() => handleSelect(opt.value, opt.label)}
            style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}
          >
            <p>
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

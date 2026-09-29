import React, { useState, useRef } from 'react';
import '../styles/otpinput.css';

const OtpInput = ({ length = 6, onComplete, setotp }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    // Handle paste (multiple digits)
    if (value.length > 1) {
      const pasted = value.slice(0, length).split("");
      for (let i = 0; i < length; i++) {
        newOtp[i] = pasted[i] || "";
      }
      setOtp(newOtp);
      inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    if (newOtp.every(v => v !== "")) {
      const code = newOtp.join("");
      onComplete?.(code);
      setotp?.(code);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <div className="otp-container">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={el => (inputRefs.current[index] = el)}
          type="password"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={length}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          className="otp-input"
        />
      ))}
    </div>
  );
};

export default OtpInput;

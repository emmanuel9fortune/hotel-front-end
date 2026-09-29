import { useEffect, useState } from "react";

export default function Notification({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay random time after page load (1–5s)
    const delay = Math.random() * 4000 + 1000;
    const timer = setTimeout(() => {
      setVisible(true);

      // Auto-hide after 3 seconds
      setTimeout(() => setVisible(false), 3000);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "60px",
        right: "20px",
        background: "#333",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 9999,
        animation: "slideIn 0.3s ease-out",
      }}
    >
      {message}
    </div>
  );
}

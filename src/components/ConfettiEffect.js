import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function ConfettiEffect() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // stop confetti after 5 seconds
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return show ? 
  <Confetti
    numberOfPieces={200}
    gravity={0.2}
    wind={0.01}
    recycle={false}
  /> : null;
}

import React, { useEffect, useState } from 'react'

function CookieConsent() {

    
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  return (
    <div>
        
      {
        visible && (
      <div className="cookie-banner">
        <p>
          By using this website you agree to our use of optional first-party and thrid-party cookies to enhance functionality, server you with relevant ads, personalize your experience and perform analytics, including on third-party websites. To find out more about cookies visit our <a href="/#/privacy-policies" target='blank'>Privacy Policy</a>.
        </p>
        <button onClick={handleAccept}>Accept</button>
      </div>
        )
      }
    </div>
  )
}

export default CookieConsent
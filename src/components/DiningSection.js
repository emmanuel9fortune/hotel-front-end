import React from "react";
import "../styles/DiningSection.css";

const DiningSection = () => {
  return (
    <section className="dining-section">
      <div className="dining-container">

        {/* Left Content */}
        <div className="dining-content" data-aos ='fade-left'>

          <span className="dining-eyebrow">
            BON APPÉTIT
          </span>

          <h2>
            A Culinary
            <br />
            <span>Journey</span>
            <br />
            Fit for Royalty
          </h2>

          <div className="dining-divider"></div>

          <p className="dining-description">
            Discover an exceptional dining experience where refined
            international cuisine meets the rich flavors of local
            tradition. Every dish is thoughtfully prepared to create
            memorable moments around the table.
          </p>

          <p className="dining-description secondary">
            From elegant dining and handcrafted cocktails to poolside
            refreshments and private in-suite dining, every experience
            is designed with taste, comfort, and sophistication in mind.
          </p>

          <a href="/menu" className="dining-button">
            <span>Explore Menu</span>
            <span className="dining-arrow">↗</span>
          </a>

        </div>

        {/* Right Image */}
        <div className="dining-image-area">

          <div className="dining-image-main" data-aos ='fade-up'>
            <img
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=90"
              alt="Luxury hotel restaurant"
            />
          </div>

          <div className="dining-image-small" data-aos ='fade-down'>
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85"
              alt="Fine dining experience"
            />
          </div>

          <div className="dining-number">
            05
          </div>

        </div>

      </div>
    </section>
  );
};

export default DiningSection;
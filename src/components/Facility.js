import React from "react";
import "../styles/FacilitiesSection.css";

const facilities = [
  {
    number: "01",
    title: "The Grand Lobby",
    subtitle: "A Grand Welcome Awaits",
    description:
      "Step into an atmosphere of refined elegance, where warm interiors, attentive service, and timeless details create the perfect first impression.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "02",
    title: "Luxury Lounge",
    subtitle: "Relax in Sophisticated Comfort",
    description:
      "Unwind in beautifully designed surroundings made for intimate conversations, quiet moments, afternoon refreshments, and effortless relaxation.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "03",
    title: "Events & Meetings",
    subtitle: "Where Moments Become Memories",
    description:
      "From executive meetings to unforgettable celebrations, our versatile spaces combine elegant design with everything you need for a remarkable occasion.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "04",
    title: "Fitness Centre",
    subtitle: "Stay Active. Stay Energized.",
    description:
      "Maintain your routine in a sophisticated fitness environment equipped for guests who value wellness, movement, and balance.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "05",
    title: "Spa & Wellness",
    subtitle: "Your Private Escape",
    description:
      "Discover a tranquil retreat designed to restore the body and refresh the mind through luxurious treatments and moments of complete relaxation.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "06",
    title: "Swimming Pool",
    subtitle: "A Tranquil Escape",
    description:
      "Take a refreshing dip or simply relax beside the water in an atmosphere created for peaceful afternoons and effortless leisure.",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1800&q=85",
  },
];

const FacilitiesSection = () => {
  return (
    <section className="facilities-section">
      <div className="facilities-container">

        {/* Header */}
        <div className="facilities-header" data-aos ='fade-up'>
          <div className="facilities-header-left">
            <span className="facilities-eyebrow">
              HOTEL EXPERIENCE
            </span>

            <h2>
              Every Comfort.
              <br />
              <span>Every Indulgence.</span>
            </h2>
          </div>

          <div className="facilities-header-right">
            <p>
              Discover thoughtfully designed spaces created to make
              every moment of your stay exceptional.
            </p>
          </div>
        </div>

        {/* Facilities */}
        <div className="facilities-list">
          {facilities.map((facility, index) => (
            <article
              className={`facility-item ${
                index % 2 !== 0 ? "facility-reverse" : ""
              }`}
              key={facility.number}
            >
              {/* Image */}
              <div className="facility-image-wrapper" data-aos ='fade-left'>
                <div className="facility-number">
                  {facility.number}
                </div>

                <img
                  src={facility.image}
                  alt={facility.title}
                  className="facility-image"
                />

                <div className="facility-image-overlay" />
              </div>

              {/* Content */}
              <div className="facility-content" data-aos ='fade-right'>
                <span className="facility-small-title">
                  {facility.title}
                </span>

                <h3>{facility.subtitle}</h3>

                <div className="facility-line" />

                <p>{facility.description}</p>

                <button className="facility-link">
                  Discover More
                  <span>↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FacilitiesSection;
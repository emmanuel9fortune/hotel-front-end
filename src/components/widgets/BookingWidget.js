import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Users,
  ChevronDown,
  Check,
  Minus,
  Plus,
} from "lucide-react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "../../styles/bookingWidget.css";

const BookingWidget = () => {
  /* =========================================================
     LOCATION
  ========================================================= */

  const [location, setLocation] = useState("Our Hotel");
  const [locationOpen, setLocationOpen] = useState(false);

  const locations = [
    {
      name: "Our Hotel",
      description: "Main Hotel",
    },
    {
      name: "Lagos",
      description: "Lagos, Nigeria",
    },
    {
      name: "Abuja",
      description: "Abuja, Nigeria",
    },
    {
      name: "Warri",
      description: "Delta State, Nigeria",
    },
  ];

  /* =========================================================
     GUESTS
  ========================================================= */

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [guestOpen, setGuestOpen] = useState(false);

  /* =========================================================
     DATES
  ========================================================= */

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  /* =========================================================
     DROPDOWN REFS
  ========================================================= */

  const locationRef = useRef(null);
  const guestRef = useRef(null);

  /* =========================================================
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target)
      ) {
        setLocationOpen(false);
      }

      if (
        guestRef.current &&
        !guestRef.current.contains(event.target)
      ) {
        setGuestOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =========================================================
     GUEST DISPLAY
  ========================================================= */

  const guestText = () => {
    const adultText = `${adults} Adult${adults !== 1 ? "s" : ""}`;

    if (children === 0) {
      return adultText;
    }

    const childText = `${children} Child${
      children !== 1 ? "ren" : ""
    }`;

    return `${adultText} · ${childText}`;
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = () => {
    console.log({
      location,
      checkIn,
      checkOut,
      adults,
      children,
    });

    // Connect this to your booking/search route later.
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="booking-widget">

        {/* =====================================================
            LOCATION
        ===================================================== */}

        <div
          className="booking-field booking-location"
          ref={locationRef}
        >
          <div className="booking-icon">
            <MapPin size={18} strokeWidth={1.4} />
          </div>

          <div className="booking-content">
            <label>LOCATION</label>

            <button
              type="button"
              className="custom-dropdown-trigger"
              onClick={() => {
                setLocationOpen(!locationOpen);
                setGuestOpen(false);
              }}
            >
              <span className="booking-main-value">
                {location}
              </span>

              <ChevronDown
                size={15}
                className={
                  locationOpen
                    ? "dropdown-arrow open"
                    : "dropdown-arrow"
                }
              />
            </button>

            {locationOpen && (
              <div className="hotel-dropdown location-dropdown">
                <div className="dropdown-heading">
                  <span>Choose location</span>
                </div>

                {locations.map((item) => (
                  <button
                    type="button"
                    key={item.name}
                    className={
                      location === item.name
                        ? "location-option selected"
                        : "location-option"
                    }
                    onClick={() => {
                      setLocation(item.name);
                      setLocationOpen(false);
                    }}
                  >
                    <div className="location-option-content">
                      <span className="location-name">
                        {item.name}
                      </span>

                      <span className="location-description">
                        {item.description}
                      </span>
                    </div>

                    {location === item.name && (
                      <Check
                        size={16}
                        strokeWidth={1.8}
                        className="location-check"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            CHECK IN
        ===================================================== */}

        <div className="booking-date-field">
          <div className="booking-date-icon">
            <span />
          </div>

          <DatePicker
            value={checkIn}
            onChange={(newValue) => {
              setCheckIn(newValue);

              // Prevent checkout being before check-in
              if (
                checkOut &&
                newValue &&
                checkOut < newValue
              ) {
                setCheckOut(null);
              }
            }}
            minDate={new Date()}
            format="dd MMM yyyy"
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "standard",
                label: "CHECK IN",
                placeholder: "Select date",
                sx: {
                  "& .MuiInputBase-input": {
                    color: "#fff",
                  },

                  "& .MuiDateField-root": {
                    color: "#fff",
                  },

                  "& .MuiPickersInputBase-sections": {
                    color: "#fff",
                  },

                  "& .MuiPickersInputBase-sectionContent": {
                    color: "#fff",
                  },
                }
              },
            }}
          />
        </div>

        {/* =====================================================
            CHECK OUT
        ===================================================== */}

        <div className="booking-date-field">
          <div className="booking-date-icon">
            <span />
          </div>

          <DatePicker
            value={checkOut}
            onChange={(newValue) => setCheckOut(newValue)}
            minDate={checkIn || new Date()}
            format="dd MMM yyyy"
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "standard",
                label: "CHECK OUT",
                placeholder: "Select date",
                sx: {
                  "& .MuiInputBase-input": {
                    color: "#fff",
                  },

                  "& .MuiDateField-root": {
                    color: "#fff",
                  },

                  "& .MuiPickersInputBase-sections": {
                    color: "#fff",
                  },

                  "& .MuiPickersInputBase-sectionContent": {
                    color: "#fff",
                  },
                }
              },
            }}
          />
        </div>

        {/* =====================================================
            GUESTS
        ===================================================== */}

        <div
          className="booking-field booking-guests"
          ref={guestRef}
        >
          <div className="booking-icon">
            <Users size={18} strokeWidth={1.4} />
          </div>

          <div className="booking-content">
            <label>GUESTS</label>

            <button
              type="button"
              className="custom-dropdown-trigger"
              onClick={() => {
                setGuestOpen(!guestOpen);
                setLocationOpen(false);
              }}
            >
              <span className="booking-main-value">
                {guestText()}
              </span>

              <ChevronDown
                size={15}
                className={
                  guestOpen
                    ? "dropdown-arrow open"
                    : "dropdown-arrow"
                }
              />
            </button>

            {guestOpen && (
              <div className="hotel-dropdown guest-dropdown">

                <div className="dropdown-heading">
                  <span>Guests</span>
                  <small>Select your party</small>
                </div>

                {/* ADULTS */}

                <div className="guest-option">
                  <div className="guest-option-info">
                    <strong>Adults</strong>
                    <span>Ages 13+</span>
                  </div>

                  <div className="guest-counter">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() =>
                        setAdults(
                          Math.max(1, adults - 1)
                        )
                      }
                    >
                      <Minus size={13} />
                    </button>

                    <span>{adults}</span>

                    <button
                      type="button"
                      onClick={() =>
                        setAdults(adults + 1)
                      }
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>

                {/* CHILDREN */}

                <div className="guest-option">
                  <div className="guest-option-info">
                    <strong>Children</strong>
                    <span>Ages 0–12</span>
                  </div>

                  <div className="guest-counter">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() =>
                        setChildren(
                          Math.max(0, children - 1)
                        )
                      }
                    >
                      <Minus size={13} />
                    </button>

                    <span>{children}</span>

                    <button
                      type="button"
                      onClick={() =>
                        setChildren(children + 1)
                      }
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="guest-done"
                  onClick={() => setGuestOpen(false)}
                >
                  DONE
                </button>
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <button
          type="button"
          className="booking-search"
          onClick={handleSearch}
        >
          <span>CHECK AVAILABILITY</span>
          <span className="search-arrow">→</span>
        </button>
      </div>
    </LocalizationProvider>
  );
};

export default BookingWidget;
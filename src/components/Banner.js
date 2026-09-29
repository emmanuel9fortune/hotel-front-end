import React from 'react'
import '../styles/banner.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FaDna } from 'react-icons/fa6'
import BookingWidget from './widgets/BookingWidget'

function Banner() {
  
  const { t } = useTranslation()

  return (
    <div className='banner_container'>
      <video
        autoPlay
        muted
        playsInline
        loop
        className='banner_container_video'
      >
        <source src='/assets/banner.mp4' type='video/mp4' />
      </video>

      <div className="banner_overlay"></div>

      <div className='banner_container_text' >
        <div className='banner_text_body'>
          <p>Welcome to worldCrest Luxury Hotel</p> 

          <h1>Exceptional rooms. Refined comfort. Unforgettable stays.</h1>
          
          <BookingWidget/>
        </div>
      </div>
    </div>
  )
}

export default Banner
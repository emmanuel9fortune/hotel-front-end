import React, { useEffect, useState } from 'react'
import '../styles/rate.css'
import CustomSelect from './CustomSelect'
import { useTranslation } from 'react-i18next'
import { FaArrowRightLong } from 'react-icons/fa6'
import DiningSection from './DiningSection'

function Rate() {

    const [rate, setrate] = useState('')
    const { t } = useTranslation()

    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            img: '/assets/out1.jpg',
            type: t("home.feat.text3")
        },
        {
            img: '/assets/rm1.jpg',
            type: t("home.feat.text8")
        },
        {
            img: '/assets/rm2.jpg',
            type: t("home.feat.text4")
        },
        {
            img: '/assets/rm3.jpg',
            type: t("home.feat.text5")
        },
        {
            img: '/assets/rm4.jpg',
            type: t("home.feat.text6")
        },
        {
            img: '/assets/rm5.jpg',
            type: t("home.feat.text7")
        },
    ];
    // Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
        goToNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

  const goToNext = () => {
    // Move by 1 slide but still show 2 items
    setCurrentIndex((prev) =>
      prev >= slides.length - 2 ? 0 : prev + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 2 : prev - 1
    );
  };

  const mobile = window.innerWidth <= 830

  return (
    <div className='rate_container' >
        
        <DiningSection/>

        <div className='featured_slider' >
            <p>As Of {
                    new Date(
                        new Date().setMonth(new Date().getMonth() - 2)
                    ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })
                }
            </p>
            <h1>{t("home.feat.text2")}</h1>

            <div className='slider'>
                <div className='feature_slider_imgs' style={mobile ? { transform: `translateX(-${currentIndex * 100}%)` } :{ transform: `translateX(-${currentIndex * 60}%)` }} >
                    {slides.map((slide, index) => (
                        <div key={index} className='feature_slider_img_'>
                            <img src={slide.img} alt='' />
                            <h3>{slide.type}</h3>
                        </div>
                    ))}
                    
                </div>
                <button className="prev" onClick={goToPrevious}>❮</button>
                <button className="next" onClick={goToNext}>❯</button>
            </div>
        </div>
    </div>
  )
}

export default Rate
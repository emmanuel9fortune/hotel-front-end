import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaDna, FaMinimize } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/nav-bar.css'
import { useTranslation } from 'react-i18next'

function Head({stick, view}) {

    const menuClick =()=>{
        const menu_icon = document.querySelector(".menu-icon")
        menu_icon.classList.toggle("open");
        const menu_dropdown = document.querySelector(".menu_dropDown")
        menu_dropdown.classList.toggle("dropDown");

        if (menu_dropdown.classList.contains("dropDown")) {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        } else {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        }
    }

    const navigate = useNavigate()

    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);
    const changeHeight = 100; // scroll threshold

    useEffect(() => {
        const handleScroll = () => {
        const currentScroll = window.pageYOffset;

        // Change background after certain scroll height
        setScrolled(currentScroll > changeHeight);

        // Hide on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > changeHeight) {
            setHidden(true); // scrolling down
        } else {
            setHidden(false); // scrolling up
        }

        setLastScroll(currentScroll);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScroll]);

    const { t } = useTranslation()

    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lang", lng);
    };


  return (
    <div  className={`head_container 
        ${scrolled ? "scrolled" : ""} 
        ${hidden ? "hidden" : ""}
        ${stick ? "scrolled" : "" }
        ${hidden && stick ? "hidden" : ""}
        `}>
        <div className='head' >
            <Link to={'/'} className='desk_header_logo' >
                <img src='/logo.png' />
            </Link>

            <div className='head_links' >
                <Link className='header_links' to={'/insights'} >
                    <p>Rooms & Suites</p>
                </Link>
                
                <Link className='header_links' to={'/portfolio'} >
                    <p>Facilities</p>
                </Link>
                
                <Link className='header_links' to={'/how-it-works'} >
                    <p>Experiences</p>
                </Link>
                
                <Link className='header_links' to={'/about-us'} >
                    <p>About us</p>
                </Link>

                <Link className='header_links' to={'/contact-us'} >
                    <p>{t("home.header.text6")}</p>
                </Link> 
                

            </div>

            

            <Link to='/sign-up' className='head_logbtn'>
                <p>Book Now</p>
            </Link>

            <div onClick={()=>menuClick()} className="menu-icon">
                <span></span>
                <span></span>
                <span></span>
            </div>

            
            <div className='menu_dropDown' >
                <div onClick={()=> navigate('/insights')} className='dropdown_slide'>
                    <p>Rooms & Suites</p>
                    <FaMinimize /> 
                </div>
                <div onClick={()=> navigate('/portfolio')} className='dropdown_slide'>
                    <p>Facilities</p>
                    <FaMinimize />
                </div>
                <div onClick={()=> navigate('/how-it-works')} className='dropdown_slide'>
                    <p>Experiences</p>
                    <FaMinimize />
                </div>
                <div onClick={()=> navigate('/about-us')} className='dropdown_slide'>
                    <p>About US</p>
                    <FaMinimize />
                </div>
                <div onClick={()=> navigate('/contact-us')} className='dropdown_slide'>
                    <p>{t("home.header.text6")}</p>
                    <FaMinimize />
                </div>

                <Link to='/sign-up' className='menu_mobile_logbtn'>
                    <p>Book Now</p>
                </Link>
            </div>

        </div>
    </div>
  )
}

export default Head
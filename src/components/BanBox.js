import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FaBuildingFlag, FaHotel, FaPerson } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function BanBox() {

    
  const [index, setIndex] = useState(0);

  const data =[
    {img: ''},
    {img: ''},
    {img: ''},
    {img: ''},
    {img: ''},
  ] 

  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // trigger fade out
      setTimeout(() => {
        setIndex(prev => (prev + 1) % data.length);
        setFade(true); // trigger fade in
      }, 200); // wait for fade-out before changing
    }, 10000);

    return () => clearInterval(interval);
  }, [data.length]);

  const { t } = useTranslation()

  return (
    <div className='home_body' >
        <div className='home_body_text' >
            <h1>{t("home.banner.banner_txt1")} <span></span> {t("home.banner.banner_txt2")}</h1>

            <div className='home_body_text_icon'></div>

            <div className='home_body_text_box1' >
                <div className='home_body_text_box1_user_images' >
                    <div className='home_body_box1_user1_images' ></div>
                    <div className='home_body_box1_user2_images'></div>
                    <div className='home_body_box1_user3_images'></div>
                </div>

                <div className='home_body_text_box1_writeups' >
                    <h1>{t("home.banner.banner_txt3")}</h1>
                    <p>{t("home.banner.banner_txt4")}</p>
                </div>                   
            </div>

            <div className='banner_main_texts_' >
                <h1>{t("home.banner.banner_txt5")} 
                <span> {t("home.banner.banner_txt6")} </span> 
                <span className='banner_main_texts_span'><img src={''} alt='' /></span>
                {t("home.banner.banner_txt7")}</h1>
            </div>

            <div className='banner_main_texts_btns' >
                <Link to={'/patient-portal'} className='banner_main_texts_btn1' >
                    <div className='banner_main_texts_btn1_' >
                        <FaPerson size={18} color='#fff' />
                    </div>
                    <p>{t("home.banner.banner_txt_btn1")}</p>
                </Link>

                <Link to={'/patient-portal'} className='banner_main_texts_btn2' >
                    <div className='banner_main_texts_btn2_' >
                        <FaBuildingFlag size={18} color='#000' />
                    </div>
                    <p>{t("home.banner.banner_txt_btn2")}</p>
                </Link>
            </div>
        </div>

        <div className='homebody_banner' >
            {   
                index === 3 ?
                <div style={{
                    opacity: fade ? 1 : 0.5,
                    transition: 'opacity 0.1s ease-in-out',
                    lazyLoad: true,
                }} 
                className=' homebody_banner_img3'>
                </div>
                : index === 4 ?
                <div style={{
                    opacity: fade ? 1 : 0.5,
                    transition: 'opacity 0.1s ease-in-out',
                    lazyLoad: true,
                }}  className=' homebody_banner_img4'>
                </div>
                : index === 0 ?
                <div style={{
                    opacity: fade ? 1 : 0.5,
                    transition: 'opacity 0.1s ease-in-out',
                    lazyLoad: true,
                }}  className=' homebody_banner_img'></div>
                : index === 1 ?
                <div style={{
                    opacity: fade ? 1 : 0.5,
                    transition: 'opacity 0.1s ease-in-out',
                    lazyLoad: true,
                }} className=' homebody_banner_img1'>
                </div>
                : index === 2 ?
                <div style={{
                    opacity: fade ? 1 : 0.5,
                    transition: 'opacity 0.1s ease-in-out',
                    lazyLoad: true,
                }} className=' homebody_banner_img2'></div>
                : null
            }
            <div className='homebody_banner_ovelay' >
                {   
                index === 3 ?
                <div className=' home_banner'>
                    <div className='home_banner_bxx'>
                        <div></div>
                        <div className='home_banner_bxx_'>
                            <p>{t("home.banner.banner_txt_box1")}</p>
                            <div>
                                <FaHotel />
                                <h4>{t("home.banner.banner_txt_sub1")}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                : index === 4 ?
                <div className=' home_banner'>
                    <div className='home_banner_bxx hbb2'>
                        <div></div>
                        <div className='home_banner_bxx_'>
                            <p>{t("home.banner.banner_txt_box2")}</p>
                            <div>
                                <FaHotel />
                                <h4>{t("home.banner.banner_txt_sub2")}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                : index === 0 ?
                <div className=' home_banner'>
                    <div className='home_banner_bxx hbb1'>
                        <div></div>
                        <div className='home_banner_bxx_'>
                            <p>{t("home.banner.banner_txt_box3")}</p>
                            <div>
                                <FaHotel />
                                <h4>{t("home.banner.banner_txt_sub3")}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                : index === 1 ?
                <div className=' home_banner'>
                    <div className='home_banner_bxx hbb3'>
                        <div></div>
                        <div className='home_banner_bxx_'>
                            <p>{t("home.banner.banner_txt_box4")}</p>
                            <div>
                                <FaHotel />
                                <h4>{t("home.banner.banner_txt_sub4")}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                : index === 2 ?
                    <div className='home_banner'>
                    <div className='home_banner_bxx hbb4'>
                        <div></div>
                        <div className='home_banner_bxx_'>
                            <p>{t("home.banner.banner_txt_box5")}</p>
                            <div>
                                <FaHotel />
                                <h4>{t("home.banner.banner_txt_sub5")}</h4>
                            </div>
                        </div>
                    </div>
                    </div>
                : null
            }
            </div>
            <div className='homebody_banner_' >
                <div className='clic_one'></div>
                <div className='clic_middle' >
                    <div className='clic_middle_btns'>
                        <div className={index === 3 ? 'clic_middle_btn_' : 'clic_middle_btn'} >
                            <p>{t("home.banner.banner_txt_box_btn4")}</p>
                        </div>
                        <div className={index === 4 ? 'clic_middle_btn_' : 'clic_middle_btn'}>
                            <p>{t("home.banner.banner_txt_box_btn5")}</p>
                        </div>
                    </div>
                </div>  
                <div className='clic_two'>
                    <div className='clic_two_btns'>
                        <div className={index === 0 ? 'clic_middle_btn_' : 'clic_middle_btn'} >
                            <p>{t("home.banner.banner_txt_box_btn1")}</p>
                        </div>
                        <div className={index === 1 ? 'clic_middle_btn_' : 'clic_middle_btn'}>
                            <p>{t("home.banner.banner_txt_box_btn2")}</p>
                        </div>
                        <div className={index === 2 ? 'clic_middle_btn_' : 'clic_middle_btn'}>
                            <p>{t("home.banner.banner_txt_box_btn3")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BanBox
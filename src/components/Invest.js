import React from 'react'
import '../styles/invest.css'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Invest() {

    const { t } = useTranslation()

  return (
    <div className='invest_container' >
        <div className='invest_header'>
            <div className='liner' data-aos ='fade-up'></div>
            <h1 data-aos ='fade-up'>{t("home.invest.text1")}</h1>
        </div>

        <div className='invest_body'>
            <div className='invest_body_box_' >
                <img src='/assets/log.avif' alt='' />
                <h3 data-aos ='fade-up'>{t("home.invest.text2")}</h3>
                <p data-aos ='fade-up'>{t("home.invest.text3")}</p>

                <Link data-aos ='fade-up' className='invest_links'>
                    <p>{t("home.invest.text4")}</p>
                </Link>
            </div>
            <div className='invest_body_box_' >
                <img src='/assets/off2.avif' alt='' />
                <h3 data-aos ='fade-up'>{t("home.invest.text5")}</h3>
                <p data-aos ='fade-up'>{t("home.invest.text6")}</p>

                <Link data-aos ='fade-up' className='invest_links'>
                    <p>{t("home.invest.text7")}</p>
                </Link>
            </div>
            <div className='invest_body_box_' >
                <img src='/assets/off.avif' alt='' />
                <h3 data-aos ='fade-up'>{t("home.invest.text8")}</h3>
                <p data-aos ='fade-up'>{t("home.invest.text9")}</p>

                <Link data-aos ='fade-up' className='invest_links'>
                    <p>{t("home.invest.text10")}</p>
                </Link>
            </div>
        </div>

        <div className='invest_big_word'>
            <div className='invest_big_word_text'>{t("home.invest.text11")}</div>
            <p>{t("home.invest.text12")}</p>
        </div>

    </div>
  )
}

export default Invest
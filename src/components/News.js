import React, { useState } from 'react'
import '../styles/news.css'
import { FaArrowRightLong } from 'react-icons/fa6'
import CustomSelect from './CustomSelect'
import { useTranslation } from 'react-i18next'

function News() {

    const [update, setupdate] = useState('')
    const [count, setcount] = useState(0)
    const { t } = useTranslation()

  return (
    <div className='news_container' >
        <div className='new_header' >
            <h1 data-aos ='fade-up'>{t("home.latest.text1")}</h1>
            <p data-aos ='fade-up'>{t("home.latest.text2")}</p>
        </div>

        <div className='new_sub_header' data-aos ='fade-up'>
            <p style={count === 0 ? {borderBottom:'1px solid #000'} : {}} onClick={()=> setcount(0)} >{t("home.latest.text3")}</p>
            <p style={count === 1 ? {borderBottom:'1px solid #000'} : {}} onClick={()=> setcount(1)}>{t("home.latest.text4")}</p>
            <p style={count === 2 ? {borderBottom:'1px solid #000'} : {}} onClick={()=> setcount(2)}>{t("home.latest.text5")}</p>
        </div>

        <div className='new_sub_select' style={{width:'100%'}} data-aos ='fade-up'>
            <CustomSelect
                options={[
                    {label: t("home.latest.text3") , value: 0},
                    {label: t("home.latest.text4") , value: 1},
                    {label: t("home.latest.text5") , value: 2},
                ]} 
                onChange={(value)=> setcount(value)}
                placeholder='Select News'
            />
        </div>

        <div className='news_body' >
            <div className='news_body_text'>
                <p >{t("home.latest.text6")} <span></span></p>

                {
                    count === 0 &&
                    <h3 data-aos ='fade-up'>{t("home.latest.text3")}</h3>
                }

                {
                    count === 1 &&
                    <h3 data-aos ='fade-up'>{t("home.latest.text4")}</h3>
                }

                {
                    count === 2 &&
                    <h3 data-aos ='fade-up'>{t("home.latest.text5")}</h3>
                }

                {
                    count === 0 &&
                    <p data-aos ='fade-up'>{t("home.latest.text7")}</p>
                }

                {
                    count === 1 &&
                    <p data-aos ='fade-up'>{t("home.latest.text8")}</p>
                }

                {
                    count === 2 &&
                    <p data-aos ='fade-up'>{t("home.latest.text9")}</p>
                }

                <div data-aos ='fade-up' className='read_more_link'>
                    <p>Read Now</p>
                    <div>
                        <FaArrowRightLong size={25} />
                    </div>
                </div>
            </div>

            { count === 0 &&
                <img data-aos ='fade-up' src='/assets/news2.jpg' alt='' />
            }

            { count === 1 &&
                <img data-aos ='fade-up' src='/assets/staff.jpg' alt='' />
            }

            { count === 2 &&
                <img data-aos ='fade-up' src='/assets/news.jpg' alt='' />
            }
        </div>
    </div>
  )
}

export default News
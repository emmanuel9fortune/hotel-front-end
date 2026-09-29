import React from 'react'
import AboutSelect from './aboutSelect'
import { FaArrowRight, FaHouse } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

function Greating() {

    const { t } = useTranslation()

  return (
    <div className='about_container__'>
        <div className='abount_container_head' >
            <h3>{t("about.greet.text1")}</h3>

            <div>
                <div>
                    <FaHouse color='grey' size={18}/>
                </div>
                <p><FaArrowRight style={{margin:'0 5px'}} color='grey'/> {t("about.greet.text2")}</p>
                <p><FaArrowRight style={{margin:'0 5px'}} color='grey'/>{t("about.greet.text1")}</p>
            </div>
        </div>

        <div className='about_main_hd' >
            <div className='about_main_hd_text'>
                <p className='about_main_hd_text_'> 
                    {t("about.greet.text3")}
                </p>
                <p>
                   {t("about.greet.text4")}
                </p>
            </div>
            <img src='/assets/ceo1.jpg' alt='' />
        </div>
        <p className='abt_text_t'>
            {t("about.greet.text4")}
        </p>

        <h3 className='abt_text_ht'>
            {t("about.greet.text5")}
        </h3>
        <p className='abt_text_htt'>
            {t("about.greet.text6")}
        </p>

        <h3 className='abt_text_ht'>
            {t("about.greet.text7")}
        </h3>
        <p className='abt_text_htt'>
            {t("about.greet.text8")}
        </p>

        <p style={{margin:'20px'}} className='abt_text_htt'>
            {t("about.greet.text9")}
        </p>

        <p style={{margin:'20px'}} className='abt_text_htt'>
            {t("about.greet.text10")}
        </p>

        <p style={{margin:'20px'}} className='abt_text_htt'>
            {t("about.greet.text11")}
        </p>

        <h3 className='abt_text_ht' style={{textAlign:'right', width:'100%', fontSize:'23px'}}>
            {t("about.greet.text12")}
        </h3>
    </div>
  )
}

export default Greating
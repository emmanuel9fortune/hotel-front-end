import React from 'react'
import BottomBar from './BottomBar'
import { useTranslation } from 'react-i18next'

function SubFooter() {

    const { t } = useTranslation()

  return (
    <div className='sub_footer' >
        <div className='sub_footer_'>
            <img src='/assets/ceo.jpg' alt='' data-aos ='fade-up' />
 
            <div className='sub_footer_text'>
                <p data-aos ='fade-up'>"{t("home.sub.text1")}"</p>

                <div>
                    <h3 data-aos ='fade-up' >{t("home.sub.text2")}</h3>
                    <p data-aos ='fade-up'>{t("home.sub.text3")}</p>
                </div>
            </div>
        </div>

        
        <div className='news_container sub_foot'>
            <div className='new_header' >
                <h1>{t("home.sub.text4")}</h1>
                <p>{t("home.sub.text5")}</p>
            </div>

            <img src='/assets/h5.jpg' alt='' />

            <div className='btm_text' >
                <h3>
                    {t("bottom.text1")}
                </h3>
                <p>
                    {t("bottom.text2")}
                </p>

                <h4>
                   {t("bottom.text3")}
                </h4>

                <ul>
                    <li>
                        {t("bottom.text4")}
                    </li>
                    <li>
                        {t("bottom.text5")}
                    </li>
                    <li>
                        {t("bottom.text6")}
                    </li>
                </ul>
                <h4>{t("bottom.text7")}</h4>
                <ul>
                    <li>
                        {t("bottom.text8")}
                    </li>
                    <li>
                        {t("bottom.text9")}
                    </li>
                </ul>
                <h4>{t("bottom.text10")}</h4>
                <ul>
                    <li>
                        {t("bottom.text11")}
                    </li>
                    <li>
                         {t("bottom.text12")}
                    </li>
                </ul>
            </div>

            <BottomBar/>
        </div>
    </div>
  )
}

export default SubFooter
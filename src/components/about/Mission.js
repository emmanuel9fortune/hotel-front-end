import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaArrowRight, FaHouse } from 'react-icons/fa6'

function Mission() {

    const { t } = useTranslation()

  return (
    <div className='about_container__'>
        <div className='abount_container_head' >
            <h3>{t("about.mission.text1")}</h3>

            <div>
                <div>
                    <FaHouse color='grey' size={18}/>
                </div>
                <p><FaArrowRight style={{margin:'0 5px'}} color='grey'/> {t("about.mission.text1")}</p>
                <p><FaArrowRight style={{margin:'0 5px'}} color='grey'/> {t("about.mission.text2")}</p>
            </div>
        </div>

        <div className='mission_container' >
            <h1>{t("about.mission.text3")}</h1>
            <p>{t("about.mission.text4")}</p>
        </div>

        <h1 className='mission_ht'>{t("about.mission.text5")}</h1>
        <p className='mission_htt'>{t("about.mission.text6")}</p>

        <div className='mission_bod' >
            <img className='mission_bod_img' src='/assets/m2.jpg' alt='' />
            <div className='mission_bod_ mission_bod_1 '>
                <div>
                    <img src='/assets/m3.png' alt='' />
                    <h3>{t("about.mission.text7")}</h3>
                    <p>{t("about.mission.text8")}</p>
                </div>
                <div>
                    <img src='/assets/m4.png' alt='' />
                    <h3>{t("about.mission.text9")}</h3>
                    <p>{t("about.mission.text10")}</p>
                </div>
            </div>
            <img className='mission_bod_img2' src='/assets/m2.jpg' alt='' />
            <div className='mission_bod_'>
                <div>
                    <img src='/assets/m5.png' alt='' />
                    <h3>{t("about.mission.text11")}</h3>
                    <p>{t("about.mission.text12")}</p>
                </div>
                <div>
                    <img src='/assets/m6.png' alt='' />
                    <h3>{t("about.mission.text13")}</h3>
                    <p>{t("about.mission.text14")}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Mission
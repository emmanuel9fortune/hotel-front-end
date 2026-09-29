import React from 'react'
import { FaArrowRight, FaHouse } from 'react-icons/fa6'
import Timeline from './TimeLine'
import { useTranslation } from 'react-i18next'

function History() {

    const { t } = useTranslation()

  return (
    <div className='about_container__'>
        <div className='abount_container_head' >
            <h3>{t("about.history.txt1")}</h3>

            <div>
                <div>
                    <FaHouse color='grey' size={18}/>
                </div>
                <p><FaArrowRight style={{margin:'0 5px'}} color='grey'/> {t("about.history.txt2")}</p>
                <p><FaArrowRight style={{margin:'0 5px'}} color='grey'/> {t("about.history.txt1")}</p>
            </div>
        </div>

        <div className='history_container' >
            <p>{t("about.history.txt3")}</p>
            <p>{t("about.history.txt4")}</p>
        </div>

        <div>
            <Timeline/>
        </div>
    </div>
  )
}

export default History
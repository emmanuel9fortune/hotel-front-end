import React from 'react'
import Head from '../../components/Navbar'
import BottomBar from '../../components/BottomBar'
import '../../styles/insight.css'
import { useTranslation } from 'react-i18next'

function Insights() {

  const { t } = useTranslation()

  return (
    <div>
        <Head stick={true}/>

        <div className='insights_container' >
          <h1>{t("insight.text1")}</h1>
          <div className='insight_banner' >
            <div className='insight_banner_overlay' ></div>
          </div>

          <p>
            {t("insight.text2")}
          </p>

          <p>
            {t("insight.text3")}
          </p>

          <p>
            {t("insight.text4")}
          </p>

          <h2>
            {t("insight.text5")}
          </h2> 

          <p>
            {t("insight.text6")}
          </p>

          <p>
            {t("insight.text7")}
          </p>

          <p>
            {t("insight.text8")}
          </p>

          <h3>
            {t("insight.text9")}
          </h3>

          <p>
            {t("insight.text10")}
          </p>

          <h3>
            {t("insight.text11")}
          </h3>

          <p>
            {t("insight.text12")}
          </p>

          <h3>
            {t("insight.text13")}
          </h3>

          <p>
            {t("insight.text14")}
          </p>

          <h2>
            {t("insight.text15")}
          </h2>

          <p>
            {t("insight.text16")}
          </p>

          <h3>{t("insight.text17")}
          </h3>

          <p>
            {t("insight.text18")}
          </p>

          <h3>
            {t("insight.text19")}
          </h3>

          <p>
            {t("insight.text20")}
          </p>

          <h2>
            {t("insight.text21")}
          </h2>

          <p>
            {t("insight.text22")}
          </p>

          <h3>
            {t("insight.text23")}
          </h3>

          <p>
            {t("insight.text24")}
          </p>
        </div>

        <BottomBar/>
    </div>
  )
}

export default Insights
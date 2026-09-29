import React from 'react'
import Head from '../../components/Navbar'
import PortBanner from '../../components/potfolio/PortBanner'
import '../../styles/portfolio.css'
import PortfolioOverview from '../../components/potfolio/Overview'
import BottomBar from '../../components/BottomBar'
import { useTranslation } from 'react-i18next'

function Potfolio() {

    const { t } = useTranslation()
    
  return (
    <div>
        <Head />
        <PortBanner/>   
        <h2 className='port_chart_h'>{t("portfolio.text11")}</h2> 
        <PortfolioOverview/> 

        
        <div className='news_container sub_foot' style={{marginTop:'100px'}} >

            <div className='btm_text' >
                <h3>
                    {t("portfolio.text25")}
                </h3>
                <p>
                    {t("portfolio.text26")}
                </p>
                <ul>
                    <li>
                    {t("portfolio.text27")}
                    </li>
                    <li>
                    {t("portfolio.text28")}
                    </li>
                    <li>
                    {t("portfolio.text29")}
                    </li>
                    <li>
                    {t("portfolio.text30")}
                    </li>
                </ul>
            </div>   

            
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

export default Potfolio
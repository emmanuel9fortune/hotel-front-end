import React from 'react'
import { useTranslation } from 'react-i18next'

function PortBanner() {
    
    const { t } = useTranslation()

  return (
    <div className='portfolio_banner' >
        <div className='portfolio_img' >
            <h1>{t("portfolio.text1")}</h1>
        </div>
        <div className='portfolio_banner_txt'>
            <p>
                {t("portfolio.text2")}
            </p>    
        </div>
        <div className='portfolio_banner_body'>
            <h3>{t("portfolio.text3")}</h3>
            <div>
                <div>
                    <p>{t("portfolio.text4")}</p>
                    <h1>$204 Billion</h1>
                </div>
                <div>
                    <p>{t("portfolio.text5")}</p>
                    <h1>$67 Billion</h1>
                </div>
                <div>
                    <p>{t("portfolio.text6")}</p>
                    <h1>93</h1>
                </div>
                <div>
                    <p>{t("portfolio.text7")}</p>
                    <h1>48%</h1>
                </div>
                <div>
                    <p>{t("portfolio.text8")}</p>
                    <h1>155</h1>
                </div>
                <div>
                    <p>{t("portfolio.text9")}</p>
                    <h1>95%</h1>
                </div>
                <div>
                    <p>{t("portfolio.text10")}</p>
                    <h1>January 2017</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PortBanner
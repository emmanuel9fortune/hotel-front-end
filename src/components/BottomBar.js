import React, { useState } from 'react'
import { FaAngleDown, FaAngleRight, FaFacebookF, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/footer.css'
import { useTranslation } from 'react-i18next'

function BottomBar() {

    const [link1, setlink1] = useState(false)
    const [link2, setlink2] = useState(false)

    const navigate = useNavigate()
    const { t } = useTranslation()

  return (
    <div className='about_sub' >

        <div className='bottom_bar'  >
            <div className='bottom_links'>
                <Link to={'/'} className='desk_header_logo' style={{width:'fit-content'}} >
                    <h3>월드크레스트 리츠</h3>
                    <h3>WorldCrest (REIT)</h3>
                </Link>
            </div>

            <div className='bottom_links'>
                <div onClick={()=>link2 ? setlink2(false) : setlink2(true)} className='MOBILE_btm_link_hd' >
                    <h3>{t("home.btm.text1")}</h3>
                </div>


                <div className='MOBILE_btm_links'>
                    <li onClick={()=>navigate('/portfolio')} >{t("home.btm.text2")}</li>
                    <li onClick={()=>navigate('/insights')} >{t("home.btm.text3")}</li>
                </div>
            </div>

            <div className='bottom_links'>
                <div onClick={()=>link2 ? setlink2(false) : setlink2(true)} className='MOBILE_btm_link_hd' >
                    <h3>{t("home.btm.text4")}</h3>
                </div>


                <ul className='MOBILE_btm_links'>
                    <li onClick={()=>navigate('/')} >{t("home.btm.text5")}</li>
                    <li onClick={()=>navigate('/about-us')} >{t("home.btm.text6")}</li>
                    <li onClick={()=>navigate('/contact-us')} >{t("home.btm.text7")}</li>
                    <li onClick={()=>navigate('/how-it-works')} >{t("home.btm.text8")}</li>
                    <li onClick={()=>navigate('/terms-&-condition')} >{t("home.btm.text9")}</li>
                </ul>
            </div>

        </div>

        
        <div className='bottom_bar_links'>
            <div className='bottom_bar_privacy_links'>
                <Link to={'/legal-&-compliance'} className='bottom_bar_privacy_link' >
                    <p>Legal & Compliance Disclosure </p>
                </Link>
                <Link to={'/privacy-policies'} className='bottom_bar_privacy_link'>
                    <p>Privacy Policy</p>
                </Link>
                <Link to={'/terms-&-condition'} className='bottom_bar_privacy_link'>
                    <p>Cookie Policy</p>
                </Link>
            </div>

            <div className='bottom_bar_'>
                <p>© 2025 WORLDCREST All Rights Reserved</p>
            </div>
        </div>
    </div>
  )
}

export default BottomBar
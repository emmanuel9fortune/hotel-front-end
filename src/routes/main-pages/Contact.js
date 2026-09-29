import React, { useState } from 'react'
import Head from '../../components/Navbar'
import BottomBar from '../../components/BottomBar'
import '../../styles/contact.css'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

function Contact() {

  const [fst, setfst] = useState(false)
  const [sec, setsec] = useState(false)
  const [trd, settrd] = useState(false)
  const [frt, setfrt] = useState(false)
  const [fif, setfif] = useState(false)

  const [fst_txt, setfst_txt] = useState('')
  const [sec_txt, setsec_txt] = useState('')
  const [trd_txt, settrd_txt] = useState('')
  const [frt_txt, setfrt_txt] = useState('')
  const [fif_txt, setfif_txt] = useState('')

  
  const { t } = useTranslation()

  return (
    <div>
        <Head stick={true} />

        <div className='contact_container' >
          <div className='contact_info' >
            <h1>{t("contact.text1")}</h1>
            <h2>{t("contact.text2")}</h2>
            <p>{t("contact.text3")}</p>

            <div className='contact_info_'>
              <div className='contact_info_txt'>
                <h4>{t("contact.text4")}</h4>
                <p>{t("contact.text5")}</p>
              </div>

              <div>
                <h4>{t("contact.text1")}</h4>
                
                <a href='mailto:investor.relations@worldcrest.com' >privatewealth@worldcrest.com</a>
                {/* <p>+82 (2) 1234-5678</p> */}
              </div>
            </div>

          </div>

          <div className='contact_form'>
            <div className='contact_form_txt'>
              <p>{t("contact.text6")}</p>
              <h1>
                {t("contact.text7")}
              </h1>
            </div>

            <div className='contact_form_input_field'>
              <div onFocus={()=>setfst(true)} onMouseLeave={()=> fst_txt.trim() !== '' || setfst(false)} className={`contact_form_input_ ${fst && "contact_form_input__"}`}>
                <label>{t("contact.text8")}*</label>
                <input value={fst_txt} onChange={(e)=>setfst_txt(e.target.value)} />
              </div>
              <div onFocus={()=>setsec(true)} onMouseLeave={()=> !sec_txt.trim() !== '' ||  setsec(false)} className={`contact_form_input_ ${sec && "contact_form_input__"}`}>
                <label>{t("contact.text9")}*</label>
                <input value={sec_txt} onChange={(e)=>setsec_txt(e.target.value)}  />
              </div>
              <div onFocus={()=>settrd(true)} onMouseLeave={()=> !trd_txt.trim() !== '' || settrd(false)} className={`contact_form_input_ ${trd && "contact_form_input__"}`}>
                <label>{t("contact.text10")}</label>
                <input  value={trd_txt} onChange={(e)=>settrd_txt(e.target.value)} />
              </div>
              <div onFocus={()=>setfrt(true)} onMouseLeave={()=> !frt_txt.trim() !== '' ||  setfrt(false)} className={`contact_form_input_ ${frt && "contact_form_input__"}`}>
                <label>{t("contact.text11")}*</label>
                <input  value={frt_txt} onChange={(e)=>setfrt_txt(e.target.value)} />
              </div>
              <div onFocus={()=>setfif(true)} onMouseLeave={()=> !fif_txt.trim() !== '' || setfif(false)} className={`contact_form_input_ ${fif && "contact_form_input__"}`}>
                <label>{t("contact.text12")}</label>
                <input  value={fif_txt} onChange={(e)=>setfif_txt(e.target.value)} />
              </div>

              <div className='contact_form_input_agree' >
                <input type='checkbox' />
                <p>
                  {t("contact.text13")}
                </p>
              </div>

              <div style={{margin:'20px 0'}} className='read_more_link'>
                  <p style={{fontWeight:500, fontSize:'20px'}}>Submit</p>
                  <div className='read_more_link_'>
                      <FaArrowRightLong size={25} />
                  </div>
              </div>
            </div>
          </div>
        </div>

        <BottomBar/>
    </div>
  )
}

export default Contact
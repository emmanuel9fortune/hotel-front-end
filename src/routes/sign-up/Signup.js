import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaArrowRightLong, FaCircleCheck } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import '../../styles/signup.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setids } from '../../features/idSlice'
import { seterrs } from '../../features/errSlice'
import IosLoader from '../../components/IosLoader'
import { selectreload, setreloads } from '../../features/reloadSlice'
import { useSelector } from 'react-redux'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

function Signup() {

  
    const [fst, setfst] = useState(false)
    const [sec, setsec] = useState(false)
  
    const [fst_txt, setfst_txt] = useState('')
    const [sec_txt, setsec_txt] = useState('')
    const [agree, setagree] = useState(false)
    const reload = useSelector(selectreload)


    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fst_txt);

    
    const rules = {
      length: sec_txt.length >= 8,
      lowercase: /[a-z]/.test(sec_txt),
      uppercase: /[A-Z]/.test(sec_txt),
      number: /[0-9]/.test(sec_txt),
    };
    

    const verifiedCount = Object.values(rules).filter(Boolean).length;
  
    
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [load, setload] = useState(false)
    const menu_icon = document.querySelector("#root")

    const signBtnClick = async () => {
      const menu_icon = document.querySelector("#root")
      menu_icon.classList.remove("errpop");

      const showError = (msg) => {
        dispatch(seterrs({ msg }))
        if (navigator.vibrate) navigator.vibrate(200)
        menu_icon.classList.add("errpop")
        setload(false)
      }

      // ---- VALIDATION FIRST ----
      if (!fst_txt.trim()) {
        return showError('Enter Email Address')
      }

      if (!isValid) {
        return showError('Enter a valid Email Address')
      }

      if (!sec_txt.trim()) {
        return showError('Enter Password')
      }

      if (
        !rules?.length ||
        !rules?.lowercase ||
        !rules?.number ||
        !rules?.uppercase
      ) {
        return showError('Enter a stronger Password')
      }

      if (!agree) {
        return showError('Confirm agreement')
      }

  // ---- NOW START LOADING ----
  setload(true)

  try {
    const res = await axios.post(
      'https://reit.smartledgerassist.com/reit-server/signup.php',
      {
        email: fst_txt,
        password: sec_txt,
      }
    )

    if (res?.data?.status === 'success') {
      const menu_icon = document.querySelector("#root")
      menu_icon.classList.add("dropdown");
      dispatch(setids({ id: res.data.user_id }))
      dispatch(setreloads({ load: reload?.load + 1 }))
      setload(false)
    } else {
      showError(res?.data?.message || 'Signup failed')
    }

  } catch (err) {
    showError(
      err?.response?.data?.message ||
      err?.message ||
      'Network error'
    )
  }
    }


const [count, setcount] = useState(0)

const [vis, setvis] = useState(false)
    

  return (
    <div>
      {/* <div className='sidebar_abs' ></div> */}
      <div className='signup_header' >
        <Link to={'/'} className='desk_header_logo' >
            <h3>월드크레스트 리츠</h3>
            <h3>WorldCrest (REIT)</h3>
        </Link>

        <div className='signup_header_'>
          <div className='signup_header__'>
            <p>{t("signup.text1")}</p>
            <Link className='login_lnk' to={'/sign-in'} >
              <p>{t("signup.text2")}</p>
            </Link>
          </div>
        </div>
      </div>

        <div className='contact_container signup_form' >
          <div className='contact_form'>
            <div className='contact_form_txt'>
              

              <p>{t("signup.text3")}</p>
              <h1>
                {t("signup.text4")}
              </h1>
            </div>

            <div className='contact_form_input_field'>
              <p className='signup_txt'>
                {t("signup.text5")} <span>{t("signup.text6")}</span> {t("signup.text7")}
              </p>

              <div className='signup_types'>
                <div onClick={()=>setcount(0)} className={count === 0 && 'signup_types_'} >
                  <p>{t("signup.text8")}</p>
                </div>

                <div>
                  <p>{t("signup.text9")}</p>
                </div>
              </div>

              <div onFocus={()=>setfst(true)} onMouseLeave={()=> fst_txt.trim() === '' ? setfst(false) : setfst(true)} className={`contact_form_input_ ${fst && "contact_form_input__"}`}>
                <label>{t("signup.text10")}</label>
                <input type='email' value={fst_txt} onChange={(e)=>[setfst_txt(e.target.value), setfst(true)]} />
              </div>
              <div onFocus={()=>setsec(true)} onMouseLeave={()=> sec_txt.trim() === '' ?  setsec(false) : setsec(true)} className={`contact_form_input_ ${sec && "contact_form_input__"}`}>
                <label>{t("signup.text11")}</label>
                <input type={!vis ? 'password' : 'text'} value={sec_txt} onChange={(e)=>[setsec_txt(e.target.value), setsec(true)]}  />
                <div onClick={()=> vis ? setvis(false) : setvis(true)} style={{position:'absolute', right:'10px', top: '30%', width:'30px', height:'20px', cursor:'pointer', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {
                        vis ?
                        <MdVisibilityOff  size={25} />
                        :
                        <MdVisibility  size={25} />
                    }
                </div>
              </div>

              <h4>{t("signup.text12")}</h4>

              <div className='password_'>
                <FaCircleCheck color={!rules.length ? 'grey' : 'green'} />
                <p style={rules.length ? {color:'green', fontWeight:700} : {}}>{t("signup.text14")}</p>
              </div>

              <div className='password_'>
                <FaCircleCheck color={!rules.lowercase ? 'grey' : 'green'} />
                <p style={rules.lowercase ? {color:'green', fontWeight:700} : {}}>{t("signup.text13")}</p>
              </div>

              <div className='password_'>
                <FaCircleCheck color={!rules.uppercase  ? 'grey' : 'green'} />
                <p style={rules.uppercase  ? {color:'green', fontWeight:700} : {}}>{t("signup.text15")}</p>
              </div>

              <div className='password_'>
                <FaCircleCheck color={!rules.number ? 'grey' : 'green'} />
                <p style={rules.number ? {color:'green', fontWeight:700} : {}}>{t("signup.text16")}</p>
              </div>


              <h4>{t("signup.text17")}</h4>

              <div className='password_strength'>
                <div style={verifiedCount >= 1 ?{backgroundColor:'green'} : {}}></div>
                <div style={verifiedCount >= 2 ?{backgroundColor:'green'} : {}}></div>
                <div style={verifiedCount >= 3 ?{backgroundColor:'green'} : {}}></div>
                <div style={verifiedCount === 4 ?{backgroundColor:'green'} : {}}></div>
              </div>






              <div className='contact_form_input_agree' >
                <input checked={agree} onChange={()=>agree ? setagree(false) :setagree(true)} type='checkbox' />
                <div>
                  {t("signup.text18")}
                  <Link style={{textDecoration:'none'}} className='read_more_link' to={'/terms-&-condition'} >
                    <p style={{color:'goldenrod', fontWeight:'600'}}>Read</p>
                  </Link>
                </div>
              </div>

              <div onClick={()=>!load && signBtnClick()} style={{margin:'20px 0'}} className='read_more_link'>
                  <p style={{fontWeight:500, fontSize:'20px'}}>{t("signup.text19")}</p>
                  {
                    load ?
                    <IosLoader/>
                    :
                    <div className='read_more_link_'>
                      <FaArrowRightLong size={25} />
                    </div>
                  }
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Signup
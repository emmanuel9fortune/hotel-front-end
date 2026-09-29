import axios from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import IosLoader from '../../components/IosLoader'
import { useDispatch } from 'react-redux'
import { seterrs } from '../../features/errSlice'
import { setids } from '../../features/idSlice'
import { setinfos } from '../../features/infoSlice'
import { selectreload, setreloads } from '../../features/reloadSlice'
import { useSelector } from 'react-redux'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

function Login() {

  const [fst, setfst] = useState(false)
  const [sec, setsec] = useState(false)

  const [fst_txt, setfst_txt] = useState('')
  const [sec_txt, setsec_txt] = useState('')
  const reload = useSelector(selectreload)

  
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [load, setload] = useState(false)

  const signBtnClick =async()=>{
    const menu_icon = document.querySelector("#root")
    menu_icon.classList.remove("errpop");

    setload(true)
    
    // =================================== //
    // =================================== //
    // =================================== //
    const handleEmErr =()=>{
      dispatch(
        seterrs({
          msg: 'Enter Email Address'
        })
      )
      navigator.vibrate(200)
      const menu_icon = document.querySelector("#root")
      menu_icon.classList.add("errpop")
      setload(false)
    }
    if(fst_txt.trim() === ''){
      return handleEmErr()
    }
    // =================================== //
    // =================================== //
    // =================================== //

    const handlePassErr=()=>{
      dispatch(
        seterrs({
          msg: 'Enter Password'
        })
      )
      navigator.vibrate(200)
      const menu_icon = document.querySelector("#root")
      menu_icon.classList.add("errpop")
      setload(false)
    }
    if(sec_txt.trim() === ''){
      return handlePassErr()
    }

    // =================================== //
    // =================================== //
    // =================================== //

    const value ={
      email : fst_txt,
      password : sec_txt,
    }


    try {
      const res = await axios.post('https://reit.smartledgerassist.com/reit-server/login.php', value)
      
      setload(false)
      
      if(res?.data?.status === 'success'){
        const menu_icon = document.querySelector("#root")
        menu_icon.classList.add("dropdown");
        dispatch(
          setids({
            id: res?.data?.user_id
          })
        )

        dispatch(
          setinfos({
            info: res?.data?.info
          })
        )

        dispatch(
          setreloads({
            load: reload?.load + 1
          })
        )

      }else{
        dispatch(
          seterrs({
            msg: res?.data?.message
          })
        )
        navigator.vibrate(200)
        const menu_icon = document.querySelector("#root")
        menu_icon.classList.add("errpop");
        setload(false)
      }
    } catch (error) {          
        dispatch(
          seterrs({
            msg: error?.message
          })
        )
        navigator.vibrate(200)
        const menu_icon = document.querySelector("#root")
        menu_icon.classList.add("errpop");
        setload(false)
    }

  }
  
  const [vis, setvis] = useState(false)

  const navigate = useNavigate()

  return (
    <div>
      <div className='signup_header' >
        <Link to={'/'} className='desk_header_logo' >
            <h3>월드크레스트 리츠</h3>
            <h3>WorldCrest (REIT)</h3>
        </Link>

        <div className='signup_header_'>
          <div className='signup_header__'>
            <p>{t("login.text1")}</p>
            <Link className='login_lnk' to={'/sign-up'} >
              <p>{t("login.text2")}</p>
            </Link>
          </div>
        </div>
      </div>

      
      <div className='contact_container signup_form' >
        <div className='contact_form'>
          <div className='contact_form_txt'>
            

            <p>{t("login.text3")}</p>
            <h1>
              {t("login.text4")}
            </h1>
          </div>

          <div className='contact_form_input_field'>
            <p style={{marginBottom:'20px'}} className='signup_txt'>
              {t("login.text5")}
            </p>

              <div onFocus={()=>setfst(true)} onMouseLeave={()=> fst_txt.trim() === '' ? setfst(false) : setfst(true)} className={`contact_form_input_ ${fst && "contact_form_input__"}`}>
                <label>{t("signup.text10")}</label>
                <input type='email' value={fst_txt} onChange={(e)=>[setfst_txt(e.target.value), setfst(true)]} />
              </div>
              <div onFocus={()=>setsec(true)} onMouseLeave={()=> sec_txt.trim() === '' ?  setsec(false) : setsec(true)} className={`contact_form_input_ ${sec && "contact_form_input__"}`}>
                <label>{t("signup.text11")}</label>
                <input  type={!vis ? 'password' : 'text'}  value={sec_txt} onChange={(e)=>[setsec_txt(e.target.value), setsec(true)]}  />
                <div onClick={()=> vis ? setvis(false) : setvis(true)} style={{position:'absolute', right:'10px', top: '30%', width:'30px', height:'20px', cursor:'pointer', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {
                        vis ?
                        <MdVisibilityOff  size={25} />
                        :
                        <MdVisibility  size={25} />
                    }
                </div>
              </div>

            <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div onClick={signBtnClick} style={{margin:'20px 0'}} className='read_more_link'>
                  <p style={{fontWeight:500, fontSize:'20px'}}>{t("login.text8")}</p>
                  {
                    load ?
                    <IosLoader/>
                    :
                    <div className='read_more_link_'>
                      <FaArrowRightLong size={25} />
                    </div>
                  }
              </div>

              <div onClick={()=> navigate('/forget-password')} style={{margin:'20px 0', display:'flex', justifyContent:'flex-end'}} className='read_more_link'>
                  <p style={{fontWeight:700, fontSize:'18px', color:'goldenrod'}}>{t("login.text9")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
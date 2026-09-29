import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import OtpInput from '../OtpInput'
import { useSelector } from 'react-redux'
import { selectinfo } from '../../features/infoSlice'
import CustomNuteSelect from '../CustomNuteSelect'
import '../../styles/verifyotp.css'
import IosLoader from '../IosLoader'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { seterrs } from '../../features/errSlice'
import { setids } from '../../features/idSlice'
import { setreloads } from '../../features/reloadSlice'

function OtpVerify() {

  const info = useSelector(selectinfo)

  const handleNute =async(value)=>{
   localStorage.removeItem('user_id')
   window.location.reload()
  }

  const [otp, setotp] = useState('')
  const [load, setload] = useState(false)

  const dispatch = useDispatch()

  const handleComplete =async(otp)=>{
    setload(true)
    try {
        const res = await axios.post('https://reit.smartledgerassist.com/reit-server/verify-otp.php',{otp, id: info?.info?.id})
        
        const interval = setInterval(() => {
            setTimeout(() => {
            setload(false)
            }, 200);
        }, 5000);

        clearInterval(interval);
        
        if(res?.data?.status === 'success'){
            const menu_icon = document.querySelector("#root")
            menu_icon.classList.add("dropdown");

            const interval = setInterval(() => {
            setTimeout(() => {
                dispatch(
                setreloads({
                    id: res?.data?.user_id + 1
                })
                )
            }, 200);
            }, 5000);

            return () => clearInterval(interval);

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

  const handleResent =async()=>{
    
    setload(true)
     try {
        const res = await axios.post('https://reit.smartledgerassist.com/reit-server/resend-otp.php',{id: info?.info?.id})
        console.log(res);
        
        setload(false)
        
        if(res?.data?.status === 'success'){
            dispatch(
                seterrs({
                    msg: 'OTP sent'
                })
            )

            navigator.vibrate(200)
            const menu_icon = document.querySelector("#root")
            menu_icon.classList.add("succpop");

            dispatch(
                setreloads({
                    id: res?.data?.user_id + 1
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

  return (
    <div className='verify_otp'>
      <div className='signup_header' >
            <Link to={'/'} className='desk_header_logo' >
                <h3>월드크레스트 리츠</h3>
                <h3>WorldCrest (REIT)</h3>
            </Link>

            <CustomNuteSelect
                options={[
                    {label: 'LOG OUT' , value: 'out'},
                ]} 
                onChange={(value)=> handleNute(value)}
                placeholder={info?.info?.email}
            />
        </div>

        <div className='otp_container' >
            <div className='otp_container_text' >
                <h1>Verify Your Email Address</h1>
                <p>Enter the 6 digit otp code sent to your mail</p>
            </div>

            <OtpInput
                onComplete={handleComplete}
                setotp={setotp}
            />

            
            <div onClick={()=>!load && handleComplete(otp)} style={{margin:'50px 0', justifyContent:'center'}} className='read_more_link'>
                <p style={{fontWeight:600, fontSize:'18px'}}>Verify OTP</p>
                {
                load ?
                <IosLoader/>
                :
                <div className='read_more_link_'>
                    <FaArrowRightLong size={25} />
                </div>
                }
            </div>

            <div style={{margin:'15px 0', display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', flexDirection:'row', padding:'0 5%'}}>
                <p style={{flex:1, color:'#646464ff'}}>Did not receive code?</p>
                <div onClick={handleResent} style={{textDecoration:'none', width:'50%', justifyContent:'flex-end'}} className='read_more_link'  >
                    <p style={{color:'goldenrod', fontWeight:'600'}}>Resend code</p>
                </div>
            </div>

            <div className='or_spacing' >
                <div></div>
                <p>OR</p>
                <div></div>
            </div>

            <p style={{margin:'15px', fontSize:'14px', color:'#646464ff'}}>Check your spam for OTP code</p>
            
        </div>
    </div>
  )
}

export default OtpVerify
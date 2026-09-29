import React, { useState } from 'react'
import OtpInput from './components/OtpInput'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { seterrs } from './features/errSlice'
import IosLoader from './components/IosLoader'
import { FaArrowRightLong } from 'react-icons/fa6'

function Member() {

    const [otp, setotp] = useState('')
    const dispatch = useDispatch()
    const [load, setload] = useState(false)
    const [errmsg, seterrmsg] = useState(false)

    const handleComplete =async()=>{
        seterrmsg('')
        const func =()=>{
            dispatch(
                seterrs({
                    msg: 'Enter Code'
                })
            )
            navigator.vibrate(200)
            const menu_icon = document.querySelector("#root")
            menu_icon.classList.add("errpop");
            setload(false)
        }
        if(otp === ''){
            return func()
        }
        
        setload(true)
        try {
            const res = await axios.post('https://reit.smartledgerassist.com/reit-server/verifymembership.php', {code: otp})            
            
            if(res.data.status === 'success'){
                localStorage.setItem('member', true)
                window.location.reload()
                setload(false)
            }else{
                setload(false)
                dispatch(
                    seterrs({
                        msg: res?.data?.message
                    })
                )
                seterrmsg(res?.data?.message)
                navigator.vibrate(200)
                const menu_icon = document.querySelector("#root")
                menu_icon.classList.add("errpop");
            }
        } catch (error) {          
            setload(false)
            dispatch(
                seterrs({
                 msg: error?.message
                })
            )
            navigator.vibrate(200)
            const menu_icon = document.querySelector("#root")
            menu_icon.classList.add("errpop");
        }
    }
    


  return (
    <div className='member_container' >
        <div className='member_container_' >
            <h1>Verify Membership</h1>

            <p>
                This site and the materials herein are directed only to a selective type of individuals and certain investors.
                To proceed please provide the 6 digit code you received in your mail.  
            </p>

            <div style={{margin:'50px 0'}} ></div>
            
            <OtpInput
                onComplete={handleComplete}
                setotp={setotp}
            /> 

            <div style={{margin:'50px 0'}} ></div>
            
            <small style={{color:'red', margin:'10px 0'}}>{errmsg !== '' ? errmsg : null}</small>

            <div onClick={handleComplete} style={{margin:'20px 0'}} className='read_more_link'>
                <p style={{fontWeight:500, fontSize:'20px'}}>Verify Code</p>
                {
                load ?
                <IosLoader/>
                :
                <div className='read_more_link_'>
                    <FaArrowRightLong size={25} />
                </div>
                }
            </div>

            <div style={{margin:'50px 0'}} ></div>

            <small>
                Do not have a membership code ? 
                <span onClick={()=> window.history.back()} >Exit WorldCrest</span>
            </small>
        </div>
    </div>
  )
}

export default Member
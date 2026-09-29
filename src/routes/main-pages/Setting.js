import React, { useState } from 'react'
import SideBar from '../../components/dashboard/SideBar'
import Header from '../../components/dashboard/Header'
import { FaArrowRight, FaKey, FaShield } from 'react-icons/fa6'
import { MdCurrencyExchange, MdDone, MdEdit, MdHelp, MdLogout, MdPerson, MdPrivacyTip, MdSwitchRight } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { selectinfo } from '../../features/infoSlice'
import Profile from '../../components/settings/Profile'
import axios from 'axios'
import { selectreload, setreloads } from '../../features/reloadSlice'
import { seterrs } from '../../features/errSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import OtpVerify from '../../components/dashboard/OtpVerify'
import Details from '../../components/dashboard/Details'
import VeridyIdentity from '../../components/dashboard/VeridyIdentity'

function Setting() {

  const info = useSelector(selectinfo)
  const reload = useSelector(selectreload)

  const [count, setcount] = useState(0)
  const dispatch = useDispatch()

  const handleVerification =async()=>{
    try {
        const res = await axios.post('https://reit.smartledgerassist.com/reit-server/continuever.php', {id: info?.info?.id})

      if(res?.data?.status === 'success'){
        const menu_icon = document.querySelector("#root")
        menu_icon.classList.add("dropdown");

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
  
      }

    } catch (error) {     
      console.log(error);
        
      dispatch(
        seterrs({
          msg: error?.message
        })
      )
      navigator.vibrate(200)
      const menu_icon = document.querySelector("#root")
      menu_icon.classList.add("errpop")
    }
  }

  const navigate = useNavigate()

    const handleNute =async()=>{
      localStorage.removeItem('user_id')
      window.location.reload()
    }
  
  // if(!info?.info?.verify_otp){
  //   return (
  //     <OtpVerify/>
  //   )
  // }

  if(!info?.info?.first_name){
    return (
      <Details/>
    )
  }

  if(!info?.info?.skip && !info?.info?.verify_id){
    return (
      <VeridyIdentity/>
    )
  }

  return (
    <div className='dashboard_container dark_theme' >
        <SideBar />
        <div className='dashboard_container_'>
            <Header set={true}/>

          {
            count === 0 &&
            <div className='settings_bar_container_' >
              <div className='settings_bar_container' >

                <div style={{width:'100%', height:'50px'}} ></div>

                <div style={{display:'flex', alignItems:'center', border:'none', width:'100%', justifyContent:'flex-start'}} className="profile">
                  <div
                      style={{display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#d6d6d6ff', height:'40px', width:'40px', borderRadius:'50%', flexShrink:0}}
                  >
                      <MdPerson size={25} color="grey" />
                  </div>
                  
                  <div style={{padding:'0 5px'}}>
                    <p>{info?.info?.first_name} {info?.info?.last_name}</p>
                    {
                      info?.info?.first_name ?
                      <p style={{width:'100%', textAlign:'right', fontWeight:600}}>{info?.info?.email}</p>
                      : null
                    }
                  </div>
                  
                </div>


                <div style={{width:'100%', height:'50px'}} ></div>
                
                <div className='settings_bar' onClick={()=>setcount(1)}>
                  <div className='setting_icon' >
                    <MdEdit size={23} />
                  </div>

                  <div>
                    <div>
                      <h4 style={{fontSize:'14px'}} >Profile</h4>
                      <p>View Personal Details</p>
                    </div>
                    <FaArrowRight/>
                  </div>
                </div>

                <div onClick={()=> info?.info?.verified_id === 'PENDING' && info?.info?.verified_id === 'DECLINED' ? handleVerification() : {} } className='settings_bar' >
                  <div className='setting_icon' >
                    <FaShield size={23} />
                  </div>

                  <div className='setting_text'> 
                    <div> 
                      <h4 style={{fontSize:'14px'}} >Verify Identity</h4>
                      <p style={info?.info?.verified_id === 'CONFIRMED' ? {fontSize:'13px', marginTop:'5px', color:'green'} : {fontSize:'13px', marginTop:'5px', color:'red'}}>{info?.info?.verified_id}</p>
                    </div>

                    {
                      info?.info?.verified_id === 'PENDING' && info?.info?.verified_id === 'DECLINED' ?
                      <FaArrowRight/>
                      :
                      <MdDone size={23} color='green'/>
                    }
                  </div>
                </div>

                <div className='settings_bar' onClick={()=> navigate(`/reset/${info?.info?.email}`)} >
                  <div className='setting_icon' >
                    <FaKey size={23} />
                  </div>

                  <div>
                    <div>
                      <h4 style={{fontSize:'14px'}} >Change Password</h4>
                      <p>Change to desired password</p>
                    </div>
                    <FaArrowRight/>
                  </div>
                </div>

                {/* <div className='settings_bar' >
                  <div className='setting_icon' >
                    <MdCurrencyExchange size={23} />
                  </div>

                  <div>
                    <div>
                      <h4 style={{fontSize:'14px'}} >Currency</h4>
                      <p>Choose your desired currency</p>
                    </div>
                    <FaArrowRight/>
                  </div>
                </div> */}


                <div onClick={()=> navigate('/privacy-policies')} className='settings_bar' >
                  <div className='setting_icon' >
                    <MdPrivacyTip size={23} />
                  </div>

                  <div>
                    <div>
                      <h4 style={{fontSize:'14px'}} >Privacy Center</h4>
                      <p>Read our privacy terms and conditions</p>
                    </div>
                    <FaArrowRight/>
                  </div>
                </div>
                
                <div onClick={()=>navigate('/legal-&-compliance')} className='settings_bar' >
                  <div className='setting_icon' >
                    <MdHelp size={23} />
                  </div>

                  <div>
                    <div>
                      <h4 style={{fontSize:'14px'}} >Legal & Compliance Disclosure</h4>
                    </div>
                    <FaArrowRight/>
                  </div>
                </div>

                
                <div style={{width:'100%', height:'100px'}} ></div>

                <div onClick={handleNute} style={{cursor:'pointer'}} className='setting_logout_btn'>
                  <MdLogout size={20} />
                  <p>LOG OUT</p>
                </div>

                <div style={{width:'100%', height:'200px'}} ></div>
              </div>
            </div>
          }

          {
            count === 1 &&
            <Profile setcount={setcount} />
          }
        </div>
    </div>
  )
}

export default Setting
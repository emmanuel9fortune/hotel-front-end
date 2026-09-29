import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { selectinfo } from '../../features/infoSlice';
import CustomNuteSelect from '../CustomNuteSelect';
import { MdCurrencyExchange, MdNotifications, MdOutlineAnalytics, MdOutlineCreditCard, MdOutlineHome, MdOutlineWallet, MdSettings, MdTrendingUp } from 'react-icons/md';
import { FaArrowLeft, FaBriefcase, FaGift } from 'react-icons/fa6';
import Notifications from './Notifications';
import axios from 'axios';
import Notification from './PopNotification';

function Header({invest, name, dep, wit, anl, myi, tra, set}) {
    const info = useSelector(selectinfo)
    const navigate = useNavigate()
    
    const handleNute =async(value)=>{
        if(value === 'out'){
            localStorage.removeItem('user_id')
            window.location.reload()
        }else{
            navigate('/settings')
        }
    }

    const menuClick =()=>{
        const menu_icon = document.querySelector(".menu-icon1")
        menu_icon.classList.toggle("open");
        const menu_dropdown = document.querySelector(".menu_dropDown")
        menu_dropdown.classList.toggle("dropDown");
    }

    const notClick =()=>{
        const menu_icon = document.querySelector("#notify")
        menu_icon.classList.toggle("open_notifi");
    }

    const bonusClick =()=>{
        const menu_icon = document.querySelector("#bonus_con")
        menu_icon.classList.toggle("open_bonus");
    }


    const dim = window.innerWidth < 750

    
    const id = info?.info?.id 
    const [notifications, setnotifications] = useState([])
    
    useEffect(()=>{
        const func =async()=>{
            try {
                const res = await axios.post('https://reit.smartledgerassist.com/reit-server/latesnotification.php', {user_id: id})                
                if(res.data.status === 'success'){
                    setnotifications(res.data.notifications)
                }
            } catch (error) {
                console.log(error);
            }
        }
        func()
    },[id])


  return (
    <div className='dashboard_header'>
        <div className='head' >
            {
                invest ?
                <h2 style={{textTransform:'capitalize'}}>Primary market</h2>
                :
                name ?
                <div onClick={()=> window.history.back()} style={{cursor:'pointer'}} className='project_name' >
                    <FaArrowLeft size={25} />
                    <h4 style={{textTransform:'capitalize', margin:'0 10px'}}>{name}</h4>
                </div>
                : 
                dep ?
                <h2 style={{textTransform:'capitalize'}}>Deposit Funds</h2>
                :
                wit ?
                <h2 style={{textTransform:'capitalize'}}>Withdraw Funds</h2>
                :
                anl ?
                <h2 style={{textTransform:'capitalize'}}>Analytics</h2>
                :
                myi ?
                <h2 style={{textTransform:'capitalize'}}>My Investments</h2>
                :
                tra ?
                <h2 style={{textTransform:'capitalize'}}>Transactions</h2>
                :
                set ?
                <h2 style={{textTransform:'capitalize'}}>Settings</h2>
                :
                <h2 style={{textTransform:'capitalize'}}>Hello {info?.info?.first_name} 👋</h2>
            }
 
            <div className='head_links' >

            </div>

            <div style={{display:'flex', alignItems:'center', position:'relative'}}>
                <div title='Notifications' onClick={notClick} className='notification_btn' style={{margin:'0 15px', cursor:'pointer'}}>
                    <MdNotifications size={25} />
                    {
                        notifications?.length > 0 &&
                        <div className='notification_dot' ></div>
                    }
                </div>

                {
                    info?.info?.bonus_bool ?
                    <div onClick={bonusClick} className='bonus_btn'>
                        <FaGift/>
                        <p style={{margin:'0 5px', fontWeight:600}}>Get a bonus</p>
                    </div>
                    : null
                }

                {
                    notifications?.length > 0 &&
                    <Notification message={notifications[0]?.message} />
                }

                {
                    !dim ?
                    <CustomNuteSelect
                        options={[
                            {label: 'SETTINGS' , value: 'set'},
                            {label: 'LOG OUT' , value: 'out'},
                        ]} 
                        onChange={(value)=> handleNute(value)}
                        placeholder={info?.info?.first_name + " " + info?.info?.last_name}
                    />
                    : null
                }

                
                <div onClick={()=>menuClick()} className="menu-icon1">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <Notifications/>
            </div>


            
            <div className='menu_dropDown' >
                <div style={{color:'#000'}} onClick={()=> navigate('/')} className='dropdown_slide'>
                    <p style={{color:'#000'}} >Dashboard</p>
                    <MdOutlineHome color='#000' /> 
                </div>
                <div style={{color:'#000'}} onClick={()=> navigate('/invest')} className='dropdown_slide'>
                    <p style={{color:'#000'}}>Invest</p>
                    <MdTrendingUp color='#000' /> 
                </div>
                <div style={{color:'#000'}} onClick={()=> navigate('/deposit')} className='dropdown_slide'>
                    <p style={{color:'#000'}} >Deposit</p>
                    <MdOutlineCreditCard color='#000' /> 
                </div>
                <div style={{color:'#000'}} onClick={()=> navigate('/withdrawals')} className='dropdown_slide'>
                    <p style={{color:'#000'}} >Withdrawals</p>
                    <MdOutlineWallet color='#000' /> 
                </div>
                <div style={{color:'#000'}} onClick={()=> navigate('/analytics')} className='dropdown_slide'>
                    <p style={{color:'#000'}} >Analytics</p>
                    <MdOutlineAnalytics color='#000' /> 
                </div>
                <div style={{color:'#000'}} onClick={()=> navigate('/my-investments')} className='dropdown_slide'>
                    <p style={{color:'#000'}} >My Investments</p>
                    <FaBriefcase color='#000' /> 
                </div>
                <div style={{color:'#000'}} onClick={()=> navigate('/transactions')} className='dropdown_slide'>
                    <p style={{color:'#000'}} >Transactions</p>
                    <MdCurrencyExchange color='#000' /> 
                </div>
                <div style={{color:'#000'}} onClick={()=> navigate('/settings')} className='dropdown_slide'>
                    <p style={{color:'#000'}} >Settings</p>
                    <MdSettings color='#000' /> 
                </div>
            </div>

        </div>
    </div>
  )
}

export default Header
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectinfo } from '../../features/infoSlice'
import { formatUnix } from './TimeFormat'
import { MdClose, MdNotificationImportant } from 'react-icons/md'

function Notifications() {

    
    const info = useSelector(selectinfo)
    const id = info?.info?.id 
    const [notifications, setnotifications] = useState([])
    
    useEffect(()=>{
        const func =async()=>{
            try {
                const res = await axios.post('https://reit.smartledgerassist.com/reit-server/getnotifications.php', {user_id: id})
                // console.log(res);
                
                if(res.data.status === 'success'){
                    setnotifications(res.data.notifications)

                    await axios.post('https://reit.smartledgerassist.com/reit-server/updatenotifications.php', {id: id})

                }
            } catch (error) {
                console.log(error);
            }
        }
        func()
    },[id])

    const notClick =()=>{
        const menu_icon = document.querySelector("#notify")
        menu_icon.classList.toggle("open_notifi");
    }

  return (
    <div className='notifications' id='notify' >
        
        <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <h3>Notifications</h3>
            
            <div onClick={notClick} style={{cursor:'pointer'}}  >
                <MdClose size={28} />
            </div>
        </div>

        <div style={{margin:'50px 0'}} ></div>

        {
            notifications?.length > 0 ?
            notifications?.map((item, i)=>(
                <div key={i} className='notifications_bars'>
                    <h4>{item?.title}</h4>
                    <p>{item?.message}</p>
                    <small>
                        {formatUnix(item?.timeStamp)}
                    </small>
                </div>
            ))
            : 
            <div className='empty_notification' >
                <MdNotificationImportant size={80} color='grey' />
                <h3>NO NOTIFICATIONS YET</h3>
            </div>
        }
    </div>
  )
}

export default Notifications
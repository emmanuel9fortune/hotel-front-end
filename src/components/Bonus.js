import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import ConfettiEffect from './ConfettiEffect'
import IosLoader from './IosLoader'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectinfo } from '../features/infoSlice'
import { seterrs } from '../features/errSlice'
import { FaGift } from 'react-icons/fa6'
import { selectreload, setreloads } from '../features/reloadSlice'

function Bonus() {

  const [load, setload] = useState(false)
  const reload = useSelector(selectreload)
  
  const dispatch = useDispatch()
  const info = useSelector(selectinfo)
  const id = info?.info?.id 

  const handleDeposit =async()=>{
    
    setload(true)

    try {
      const value ={
        user_id: id,
        amount: info?.info?.bonus
      }
      const res = await axios.post('https://reit.smartledgerassist.com/reit-server/claimbonus.php', value)
      console.log(res);
      
      if(res?.data?.status === 'success'){
        dispatch(
          seterrs({
            msg: res?.data?.message
          })
        )
        
        dispatch(
          setreloads({
            load: reload?.load + 1
          })
        )
        const menu_icon = document.querySelector("#root")
        menu_icon.classList.add("succpop");
        setload(false)
        const bonus_icon = document.querySelector("#bonus_con")
        bonus_icon.classList.toggle("open_bonus");
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

  
  const bonusClick =()=>{
      const menu_icon = document.querySelector("#bonus_con")
      menu_icon.classList.toggle("open_bonus");
  }

  return (
    <div className='bonus_display_container' style={{overflow:'hidden'}} id='bonus_con' >
        {
            info?.info?.bonus_bool &&
            <ConfettiEffect/>
        }
        <div className='overlay_' onClick={bonusClick} ></div>
        <div className='bonus_display_'>
            {
                info?.info?.bonus_bool ?
                <h2 style={{
                    background: "linear-gradient(to right, red, gold)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                }}
                >
                You have unlocked your exclusive bonus
                </h2>
                :
                <h2>Unlock your exclusive bonus</h2>
            }


            {
                info?.info?.bonus_bool ?
                <img src='/assets/gift.png' alt='' />
                :
                <FaGift style={{margin:'20px 0'}} size={80} color='grey' />
            }

            {
                info?.info?.bonus_bool ?
                <h4>
                Congratulations! You’ve earned a special reward for making your first deposit. Claim it now!
                </h4>
                :
                <h4>
                Make a deposit to unlock your exclusive bonus
                </h4>
            }

            {
                info?.info?.bonus_bool ?
                <div onClick={!load && handleDeposit} style={{backgroundColor:'#000', color:'#fff'}} className='deposit_container_wallets_btn' >
                {
                    !load ?
                    <p>Claim ${info?.info?.bonus} Bonus</p>
                    :
                    <IosLoader/>
                }
                </div> 
                :
                    <div onClick={bonusClick} style={{backgroundColor:'#000', color:'#fff'}} className='deposit_container_wallets_btn' >
                        <p>Close</p>
                    </div> 
            }   
        </div>
      </div>
  )
}

export default Bonus
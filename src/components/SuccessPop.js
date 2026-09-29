import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selecterr } from '../features/errSlice';
import { MdClose, MdDone } from 'react-icons/md';

function SuccessPop() {
    
  useEffect(()=>{
    const interval = setInterval(() => {
        const menu_icon = document.querySelector("#root")
        menu_icon.classList.remove("succpop");
    }, 20000);

    return () => clearInterval(interval);
  },[])

  const err = useSelector(selecterr)

  return (
    <div className='success_pop'>
        <p>success: {err?.msg}</p> 
        <div>
            <MdDone color='#00c200' size={30} />
        </div>
    </div>
  )
}

export default SuccessPop
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selecterr } from '../features/errSlice';
import { MdClose } from 'react-icons/md';

function ErrorPop() {
    
  useEffect(()=>{
    const interval = setInterval(() => {
        const menu_icon = document.querySelector("#root")
        menu_icon.classList.remove("errpop");
    }, 20000);

    return () => clearInterval(interval);
  },[])

  const err = useSelector(selecterr)

  return (
    <div className='error_pop'>
        <p>Error: {err?.msg}</p>
        <div>
            <MdClose color='red' size={30} />
        </div>
    </div>
  )
}

export default ErrorPop
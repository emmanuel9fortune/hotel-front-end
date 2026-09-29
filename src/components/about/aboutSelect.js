import React from 'react'

function AboutSelect({count, setcount}) {
  return (
    <div className='about_select'>
        <div onClick={()=>setcount(0)} className={`about_select_ ${count === 0 && 'abt_select_'}`} >
          <h3>CEO..Greetings</h3>
        </div>
        <div onClick={()=>setcount(1)} className={`about_select_ ${count === 1 && 'abt_select_'}`} >
          <h3>Mission/Vision</h3>
        </div>
        <div onClick={()=>setcount(2)} className={`about_select_ ${count === 2 && 'abt_select_'}`} >
          <h3>History</h3>
        </div>
        <div onClick={()=>setcount(3)} className={`about_select_ ${count === 3 && 'abt_select_'}`} >
          <h3>Organization</h3>
        </div>
    </div>
  )
}

export default AboutSelect
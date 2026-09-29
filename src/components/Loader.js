import React, { useEffect } from 'react'

function Loader() {

  return (
    <div className='loader' >
      <h2><span>W</span>orld <span>C</span> rest</h2>

      <div className='load_line_container' >
        <div className='load_line'></div>
      </div>
    </div>
  )
}

export default Loader
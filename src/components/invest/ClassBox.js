import React from 'react'
import { Link } from 'react-router-dom'

function ClassBox({item}) {
  return (
    <div className='class_box' >
        <div className='class_box_tag'>
            <p>Class {item?.class}</p>
        </div>
        <img src={item?.img} alt='' />
        <div>
            <div className='class_box_dettails_hd_txt'>
                <h4>{item?.classify}</h4>
                <h4>Incom Producting</h4>
            </div>
            <h3>{item?.name} {item?.head}</h3>
            <progress style={{width:'100%'}} max={100} value={item?.fill} />
            <div className='progress_txt'>
                <p>{item?.fill}% filled</p>
                <p>${item?.left} left</p>
            </div>

            <div className='class_box_dettails'>
                <h4>Annual Interest Rate</h4>
                <p>{item?.annual}</p>
            </div>

            <div className='class_box_dettails'>
                <h4>Quaterly Payout</h4>
                <p>${item?.quaterly?.toLocaleString('en-US')}</p>
            </div>

            <div className='class_box_dettails'>
                <h4>Project Amount</h4>
                <p style={{color:'green'}} >${item?.min?.toLocaleString('en-US')}</p>
            </div>

            <div className='class_box_dettails'>
                <h4>Investment period</h4>
                <p>{item?.invest_period}</p>
            </div>

            <Link to={`/projects/${item?.class}/${item?.name}`} style={{textDecoration:'none', color:'#000', borderRadius:'10px', backgroundColor:'#ff9b0f', margin:'20px 0'}} className='deposit_container_wallets_btn' >
                <p>View Project</p>
            </Link>
        </div>
    </div>
  )
}

export default ClassBox
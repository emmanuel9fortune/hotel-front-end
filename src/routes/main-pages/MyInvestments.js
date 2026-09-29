import React, { useEffect, useState } from 'react'
import Header from '../../components/dashboard/Header'
import SideBar from '../../components/dashboard/SideBar'
import { FaBuilding, FaCalendar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { selectinfo } from '../../features/infoSlice'
import { useSelector } from 'react-redux'
import axios from 'axios'
import classes from '../../components/invest/classes.json'
import ClassBox from '../../components/invest/ClassBox'

function MyInvestments() {

  
      
  const [recent_investments, setrecent_investments] = useState([])
  const [investedfunds, setinvestedfunds] = useState(0)

  const info = useSelector(selectinfo)
  const id = info?.info?.id 

  useEffect(()=>{
    const func1 =async()=>{
        try {
            const res = await axios.post('https://reit.smartledgerassist.com/reit-server/analytics.php', {user_id: id})
            console.log(res);
            
            if(res.data.status === 'success'){
                setinvestedfunds(res.data.total)
                setrecent_investments(res.data.recent_investments)
            }
        } catch (error) {
            console.log(error);
        }
    }
    func1()
  },[id])

  
  
  const getItems = classes?.filter(((item)=> 
    recent_investments?.some((items)=> item?.name === items?.property_name)
  ))  
  


  
  
  return (
    <div className='dashboard_container dark_theme' >
        <SideBar />
        <div className='dashboard_container_'>
            <Header myi={true}/>

            <div className='dashboard_container_banner_bod2_boxes m_invest'>
              <div  className='capital_bar'>
                <div>
                  <h4>Total Equity</h4>
                </div>
                <div>
                  <h4>$ {Number(investedfunds).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </h4>
                </div>
              </div>
              {
                recent_investments?.length > 0 ?
                  recent_investments?.map((item, i)=>(
                    <div key={i} className='capital_bar'>
                      <div>
                        <FaBuilding/>
                      </div>
                      <div>
                        <h4 style={{fontWeight:'300'}}>{item?.property_name}</h4>
                        <p style={{fontSize:'13px'}}>{item?.end_date}</p>
                      </div>
                    </div>
                    ))
                  :
                <div className='empty_notification' style={{height:'fit-content', display:'flex', flexDirection:'row'}} >
                    <FaBuilding size={80} color='grey' />
                    <h3>NO INVESTMENTS YET</h3>
                </div>
              }

              {
                recent_investments?.length > 0 ?
                  recent_investments?.map((item, i)=>(
                    <div key={i}  className='capital_bar'>
                      <div>
                        <h4 style={{fontWeight:'300'}}>{item?.property_name}</h4>
                        <p>class {item?.class}</p>
                      </div>
                      <div>
                        <h4>Next pay: </h4>
                        <FaCalendar size={25} />
                      </div>
                    </div>
                    ))
                  :
                null
              }
            </div>

            <div className='invest_class_boxes_hd' >
              <h2>My Active Assets</h2>
            </div>

            <div className='invest_class_boxes' >
              {
                getItems?.length > 0 ?
                  getItems?.map((item, i)=>(
                    <div key={i} className='class_box' >
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
                                <h4>Quaterly Payout</h4>
                                <p>${item?.quaterly?.toLocaleString('en-US')}</p>
                            </div>
                
                            <div className='class_box_dettails'>
                                <h4>Investment period</h4>
                                <p>{item?.invest_period}</p>
                            </div>
                        </div>
                    </div>
                  ))
                : null
              }
            </div>
        </div>
    </div>
  )
}

export default MyInvestments
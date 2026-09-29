import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectinfo } from '../../features/infoSlice'
import OtpVerify from '../../components/dashboard/OtpVerify'
import Details from '../../components/dashboard/Details'
import '../../styles/dashboard.css'
import VeridyIdentity from '../../components/dashboard/VeridyIdentity'
import Header from '../../components/dashboard/Header'
import SideBar from '../../components/dashboard/SideBar'
import { MdAccountBalance, MdTrendingFlat, MdTrendingUp, MdWork } from 'react-icons/md'
import BarChart from '../../components/dashboard/BarChart'
import { FaA, FaC, FaCoins, FaD, FaE, FaGift, FaI, FaPlantWilt, FaS, FaT } from 'react-icons/fa6'
import CustomSelect from '../../components/CustomSelect'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { formatUnix } from '../../components/dashboard/TimeFormat'
import ConfettiEffect from '../../components/ConfettiEffect'
import { useDispatch } from 'react-redux'
import IosLoader from '../../components/IosLoader'

function Dashboard() {

  const info = useSelector(selectinfo)
  const id = info?.info?.id 
  const navigate = useNavigate()
  
  const [rate, setrate] = useState('')


  const [type, settype] = useState('deposit')
  const [transactions, settransactions] = useState([])
  const [recent_investments, setrecent_investments] = useState([])
  const [investedfunds, setinvestedfunds] = useState(0)
  const [load, setload] = useState(false)

  useEffect(()=>{
    const func =async()=>{
      setload(true)
        try {
            const res = await axios.post('https://reit.smartledgerassist.com/reit-server/transaction.php', {user_id: id, type})
            setload(false)
            if(res.data.status === 'success'){
                settransactions(res.data.transactions)
            }
        } catch (error) {
            console.log(error);
            setload(false)
        }
    }
    func()

    const func1 =async()=>{
        try {
            const res = await axios.post('https://reit.smartledgerassist.com/reit-server/investedfunds.php', {user_id: id})
            // console.log(res);
            
            if(res.data.status === 'success'){
                setinvestedfunds(res.data.total)
                setrecent_investments(res.data.recent_investments)
            }
        } catch (error) {
            console.log(error);
        }
    }
    func1()
  },[id, type])

  
  const bonusClick =()=>{
      const menu_icon = document.querySelector("#bonus_con")
      menu_icon.classList.toggle("open_bonus");
  }
  

  // if(info?.info?.email && !info?.info?.verify_otp){
  //   return (
  //     <OtpVerify/>
  //   )
  // }

  if(info?.info?.email && !info?.info?.first_name){
    return (
      <Details/>
    )
  }

  if(info?.info?.email && !info?.info?.skip && !info?.info?.verify_id){
    return (
      <VeridyIdentity/>
    )
  }

  

  return ( 
    <div className='dashboard_container' >
     
        <SideBar/>
      <div className='dashboard_container_'>
        <Header/>

        <div className='dashboard_container_banner'>
          <div className='dashboard_container_banner1_' >
            <div className='dashboard_container_banner1_box'>
              <div className='dashboard_container_banner1_box_hd' >
                <p>Balance</p>
                <div title='Summary of invested funds and wallet balance'>
                  <MdAccountBalance style={{transform: 'rotate(-30deg)'}} size={30} />
                </div>
              </div>

              <h3 style={{fontSize:'20px'}} >$ {(Number(info?.info?.balance) + Number(investedfunds)).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
              </h3>
            
              <div style={{cursor:'pointer'}} onClick={()=>navigate('/deposit')} className='dashboard_container_banner1_box_btn1'  > 
                <p style={{color:'#000', fontSize:'15px'}}>+ Add Funds</p>
              </div>
            </div>
            
            <div className='dashboard_container_banner1_box'>
              <div className='dashboard_container_banner1_box_hd' >
                <p>Available For Investment</p>
                <div title='Wallet balance'>
                  <FaCoins style={{transform: 'rotate(-30deg)'}} size={30} color='#000' />
                </div>
              </div>

                <h3 style={{fontSize:'20px'}} >$ {Number(info?.info?.balance).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                </h3>
                
                <div style={{cursor:'pointer'}} onClick={()=>navigate('/invest')} className='dashboard_container_banner1_box_btn' > 
                  <p style={{color:'#000', fontSize:'15px'}}>Invest</p>
                </div>
            </div>

            <div className='dashboard_container_banner1_box'>
              <div className='dashboard_container_banner1_box_hd' >
                <p>Invested Funds</p>
                <div title='Summation of invested funds'>
                  <MdTrendingUp size={30} />
                </div>
              </div>

                <h2>$ {Number(investedfunds).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                </h2>
            </div>

            <div className='dashboard_container_banner1_box'>
              <div className='dashboard_container_banner1_box_hd' >
                <p>Quaterly Returns</p>
                <div title='Annual Returns'>
                  <MdWork style={{transform: 'rotate(-30deg)'}} size={30} />
                </div>
              </div>

                <h2>0.00 %</h2>
            </div>

          </div>



          <div className='dashboard_container_banner2_'>
            <div className='bar_chart_div' >
              <div className='bar_chart_header'>
                <h2>Profit Status</h2>

                <div>
                  <p>All time profit $0.00</p>
                  <CustomSelect
                      options={[
                          {value: 'i' , label: ''},
                          {value: 's' , label: ''},
                          {value: 't' , label: ''},
                          {value: 'd' , label: ''},
                      ]} 
                      onChange={(value)=> setrate(value)}
                      placeholder='Primary Market'
                  />
                </div>
              </div>
              <BarChart/>
            </div>
          </div>
        </div>


        <div className='dashboard_container_banner' style={{margin:'30px 0'}}>
          <div className='dashboard_container_banner_bod2'>
          {
              info?.info?.bonus_bool ?
                <h4 style={{margin:'10px', width:'95%'}} >Unlock Your Exclusive Bonus Today</h4 >
              : null
          }
            
            
            {
              info?.info?.bonus_bool ?
              <div className='bonus_display'>
                <p>This exclusive bonus is only available here—don’t miss it!</p>
                
                <div onClick={bonusClick} className='bonus_btn'>
                    <FaGift/>
                    <p style={{margin:'0 5px', fontWeight:600}}>Claim bonus</p>
                </div>
              </div>
              : null
            }

            <h3 style={{marginTop:'20px'}}>Recent Investments</h3>

            {
              recent_investments?.length > 0 ?
                recent_investments?.map((item, i)=>(
                  <div key={i} className='dashboard_container_banner_bod2_'>
                    <div className='dashboard_container_banner_bod2_icon' >
                      <FaCoins size={25} />
                    </div>

                    <div className='dashboard_container_banner_bod2_text'>
                      <div>
                        <h4>Class {item?.class}</h4>
                        <p>{item?.property_name}</p>
                      </div>

                      <h3 style={{fontSize:'16px'}} >
                        $ {Number(item?.amount).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                      </h3>
                    </div>
                  </div>
                ))
              :
              <div className='empty_notification' style={{height:'200px'}} >
                  <FaCoins size={80} color='grey' />
                  <h3>NO INVESTMENTS YET</h3>
              </div>
            }
          </div>


          <div className='dashboard_container_banner_bod2'>
            <h3>Plans</h3>

            <div className='dashboard_container_banner_bod2_boxes'>
              <Link to={'/invest/A'} className='dashboard_container_banner_bod2_box'>
                <div>
                  <FaA size={23} color='#000' />
                </div>

                <h3>Class Average</h3>
                <p>Min. $10,000.00</p>
              </Link>
              <Link to={'/invest/E'} className='dashboard_container_banner_bod2_box'>
                <div>
                  <FaE size={23} color='#000' />
                </div>

                <h3>Class Exclusive</h3>
                <p>Min. $100,000.00</p>
              </Link>
            </div>

            
            <div className='dashboard_container_banner_bod2_transact_hs'>
              <h3>Transactions</h3>

              <div className='dashboard_container_banner_bod2_transact_hs_btns'>
                  <div onClick={()=>settype('deposit')} style={{cursor:'pointer'}} className={type === 'deposit' ? 'dashboard_transacts_btns': ''}>
                      <p>Deposits</p>
                  </div>

                  <div onClick={()=>settype('withdraw')} style={{cursor:'pointer'}} className={type !== 'deposit' ? 'dashboard_transacts_btns' : ''}>
                      <p>Withdrawals</p>
                  </div>
              </div>
            </div>

            {
              !load ?
              <table className="custome_table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions?.sort((a, b)=> b?.timeStamp - a?.timeStamp).map((item, i)=> (
                            <tr key={i}>
                                <td>{item?.type}</td>
                                <td style={item?.status === 'PENDING' ? {color:'orange'} : item?.status === 'CONFIRMED' ?{color:'green'} : item?.status === 'DECLINED' ?{color:'red'} : {}} >
                                    <p>{item?.status}</p>
                                </td>
                                <td>{formatUnix(item?.timeStamp)}</td>
                                <td>${item?.amount?.toLocaleString('en-US')}</td>
                            </tr>
                        ))
                    }
                </tbody>
              </table>
              :
              <div style={{width:'100%', height:'300px', display:'flex', alignItems:'center', justifyContent:'center'}} >
                <IosLoader/>
              </div>
            }

          </div>
        </div>
      </div>

      
    </div>
  )
}

export default Dashboard
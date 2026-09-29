import React, { useEffect, useState } from 'react'
import SideBar from '../../components/dashboard/SideBar'
import Header from '../../components/dashboard/Header'
import { useSelector } from 'react-redux'
import { selectinfo } from '../../features/infoSlice'
import axios from 'axios'
import { formatUnix } from '../../components/dashboard/TimeFormat'

function Transactins() {
    
  const info = useSelector(selectinfo)
  const id = info?.info?.id 

  const [type, settype] = useState('deposit')
  const [transactions, settransactions] = useState([])

  useEffect(()=>{
    const func =async()=>{
        try {
            const res = await axios.post('https://reit.smartledgerassist.com/reit-server/transaction.php', {user_id: id, type})
            
            
            if(res.data.status === 'success'){
                settransactions(res.data.transactions)
            }
        } catch (error) {
            console.log(error);
        }
    }
    func()
},[id, type])

  return (
    <div className='dashboard_container dark_theme' >
        <SideBar />
        <div className='dashboard_container_'>
            <Header tra={true}/>
            
            <div className='transactions_' >
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
                    {   transactions?.length > 0 ?
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
                        :
                        <div style={{width:'100%', height:'100vh'}} ></div>
                    }
                </tbody>
                </table>
            </div>
        </div>
    </div>
  )
} 

export default Transactins
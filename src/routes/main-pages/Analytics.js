import React, { useEffect, useState } from 'react'
import SideBar from '../../components/dashboard/SideBar'
import Header from '../../components/dashboard/Header'
import AnalystChart from '../../components/dashboard/AnalystChart'
import CustomSelect from '../../components/CustomSelect'
import PieChart from '../../components/dashboard/PieChart'
import CustomPieChart from '../../components/dashboard/PieChart'
import { MdViewColumn } from 'react-icons/md'
import { FaBuilding, FaCalendar } from 'react-icons/fa6'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectinfo } from '../../features/infoSlice'

function Analytics() {

  const [rate, setrate] = useState('')
   

    
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

    
    const getclassE = recent_investments?.filter((item)=> item?.class === 'E')
    const getclassA = recent_investments?.filter((item)=> item?.class === 'A')

    const calc =(value)=>{
      if(value === 'E'){
        return getclassE?.length * 100 / recent_investments?.length
      }else{
        return getclassA?.length * 100 / recent_investments?.length
      }
      
    }  
      
   const assetAllocation = React.useMemo(() => {
      if (!Array.isArray(recent_investments)) return [];

      // 1. Group totals per class
      const grouped = recent_investments.reduce((acc, item) => {
        const cls = item.class;
        const amount = Number(item.amount || 0);

        if (!acc[cls]) {
          acc[cls] = {
            name: `Class ${cls}`,
            rawValue: 0,
            color: cls === 'E' ? '#FFD08A' : '#FFB84D',
          };
        }

        acc[cls].rawValue += amount;
        return acc;
      }, {});

      const values = Object.values(grouped);

      // 2. Calculate grand total
      const total = values.reduce((sum, item) => sum + item.rawValue, 0);

      // 3. Convert to percentages (100%)
      return values.map(item => ({
        name: item.name,
        value: total === 0 ? 0 : Number(((item.rawValue / total) * 100).toFixed(2)),
        color: item.color,
      }));
    }, [recent_investments]);

      

    

    const returns = recent_investments?.map((item)=> JSON.parse(item?.return || '[]'))
    let total = 0;

    const getQuater = returns.forEach(item => {
      total += item.amount;
    });

  return (
    <div className='dashboard_container dark_theme' >
        <SideBar />
        <div className='dashboard_container_'>
            <Header anl={true}/>
        
          <div className='analytics_charts'>

            <div className='analytics_charts_hd'>
              <div>
                <h2>Portfolio Overview</h2>
                <h4>All Funds</h4>
              </div>

              <div>
                <h4>Total Invested</h4>
                <h1>${Number(investedfunds).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                </h1>
                <p>Annual Return</p>
              </div>

              <div>
                <h4>Quaterly Earnings</h4>
                <h1>${Number(getQuater || 0).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                </h1>
                <p>Annual Return</p>
              </div>

              <div>
                <h4>Active Assets</h4> 
                <h1>{recent_investments?.length}</h1>
              </div>
            </div>


            <div className='dashboard_container_analytics' >
              <div className='dashboard_container_banner1_' >
                <h2>Portfolio Structure</h2>
                {
                  assetAllocation ?
                  <CustomPieChart data={assetAllocation} title="" />
                  :
                  <p>No Data Found</p>
                }

                <div className='dashboard_container_analytics_lines'>
                  <div>
                    <p>Class E</p>
                    <div></div>
                  </div>
                  <progress className='progress_bar1' value={calc('E')} max={100} />

                  <div>
                    <p>Class A</p>
                    <div></div>
                  </div>
                  <progress className='progress_bar2' value={calc('A')} max={100} />

                </div>
              </div>
 
              <div className='dashboard_container_banner2_'>
                <div className='bar_chart_div' >
                  <div className='bar_chart_header'>
                    <h2>Performance Insights</h2>

                    <div>
                      <p>Value Growth Timeline</p>
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
                  <AnalystChart/>
                </div>

                <div className='capital_'>
                  <h3>Capital at Maturity</h3>
                  <FaCalendar/>
                </div>

                {
                  recent_investments?.length > 0 ?
                    recent_investments?.map((item, i)=>(
                      <div key={i} className='capital_bar' style={{width:'100%'}}>
                        <div>
                          <FaBuilding/>
                        </div>
                        <div>
                          <h4>{item?.property_name}</h4>
                          <p>{item?.end_date}</p>
                        </div>
                      </div>
                      ))
                    :
                  <div className='empty_notification' style={{height:'200px'}} >
                      <FaBuilding size={80} color='grey' />
                      <h3>NO INVESTMENTS YET</h3>
                  </div>
                }

              </div>

            </div>

            
            <div className='table_box' >
              <h3>Distribution History</h3>
              <table className="custome_table">
                <thead>
                  <tr>
                    <th>Assets</th>
                    <th>Class</th>
                    <th>Period</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>----</td>
                      <td>----</td>
                      <td>----</td>
                      <td>----</td>
                    </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
    </div>
  )
}

export default Analytics
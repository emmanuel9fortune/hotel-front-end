import React, { useEffect, useState } from 'react'
import Header from '../../components/dashboard/Header'
import SideBar from '../../components/dashboard/SideBar'
import ClassBox from '../../components/invest/ClassBox'
import '../../styles/investments.css'
import classes from '../../components/invest/classes.json'
import { useParams } from 'react-router-dom'
import CustomSelect from '../../components/invest/SortCustomSelect'

function Invest() {

  const {clas} = useParams()

  const getClasses = classes?.filter((item)=> item?.class === `${clas}`)
  const [sortType, setSortType] = useState("");
  const [sortedData, setSortedData] = useState(classes);

  

  useEffect(() => {
    let sorted = !clas ? [...classes] : [...getClasses];

    if (sortType === "lowest_amount") {
      sorted.sort((a, b) => a.min - b.min);
    }

    if (sortType === "highest_return") {
      sorted.sort(
        (a, b) => parseFloat(b.annual) - parseFloat(a.annual)
      );
    }

    if (sortType === "quaters") {
      sorted.sort((a, b) => a.quaterly - b.quaterly);
    }

    setSortedData(sorted);
  }, [sortType, classes]);
  
  return ( 
    <div className='dashboard_container' >
        <SideBar />
        <div className='dashboard_container_'>
            <Header invest={true}/>

            <div style={{display:'flex', alignContent:'center', justifyContent:'space-between', width:'100%', padding:'0 5%', margin:'20px 0'}}>
              <div></div>

              <CustomSelect
                  options={[
                      {value: 'lowest_amount' , label: 'Lowest Amount'},
                      {value: 'highest_return' , label: 'Highest Return'},
                      {value: 'quaters' , label: 'Quaters'},
                  ]} 
                  onChange={(value)=> setSortType(value)}
                  placeholder='Sort By'
              />
            </div>

            <div className='invest_class_boxes' >
              { sortedData?.length > 0 ?
                  sortedData?.map((item, i)=>(
                    <ClassBox key={i} item={item} />
                  ))
                :
                <div style={{width:'100%', height:'100vh'}} ></div>
              }
            </div>
        </div>
    </div>
  )
}

export default Invest
import React, { useState } from 'react'
import SideBar from '../dashboard/SideBar'
import Header from '../dashboard/Header'
import { Link, useParams } from 'react-router-dom'
import IosLoader from '../IosLoader'
import classes from '../../components/invest/classes.json'
import { useDispatch } from 'react-redux'
import { seterrs } from '../../features/errSlice'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectinfo } from '../../features/infoSlice'
import { selectreload, setreloads } from '../../features/reloadSlice'

function Projects() {
  
    const {name} = useParams()
    const [fst, setfst] = useState(false)
    const [agree, setagree] = useState(false)
    const [load, setload] = useState(false)
    const [errmsg, seterrmsg] = useState('')
    const info = useSelector(selectinfo)
    const id = info?.info?.id 

  
    const getItem = classes?.find(((item)=> item?.name === name))

    const reload = useSelector(selectreload)
    const dispatch = useDispatch()
    const menu_icon = document.querySelector("#root")
    
    const handleDeposit =async()=>{

        seterrmsg('')
        
        const func =()=>{
            dispatch(
                seterrs({
                 msg: 'Confirm that you have agreed to our terms '
                })
            )
            seterrmsg('Confirm that you have agreed to our terms')
            navigator.vibrate(200)
            menu_icon.classList.add("errpop");
            setload(false)
        }
        if(!agree){
            return func()
        }

        const func1 =()=>{
            dispatch(
                seterrs({
                 msg: 'Insufficient Investment Funds'
                })
            )
            seterrmsg('Insufficient Investment Funds')
            navigator.vibrate(200)
            menu_icon.classList.add("errpop");
            setload(false)
        }
        if(info?.info?.balance < getItem?.min){
            return func1()
        }

    
        
        const today = new Date();
        const YearsLater = new Date(today);
        YearsLater.setFullYear(YearsLater.getFullYear() + 3);

        const balance = info?.info?.balance - getItem?.min
        setload(true)

        try {
            const value ={
                amount: getItem?.min,
                property_name: getItem?.name,
                user_id: id,
                start_date: today,
                end_date: YearsLater,
                balance: balance,
                class: getItem?.class,
                email: info?.info?.email,
            }
            const res = await axios.post('https://reit.smartledgerassist.com/reit-server/investment.php', value)
            // console.log(res);
            
            if(res?.data?.status === 'success'){
                setload(false)
                dispatch(
                    seterrs({
                    msg: res?.data?.message
                    })
                )
                menu_icon.classList.add("succpop");
                
                dispatch(
                    setreloads({
                    load: reload?.load + 1
                    })
                )

            }else{
                setload(false)
            
                dispatch(
                    seterrs({
                    msg: res?.data?.message
                    })
                )
                navigator.vibrate(200)
                menu_icon.classList.add("errpop");
            }
        } catch (error) {
            setload(false)
            dispatch(
            seterrs({
                msg: error?.message
            })
            )
            navigator.vibrate(200)
            menu_icon.classList.add("errpop");
        }
    }
    
  return ( 
    <div className='dashboard_container' >
        
            <SideBar />
        <div className='dashboard_container_'>
            <Header name={name}/>

            <div className='projects_display_banner' >
                <div className='projects_display_banner_'>
                    <img src={getItem?.img} alt='' />
                    <div className='projects_display_banner_boxes'>
                        <div>
                            <h4>Total Project Value</h4>
                            <h3 style={{color:'green'}} >${getItem?.total?.toLocaleString('en-US')}</h3>
                        </div>
                        <div>
                            <h4>Plan Duration</h4>
                            <h3>{getItem?.invest_period}</h3>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='class_box_dettails projects_display_banner_amt'>
                        <h3 style={{fontWeight:400}} >Project Amount</h3>
                        <p style={{fontSize:'25px', color:'green'}}>${getItem?.min?.toLocaleString('en-US')}</p>
                    </div>

                    <div className='contact_form_input_agree' >
                        <input checked={agree} onChange={()=>agree ? setagree(false) :setagree(true)} type='checkbox' />
                        <div>
                        I confirm that i have read and agree with the loan agreement.
                        </div>
                    </div>

                    
                    <div style={{height:'20px', width:'100%'}}></div>

                    <small style={{color:'red', margin:'10px 0'}}>{errmsg !== '' ? errmsg : null}</small>
                    
                    <div onClick={()=>!load ? handleDeposit() : {}} style={{backgroundColor:'#000', color:'#fff'}} className='deposit_container_wallets_btn' >
                      {
                        !load ?
                        <p>Invest Now</p>
                        :
                        <IosLoader/>
                      }
                    </div> 
                    
                    <div style={{height:'20px', width:'100%'}}></div>

                    <div className='proj_amount'>
                        <p>Your available funds:</p>
                        <h4>${Number(info?.info?.balance).toLocaleString('en-US')}</h4>
                    </div>

                    <div className='proj_details_' style={{padding:'0', width:'100%', margin:'20px 0'}} >
                        <h4 style={{marginBottom:'20px'}} >
                            {getItem?.name} {getItem?.head}
                        </h4>

                        <p style={{fontWeight:300}} >
                            Invest in {getItem?.name}, a professionally managed rental development offering income-producing shares.
                        </p>
                        <p style={{fontWeight:300}}>
                            Earn quarterly dividends from long-term tenents and property value appreciation.
                        </p>
                    </div>
                </div>
            </div>

            {/* <div className='pro_details' >
                <div>
                    <p>Interest Rate</p>
                    <h4>9.5%-11.5%</h4>
                </div>
                <div>
                    <p>Interest Rate</p>
                    <h4>9.5%-11.5%</h4>
                </div>
                <div>
                    <p>Interest Rate</p>
                    <h4>9.5%-11.5%</h4>
                </div>
                <div>
                    <p>Interest Rate</p>
                    <h4>9.5%-11.5%</h4>
                </div> 
            </div> */}

            <div className='proj_details___'>
                <div className='proj_details_' >
                    <h4>Target Yield</h4>
                    <h3 style={{fontSize:'25px'}} >{getItem?.yield}% Per Year</h3>
                </div>

                <div className='proj_details_' >
                    <h4>Total Yearly Return </h4>
                    <h3 style={{fontSize:'25px', color:'green'}} >${(getItem?.quaterly * getItem?.q).toLocaleString('en-US')}</h3>
                </div>
            </div>

            <div className='proj_details_s' >
                <h2>Project description</h2>
                <p>
                    {getItem?.desc1}
                </p>
                <h2>
                    {getItem?.desc2}
                </h2>
                <p>
                    {getItem?.desc3}
                </p>
                <p>
                    {getItem?.desc4}
                </p>
                <p>
                    {getItem?.desc5}
                </p>
                <p>
                    {getItem?.desc6}
                </p>
                <p>
                    {getItem?.desc7}
                </p>
                <p>
                    {getItem?.desc8}
                </p>
                <p>
                    {getItem?.desc9}
                </p>
                <h2>
                    {getItem?.desc10}
                </h2>
                <p>
                    {getItem?.desc11}
                </p>
                <p>
                    {getItem?.desc12}
                </p>
                <p>
                    {getItem?.desc13}
                </p>
                <h2>
                    {getItem?.desc14}
                </h2>
                <p>
                    {getItem?.desc15}
                </p>
                <p>
                    {getItem?.desc16}
                </p>
                <p>
                    {getItem?.desc17}
                </p>
                <p>
                    {getItem?.desc18}
                </p>
                <h2>
                    {getItem?.desc19}
                </h2>
                <h4 style={{marginTop:'10px'}} >
                    {getItem?.desc20}
                </h4>
                <p>
                    {getItem?.desc21}
                </p>
                <p>
                    {getItem?.desc22}
                </p>
                <h3>
                    {getItem?.desc23}
                </h3>
                <p>
                    {getItem?.desc24}
                </p>
                <h3>
                    {getItem?.desc25}
                </h3>
                <p>
                    {getItem?.desc26}
                </p>
                <p>
                    {getItem?.desc27}
                </p>
                <p>
                    {getItem?.desc28}
                </p>
                <h3>
                    {getItem?.desc29}
                </h3>
                <p>
                    {getItem?.desc30}
                </p>
                <p>
                    {getItem?.desc31}
                </p>
                <p>
                    {getItem?.desc32}
                </p>
                <p>
                    {getItem?.desc33}
                </p>
                <p>
                    {getItem?.desc34}
                </p>
                <h3>
                    {getItem?.desc35}
                </h3>
                <p>
                    {getItem?.desc36}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Projects
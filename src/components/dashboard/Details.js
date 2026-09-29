import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomNuteSelect from '../CustomNuteSelect'
import { useSelector } from 'react-redux'
import { selectinfo } from '../../features/infoSlice'
import CustomSelect from '../CustomSelect'
import CustomDetSelect from './CustomDetSelect'
import { useDispatch } from 'react-redux'
import IosLoader from '../IosLoader'
import { FaArrowRightLong } from 'react-icons/fa6'
import { seterrs } from '../../features/errSlice'
import axios from 'axios'
import { selectreload, setreloads } from '../../features/reloadSlice'
import countries from '../county'

function Details() {

  const info = useSelector(selectinfo)
  const reload = useSelector(selectreload)
    
  const handleNute =async(value)=>{
   localStorage.removeItem('user_id')
   window.location.reload()
  }

  
  const [fst, setfst] = useState(false)
  const [sec, setsec] = useState(false)
  const [trd, settrd] = useState(false)
  const [frt, setfrt] = useState(false)
  const [fif, setfif] = useState(false)
  const [six, setsix] = useState(false)
  const [sev, setsev] = useState(false)
  const [eit, seteit] = useState(false)
  const [nin, setnin] = useState(false)
  const [ten, setten] = useState(false)
  const [elv, setelv] = useState(false)

  const [first_name, setfirst_name] = useState('')
  const [last_name, setlast_name] = useState('')
  const [citizenship, setcitizenship] = useState('')
  const [dob, setdob] = useState('')
  const [gender, setgender] = useState('')
  const [country, setcountry] = useState('')
  const [city, setcity] = useState('')
  const [street, setstreet] = useState('')
  const [zip, setzip] = useState('')
  const [phone, setphone] = useState('')

  
  const [load, setload] = useState(false)

  const dispatch = useDispatch()

  const [check, setcheck] = useState(false)


  const handleComplete =async()=>{
    const func=()=>{
      dispatch(
          seterrs({
              msg: 'Enter all Fields'
          })
      )
      
      navigator.vibrate(200)
      const menu_icon = document.querySelector("#root")
      menu_icon.classList.add("errpop");
    }
    setcheck(true)
    if(first_name.trim() === '' || last_name.trim() === '' || citizenship.trim() === '' || dob.trim() === '' || gender.trim() === '' || country.trim() === '' || city.trim() === '' || street.trim() === '' || zip.trim() === '' || phone.trim() === ''){
      return func()
    }


    try {
      const value ={
        id: info?.info?.id,
        first_name,
        last_name,
        citizenship,
        dob,
        gender,
        country,
        city,
        street,
        zip,
        phone,
        email: info?.info?.email,
        referral:'--',
      }

      const res = await axios.post('https://reit.smartledgerassist.com/reit-server/updatedetails.php', value)
      console.log(res);
      
      if(res?.data?.status === 'success'){
        const menu_icon = document.querySelector("#root")
        menu_icon.classList.add("dropdown");

        dispatch(
          setreloads({
            load: reload?.load + 1
          })
        )
        
      }else{
        dispatch(
          seterrs({
            msg: res?.data?.message
          })
        )
        navigator.vibrate(200)
        const menu_icon = document.querySelector("#root")
        menu_icon.classList.add("errpop");
        setload(false)
  
      }

    } catch (error) {     
      console.log(error);
        
      dispatch(
        seterrs({
          msg: error?.message
        })
      )
      navigator.vibrate(200)
      const menu_icon = document.querySelector("#root")
      menu_icon.classList.add("errpop");
      setload(false)
    }
  }

  return (
    <div className='verify_otp'>
      <div className='signup_header' >
          <Link to={'/'} className='desk_header_logo' >
              <h3>월드크레스트 리츠</h3>
              <h3>WorldCrest (REIT)</h3>
          </Link>

          <CustomNuteSelect
              options={[
                  {label: 'LOG OUT' , value: 'out'},
              ]} 
              onChange={(value)=> handleNute(value)}
              placeholder={info?.info?.email}
          />
      </div>

        
      <div className='otp_container details' >
        <div className='otp_container_text' >
            <h1>Personal Information</h1>
        </div>

        
        <div style={first_name === '' && check ?{borderBottom:"2px solid red"} : {}} onFocus={()=>setfst(true)} onMouseLeave={()=> first_name.trim() === '' ? setfst(false) : setfst(true)} className={`contact_form_input_ ${fst && "contact_form_input__"}`}>
          <label>First Name</label>
          <input type='text' value={first_name} onChange={(e)=>[setfirst_name(e.target.value), setfst(true)]} />
        </div>
        
        <div style={last_name === '' && check ?{borderBottom:"2px solid red"} : {}} onFocus={()=>setsec(true)} onMouseLeave={()=> last_name.trim() === '' ? setsec(false) : setsec(true)} className={`contact_form_input_ ${sec && "contact_form_input__"}`}>
          <label>Last Name</label>
          <input type='te' value={last_name} onChange={(e)=>[setlast_name(e.target.value), setsec(true)]} />
        </div>
        
        <div style={citizenship === '' && check ?{borderBottom:"2px solid red"} : {}} onFocus={()=>settrd(true)} onMouseLeave={()=> citizenship.trim() === '' ? settrd(false) : settrd(true)} className={`contact_form_input_ ${trd && "contact_form_input__"}`}>          
          <CustomDetSelect
            options={
                countries?.map((item)=>(
                {value: item , label: item}
            ))} 
            onChange={(value)=> setcitizenship(value)}
            placeholder='Citizenship'
          />
        </div>
        
        <div style={dob === '' && check ?{borderBottom:"2px solid red"} : {}} onFocus={()=>setfrt(true)} onMouseLeave={()=> dob.trim() === '' ? setfrt(false) : setfrt(true)} className={`contact_form_input_ ${frt && "contact_form_input__"}`}>
          <label style={{position:'absolute', top:'2px', fontSize:'14px'}}>Date of Birth</label>
          <input type='date' value={dob} onChange={(e)=>[setdob(e.target.value), setfrt(true)]} />
        </div>
        
        <div style={gender === '' && check ?{borderBottom:"2px solid red"} : {}} onFocus={()=>setfif(true)} onMouseLeave={()=> gender.trim() === '' ? setfif(false) : setfif(true)} className={`contact_form_input_ ${fif && "contact_form_input__"}`}>
          <CustomDetSelect
              options={[
                  {value: 'male' , label: 'Male'},
                  {value: 'female' , label: 'Female'},
                  {value: 'other' , label: 'other'},
              ]} 
              onChange={(value)=> setgender(value)}
              placeholder='Gender'
          />
        </div>
        
        <div style={country === '' && check ?{borderBottom:"2px solid red"} : {}} onFocus={()=>setsix(true)} onMouseLeave={()=> country.trim() === '' ? setsix(false) : setsix(true)} className={`contact_form_input_ ${six && "contact_form_input__"}`}>
          <CustomDetSelect
              options={
                  countries?.map((item)=>(
                  {value: item , label: item}
              ))} 
              onChange={(value)=> setcountry(value)}
              placeholder='Country'
          />
        </div>
        
        <div style={city === '' && check ?{borderBottom:"2px solid red"} : {}} onFocus={()=>setsev(true)} onMouseLeave={()=> city.trim() === '' ? setsev(false) : setsev(true)} className={`contact_form_input_ ${sev && "contact_form_input__"}`}>
          <label>City</label>
          <input type='text' value={city} onChange={(e)=>[setcity(e.target.value), setsev(true)]} />
        </div>
        
        <div style={street === '' && check ?{borderBottom:"2px solid red"} : {}} onFocus={()=>seteit(true)} onMouseLeave={()=> street.trim() === '' ? seteit(false) : seteit(true)} className={`contact_form_input_ ${eit && "contact_form_input__"}`}>
          <label>Street & Apartment Number</label>
          <input type='text' value={street} onChange={(e)=>[setstreet(e.target.value), seteit(true)]} />
        </div>
        
        <div style={zip === '' && check ?{borderBottom:"2px solid red"} : {}} onFocus={()=>setnin(true)} onMouseLeave={()=> zip.trim() === '' ? setnin(false) : setnin(true)} className={`contact_form_input_ ${nin && "contact_form_input__"}`}>
          <label>Postal Code</label>
          <input type='text' value={zip} onChange={(e)=>[setzip(e.target.value), setnin(true)]} />
        </div>
        
        <div style={phone === '' && check ?{borderBottom:"2px solid red"} : {}} onFocus={()=>setten(true)} onMouseLeave={()=> phone.trim() === '' ? setten(false) : setten(true)} className={`contact_form_input_ ${ten && "contact_form_input__"}`}>
          <label>Mobile Phone Number</label>
          <input type='number' value={phone} onChange={(e)=>[setphone(e.target.value), setten(true)]} />
        </div>
        

        
        <div onClick={()=>!load && handleComplete()} style={{margin:'50px 0', justifyContent:'center'}} className='read_more_link'>
            <p style={{fontWeight:600, fontSize:'18px'}}>Continue</p>
            {
            load ?
            <IosLoader/>
            :
            <div className='read_more_link_'>
                <FaArrowRightLong size={25} />
            </div>
            }
        </div>

        <div style={{height:'300px', width:'100%', padding:'200px'}} ></div>
      </div>
    </div>
  )
}

export default Details
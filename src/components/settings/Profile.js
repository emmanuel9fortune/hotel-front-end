import React, { useEffect, useState } from 'react'
import CustomDetSelect from '../dashboard/CustomDetSelect'
import { MdCloud } from 'react-icons/md'
import axios from 'axios'
import { selectreload, setreloads } from '../../features/reloadSlice'
import { seterrs } from '../../features/errSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectinfo } from '../../features/infoSlice'
import { FaArrowLeft } from 'react-icons/fa6'
import countries from '../county'

function Profile({setcount}) {

    
    const info = useSelector(selectinfo)

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
    const [originalValues, setOriginalValues] = useState({})

    useEffect(()=>{
        const func =()=>{
            setOriginalValues(info?.info)
            setfirst_name(info?.info?.first_name)
            setlast_name(info?.info?.last_name)
            setcitizenship(info?.info?.citizenship)
            setdob(info?.info?.dob)
            setgender(info?.info?.gender)
            setcountry(info?.info?.country)
            setcity(info?.info?.city)
            setstreet(info?.info?.street)
            setzip(info?.info?.zip_code)
            setphone(info?.info?.phone)
        }
        func()
    },[info])

    
    const hasChanges = () => {
        const changes = {};

        if (first_name && first_name !== originalValues?.first_name) changes.first_name = first_name;
        if (last_name && last_name !== originalValues?.last_name) changes.last_name = last_name;
        if (citizenship && citizenship !== originalValues?.citizenship) changes.citizenship = citizenship;
        if (dob && dob !== originalValues?.dob) changes.dob = dob;
        if (gender && gender !== originalValues?.gender) changes.gender = gender;
        if (country && country !== originalValues?.country) changes.country = country;
        if (city && city !== originalValues?.city) changes.city = city;
        if (street && street !== originalValues?.expect_arrival) changes.street = street;
        if (zip && zip !== originalValues?.zip) changes.zip = zip;
        if (phone && phone !== originalValues?.phone) changes.phone = phone;

        return changes;
    };
    
    
    const changes = hasChanges()  
    const reload = useSelector(selectreload) 
    
    const [load, setload] = useState(false)

    const dispatch = useDispatch()
    
    const handleComplete =async()=>{

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
            referral: "",
        }

        const res = await axios.post('https://reit.smartledgerassist.com/reit-server/detailsupdate.php', value)

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
    <div className='settings_bar_container_' >
        <div className='settings_bar_container' >
            <div style={{width:'100%', height:'50px'}} ></div>
            <div onClick={()=> setcount(0)} style={{cursor:'pointer', width:'100%'}} className='project_name' >
                <FaArrowLeft size={25} />
                <h4 style={{textTransform:'capitalize', margin:'0 10px'}}>back</h4>
            </div>
            <div style={{width:'100%', height:'40px'}} ></div>

            <h3 style={{width: '100%'}}>Personal Details</h3>
            <div style={{width:'100%', height:'40px'}} ></div>
                
            <div style={{background:'#d8d8d8d0'}}  className={`contact_form_input_ contact_form_input__`}>
                <label style={{color:'#000'}}>First Name</label>
                <input type='text' value={first_name} onChange={(e)=>[setfirst_name(e.target.value)]} />
            </div>
            
            <div style={{background:'#d8d8d8d0'}} className={`contact_form_input_  contact_form_input__`}>
                <label style={{color:'#000'}}>Last Name</label>
                <input type='te' value={last_name} onChange={(e)=>[setlast_name(e.target.value)]} />
            </div>
                    
            <div style={{background:'#d8d8d8d0'}}  className={`contact_form_input_ "contact_form_input__`}>          
                <CustomDetSelect
                    options={
                        countries?.map((item)=>(
                        {value: item , label: item}
                    ))} 
                    onChange={(value)=> setcitizenship(value)}
                    placeholder='Citizenship'
                />
            </div>
            
            <div style={{background:'#d8d8d8d0'}} className={`contact_form_input_ contact_form_input__`}>
                <label style={{position:'absolute', top:'2px', fontSize:'14px'}}>Date of Birth</label>
                <input type='date' value={dob} onChange={(e)=>[setdob(e.target.value)]} />
            </div>
                    
            <div style={{background:'#d8d8d8d0'}} className={`contact_form_input_ contact_form_input__`}>
                <CustomDetSelect
                    options={[
                        {value: 'male' , label: 'Male'},
                        {value: 'female' , label: 'Female'},
                        {value: 'other' , label: 'other'},
                    ]} 
                    onChange={(value)=> setgender(value)}
                    placeholder={'Gender:' + "" + `${gender}`}
                />
            </div>
            
            <div style={{background:'#d8d8d8d0'}} className={`contact_form_input_ contact_form_input__`}>
                <CustomDetSelect
                    options={
                        countries?.map((item)=>(
                        {value: item , label: item}
                    ))} 
                    onChange={(value)=> setcountry(value)}
                    placeholder='Select Country'
                />
            </div>
                    
            <div style={{background:'#d8d8d8d0'}} className={`contact_form_input_ contact_form_input__`}>
                <label style={{color:'#000'}}>City</label>
                <input type='text' value={city} onChange={(e)=>[setcity(e.target.value)]} />
            </div>
            
            <div style={{background:'#d8d8d8d0'}} className={`contact_form_input_ contact_form_input__`}>
                <label style={{color:'#000'}}>Street & Apartment Number</label>
                <input type='text' value={street} onChange={(e)=>[setstreet(e.target.value)]} />
            </div>
            
            <div style={{background:'#d8d8d8d0'}} className={`contact_form_input_ contact_form_input__`}>
                <label style={{color:'#000'}}>Postal Code</label>
                <input type='text' value={zip} onChange={(e)=>[setzip(e.target.value)]} />
            </div>
            
            <div style={{background:'#d8d8d8d0'}} className={`contact_form_input_ contact_form_input__`}>
                <label style={{color:'#000'}}>Mobile Phone Number</label>
                <input type='number' value={phone} onChange={(e)=>[setphone(e.target.value)]} />
            </div>
            
            
            <div style={{width:'100%', height:'100px'}} ></div>
            {
                Object.keys(changes)?.length > 0 &&
                <div onClick={handleComplete} style={{cursor:'pointer'}} className='setting_logout_btn'>
                    <MdCloud size={20} />
                    <p>SAVE</p>
                </div>
            }


            <div style={{width:'100%', height:'200px'}} ></div>
        </div>
    </div>
  )
}

export default Profile
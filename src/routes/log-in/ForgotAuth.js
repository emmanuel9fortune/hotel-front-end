import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Head from '../../components/Navbar'
import { Link } from 'react-router-dom'
import { MdArrowBackIos } from 'react-icons/md'
import IosLoader from '../../components/IosLoader'
import { FaArrowRightLong } from 'react-icons/fa6'

function ForgetAuth() {

    const [email, setemail] = useState('')
    const [fst, setfst] = useState(false)
    const [load, setload] = useState(false)

    
    const request = email !== ''
    
    const handleSubmit =async()=>{
        setload(true)
        if(!request){
           return toast.error('PLEASE ENTER YOUR EMAIL')
        }

        try {
            const value ={
                email
            }
            const res = await axios.post('https://reit.smartledgerassist.com/reit-server/reset-password.php', value)
            setload(false)
            console.log(res);
            
            if(res.data.status === 'success'){
                toast.success('RESET EMAIL SENT SUCCESSFULLY')
            }else{
                toast.error(res.data.email_status)
            }
            
        } catch (error) {
            setload(false)
            console.log(error);
            toast.error('NETWORK ERROR')
        }
    }

  return (
    <div >
        <div className='signup_header' >
            <Link to={'/'} className='desk_header_logo' >
                <h3>월드크레스트 리츠</h3>
                <h3>WorldCrest (REIT)</h3>
            </Link>

            <div className='signup_header_'>
            
            </div>
        </div>


        
        <div className='contact_container signup_form' >
            <div className='contact_form'>
                <div className='contact_form_txt'>
                    <div onClick={()=> window.history.back()} style={{display:'flex', alignItems:'center', border:'none', width:'100%', justifyContent:'flex-start'}} className="profile">
                        <MdArrowBackIos size={23} />
                        <p>Go Back</p>
                    </div>
                    <h1>
                        Receive Password Reset Link
                    </h1>
                </div>
            
                <div className='contact_form_input_field'>     
                    
                    <div className='sign_up_form_hd' >
                        <h3>Forgot Password</h3>
                    </div>
                    
                    <div style={{width:'100%', height:'20px'}} ></div>
                    
                    <div onFocus={()=>setfst(true)} onMouseLeave={()=> email.trim() === '' ? setfst(false) : setfst(true)} className={`contact_form_input_ ${fst && "contact_form_input__"}`}>
                        <label>Enter Email Address</label>
                        <input type='email' value={email} onChange={(e)=>[setemail(e.target.value), setfst(true)]} />
                    </div>
                    

                    <div onClick={handleSubmit} style={{margin:'20px 0'}} className='read_more_link'>
                        <p style={{fontWeight:500, fontSize:'20px'}}>SEND RESET EMAIL</p>
                        {
                            load ?
                            <IosLoader/>
                            :
                            <div className='read_more_link_'>
                            <FaArrowRightLong size={25} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgetAuth
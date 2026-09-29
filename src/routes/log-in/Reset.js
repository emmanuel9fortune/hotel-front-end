import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { MdArrowBackIos, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { toast } from 'react-toastify'
import Head from '../../components/Navbar'
import IosLoader from '../../components/IosLoader'
import { FaArrowRightLong } from 'react-icons/fa6'

function Reset() {

    const {email} = useParams()
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const [fst, setfst] = useState(false)
    const [sec, setsec] = useState(false)
      const [load, setload] = useState(false)
    
    const verifyPassword = password === cpassword
    
    const handleSubmit =async()=>{
        if(!verifyPassword){
           return toast.error('PASSWORD MISMATCHED')
        }
        setload(true)

        try {
            const value ={
                password,
                email
            }
            const res = await axios.post('https://reit.smartledgerassist.com/reit-server/new-password.php', value)
            
            setload(false)
            if(res.data.status === 'success'){
                toast.success('PASSWORD RESET SUCCESSFULLY')
            }else{
                toast.error(res.data.message)
            }
            
        } catch (error) {
            setload(false)
            console.log(error);
            toast.error('NETWORK ERROR')
        }
    }
    
        
    const [vis, setvis] = useState(false)
    const [vis2, setvis2] = useState(false)

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
                        Reset your password
                    </h1>
                </div>
                    
                        
                <div className='contact_form_input_field'>                    
                    <div onFocus={()=>setfst(true)} onMouseLeave={()=> password.trim() === '' ?  setfst(false) : setfst(true)} className={`contact_form_input_ ${fst && "contact_form_input__"}`}>
                        <label>Create Password</label>
                        <input  type={!vis ? 'password' : 'text'}  value={password} onChange={(e)=>[setpassword(e.target.value), setfst(true)]}  />
                        <div onClick={()=> vis ? setvis(false) : setvis(true)} style={{position:'absolute', right:'10px', top: '30%', width:'30px', height:'20px', cursor:'pointer', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            {
                                vis ?
                                <MdVisibilityOff  size={25} />
                                :
                                <MdVisibility  size={25} />
                            }
                        </div>
                    </div>
                    
                    
                    <div onFocus={()=>setsec(true)} onMouseLeave={()=> cpassword.trim() === '' ?  setsec(false) : setsec(true)} className={`contact_form_input_ ${sec && "contact_form_input__"}`}>
                        <label>Confirm Password</label>
                        <input  type={!vis2 ? 'password' : 'text'}  value={cpassword} onChange={(e)=>[setcpassword(e.target.value), setsec(true)]}  />
                        <div onClick={()=> vis2 ? setvis2(false) : setvis2(true)} style={{position:'absolute', right:'10px', top: '30%', width:'30px', height:'20px', cursor:'pointer', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            {
                                vis2 ?
                                <MdVisibilityOff  size={25} />
                                :
                                <MdVisibility  size={25} />
                            }
                        </div>
                    </div>
                    

                    <div onClick={handleSubmit} style={{margin:'20px 0'}} className='read_more_link'>
                        <p style={{fontWeight:500, fontSize:'20px'}}>RESET PASSWORD</p>
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

export default Reset
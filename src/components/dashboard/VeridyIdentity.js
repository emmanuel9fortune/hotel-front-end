import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomNuteSelect from '../CustomNuteSelect'
import { useSelector } from 'react-redux'
import { selectinfo } from '../../features/infoSlice'
import { selectreload, setreloads } from '../../features/reloadSlice'
import { FaArrowRightLong, FaIdCard } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { seterrs } from '../../features/errSlice'
import { MdPerson } from 'react-icons/md'
import IosLoader from '../IosLoader'
import imageCompression from "browser-image-compression"

function VeridyIdentity() {
    
  const info = useSelector(selectinfo)
  const reload = useSelector(selectreload)

  const id = info?.info?.id
    
  const handleNute =async(value)=>{
   localStorage.removeItem('user_id')
   window.location.reload()
  }

  
  const [load, setload] = useState(false)

  const dispatch = useDispatch()

  const handleSkip =async()=>{
    try {
        const res = await axios.post('https://reit.smartledgerassist.com/reit-server/updateskip.php', {id: info?.info?.id})

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

  const [verify, setverify] = useState(0)
  const [imgs1, setimgs1] = useState(null)
  const [imgs2, setimgs2] = useState(null)
  const [imgs3, setimgs3] = useState(null)
  const [img1, setimg1] = useState(null)
  const [img2, setimg2] = useState(null)
  const [img3, setimg3] = useState(null)
  
  const [running, setRunning] = useState(false);

  const handleImageChange1 = async (e) => {
    const options = {
      maxSizeMB: 0.5,      
      maxWidthOrHeight: 1024, 
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(imgs1, options);
      const compressedFile = new File(
        [compressedBlob],
        imgs1.name,
        { type: compressedBlob.type }
      );
      setimg1(compressedFile);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange2 = async () => {
    const options = {
      maxSizeMB: 0.5,      
      maxWidthOrHeight: 1024, 
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(imgs2, options);
       const compressedFile = new File(
        [compressedBlob],
        imgs2.name,
        { type: compressedBlob.type }
      );
      setimg2(compressedFile);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange3 = async (e) => {
    const imgs3 = e.target.files[0]
    setimgs3(imgs3)
    const options = {
      maxSizeMB: 0.5,      
      maxWidthOrHeight: 1024, 
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(imgs3, options);
      const compressedFile = new File(
        [compressedBlob],
        imgs3.name,
        { type: compressedBlob.type }
      );
      setimg3(compressedFile);
    } catch (error) {
      console.error(error);
    }
  };



  const handleVerification = async () => {
    setload(true)
    const formData = new FormData();
    formData.append("data", JSON.stringify({ id }));
    formData.append("image1", img1);
    formData.append("image2", img2);
    formData.append("image3", img3);

    setRunning(true)

    try {
      const res = await axios.post(
        "https://reit.smartledgerassist.com/reit-server/verifyid.php",
        formData
      );

      if (res?.data?.status === "success") {
        document.querySelector("#root").classList.add("dropdown");
        window.location.reload();
        
        setload(false)
        setRunning(false)
      } else {
        dispatch(seterrs({ msg: res?.data?.message }));
        navigator.vibrate(200);
        document.querySelector("#root").classList.add("errpop");
        setload(false);
        setRunning(false);
      }
    } catch (error) {
      dispatch(seterrs({ msg: error.message }));
      navigator.vibrate(200);
      document.querySelector("#root").classList.add("errpop");
      setload(false);
      setRunning(false);
    }
  };

  const sentences = [
    "UPLOADING DOCUMENTS...",
    "VERIFYING DOCUMENTS...",
    "SUCCESS"
  ];

  const [text, setText] = useState(sentences[0]);

  useEffect(() => {
    if (!running) return;

    let step = 0;

    const interval = setInterval(() => {
      // Random flicker between available sentences
      const randomIndex = Math.floor(Math.random() * sentences.length);
      setText(sentences[randomIndex]);

      step++;

      // Stop at 3rd sentence
      if (step >= 5) {
        clearInterval(interval);
        setText(sentences[2]);
        setRunning(false);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [running]);

  const handleClick = () => {
    setText(sentences[0]); // start from first
    setRunning(true);
  };


  return ( 
    <>
      <div className='verify_otp' >
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
          
          
          {
            verify === 4 &&
            <div className='otp_container details verify'  style={{height:'700px', padding:'0 2%'}}>
              <div style={{margin:'20px 0'}}></div>

              <h2>Confirm your identity</h2>
              <p style={{fontSize:'18px', marginTop:'10px', color:'grey'}} >Upload a portrate picture of your self </p>
              
              <div style={{margin:'20px 0'}}></div>

              <input type='file' onChange={handleImageChange3} accept='image/*' id='file3' style={{display:'none'}} />
              <label htmlFor='file3' className='verify_photo_' >
                {
                  imgs3 ?
                  <img src={URL.createObjectURL(imgs3)} />
                  :
                  <img src='/assets/usp.png' />
                }
                <p className='verify_photo_p'>Click to select photo</p>
              </label>

              
              <div style={{margin:'20px 0'}}></div>
              <div className='verify_btns'>
                  <div className='read_more_link'></div>

                  <div className='read_more_link' style={{width:'100%'}} onClick={()=> { 
                       if(imgs3){
                        handleVerification()
                      }else{
                        dispatch(
                          seterrs({
                            msg: 'Select a photo to continue'
                          })
                        )
                        navigator.vibrate(200)
                        const menu_icon = document.querySelector("#root")
                        menu_icon.classList.add("errpop");
                      }
                  }} >
                     
                      {
                        load ?
                        <p style={{fontWeight:600, fontSize:'18px'}}>{text}</p>
                        :
                        <p style={{fontWeight:600, fontSize:'18px'}}>Verify Identity</p>
                      }
                      
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
          }
          
          {
            verify === 3 &&
            <div className='otp_container details verify'  style={{height:'700px', padding:'0 2%'}}>
              <div style={{margin:'20px 0'}}></div>

              <h2>Confirm your identity</h2>
              <h3 style={{fontSize:'18px', marginTop:'10px', color:'grey'}} >Upload a picture of the Back of your id card or drivers license</h3>
              
              <div style={{margin:'20px 0'}}></div>

              <input type='file' onChange={(e)=> setimgs2(e.target.files[0])} accept='image/*' id='file2' style={{display:'none'}} />
              <label htmlFor='file2' className='verify_photo_' >
                {
                  imgs2 ?
                  <img src={URL.createObjectURL(imgs2)} />
                  :
                  <img src='/assets/bid.png' />
                }
                <p className='verify_photo_p'>Click to select photo</p>
              </label>

              
              <div style={{margin:'20px 0'}}></div>
              <div className='verify_btns'>
                  <div className='read_more_link'></div>

                  <div className='read_more_link' onClick={()=> { 
                     if(imgs2){
                        handleImageChange2()
                        setverify(4)
                      }else{
                        dispatch(
                          seterrs({
                            msg: 'Select a photo to continue'
                          })
                        )
                        navigator.vibrate(200)
                        const menu_icon = document.querySelector("#root")
                        menu_icon.classList.add("errpop");
                      }
                  }} >
                      <p style={{fontWeight:600, fontSize:'18px'}}>Continue</p>
                      
                      <div className='read_more_link_'>
                          <FaArrowRightLong size={25} />
                      </div>
                  </div>

              </div>
              
            </div>
          }
          
          {
            verify === 2 &&
            <div className='otp_container details verify'  style={{height:'700px', padding:'0 2%'}}>
              <div style={{margin:'20px 0'}}></div>

              <h2>Confirm your identity</h2>
              <h3 style={{fontSize:'18px', marginTop:'10px', color:'grey'}} >Upload a picture of the front of your id card or drivers license </h3>
              
              <div style={{margin:'20px 0'}}></div>

              <input type='file' onChange={(e)=> setimgs1(e.target.files[0])} accept='image/*' id='file1' style={{display:'none'}} />
              <label htmlFor='file1' className='verify_photo_' >
                {
                  imgs1 ?
                  <img src={URL.createObjectURL(imgs1)} />
                  :
                  <img src='/assets/fid.png' />
                }
                <p className='verify_photo_p'>Click to select photo</p>
              </label>

              
              <div style={{margin:'20px 0'}}></div>
              <div className='verify_btns'>
                  <div className='read_more_link'></div>

                  <div className='read_more_link' onClick={()=>{ 
                      if(imgs1){
                        handleImageChange1()
                        setverify(3)
                      }else{
                        dispatch(
                          seterrs({
                            msg: 'Select a photo to continue'
                          })
                        )
                        navigator.vibrate(200)
                        const menu_icon = document.querySelector("#root")
                        menu_icon.classList.add("errpop");
                      }
                  }} >
                      <p style={{fontWeight:600, fontSize:'18px'}}>Continue</p>
                      
                      <div className='read_more_link_'>
                          <FaArrowRightLong size={25} />
                      </div>
                  </div>

              </div>
              
            </div>
          }
          
          {
            verify === 1 &&
            <div className='otp_container details verify' >
              <div style={{margin:'20px 0'}}></div>

              <h2>Lets get you verified</h2>
              
              <div style={{margin:'20px 0'}}></div>

              <div className='verification_options'>
                <FaIdCard size={35} color='grey' />
                <div>
                  <h4>Prepare a valid document</h4>
                  <p style={{color:'grey'}}>Make sure it is not expired or physically damaged</p>
                </div>
              </div>
              
              <div style={{margin:'10px 0'}}></div>

              <div className='verification_options'>
                <MdPerson size={35} color='grey' />
                <div>
                  <h4>Upload a Photo OF your self</h4>
                  <p style={{color:'grey'}}>Take a portrate picture of yourself </p>
                </div>
              </div>

              
              <div style={{margin:'20px 0'}}></div>
              <div className='verify_btns'>
                  <div className='read_more_link' onClick={()=> setverify(2)} >
                      <p style={{fontWeight:600, fontSize:'18px'}}>Continue</p>
                      
                      <div className='read_more_link_'>
                          <FaArrowRightLong size={25} />
                      </div>
                  </div>

                  <div className='read_more_link' onClick={handleSkip}>
                      <p style={{fontWeight:600, fontSize:'18px', color:'goldenrod'}}>Skip for now</p>
                  </div>
              </div>
            </div>
          }

          {
            verify === 0 &&
            <div className='otp_container details verify' >
                <div className='otp_container_text1' >
                    <h1>Welcome! Now let's verify your identity</h1>
                    <p>We accept Passport and Natinal ID as supported document Types.</p>
                </div>

                
                <div className='verify_btns'>
                    <div className='read_more_link' onClick={()=> setverify(1)} >
                        <p style={{fontWeight:600, fontSize:'18px'}}>Continue</p>
                        
                        <div className='read_more_link_'>
                            <FaArrowRightLong size={25} />
                        </div>
                    </div>

                    <div className='read_more_link' onClick={handleSkip}>
                        <p style={{fontWeight:600, fontSize:'18px', color:'goldenrod'}}>Skip for now</p>
                    </div>
                </div>

                <p style={{fontSize:'13px', marginTop:'50px', width:'100%', fontWeight:500, color:'grey'}}>
                    Fast and secure online identity verification service. Requires webcam or phone camera access and identification document
                </p>
            </div>
          }

          
      </div>
      <div style={{margin:'100px 0'}}></div>
    </>
  )
}

export default VeridyIdentity
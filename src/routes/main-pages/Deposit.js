import React, { useState } from 'react'
import WorldcrestBackground from '../../components/Background'
import SideBar from '../../components/dashboard/SideBar'
import Header from '../../components/dashboard/Header'
import { FaCopy } from 'react-icons/fa6'
import { MdDoneOutline, MdWarning } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { selectinfo } from '../../features/infoSlice'
import { selectreload } from '../../features/reloadSlice'
import { useDispatch } from 'react-redux'
import { seterrs } from '../../features/errSlice'
import axios from 'axios'
import IosLoader from '../../components/IosLoader'

function Deposit() {
  
  const [fst, setfst] = useState(false)
  const info = useSelector(selectinfo)
  const id = info?.info?.id 

  const [fst_txt, setfst_txt] = useState('')
  const [type, settype] = useState('USDT')
  const [load, setload] = useState(false)
  
  const dispatch = useDispatch()
  const menu_icon = document.querySelector("#root")
  
  const handleDeposit = async () => {

    const showError = (msg) => {
      dispatch(seterrs({ msg }))
      if (navigator.vibrate) navigator.vibrate(200)
      menu_icon.classList.add("errpop")
      setload(false)
    }

    const amount = Number(fst_txt.replace(/,/g, "").trim())

    // ---- VALIDATION FIRST ----
    if (fst_txt.trim() === '' || isNaN(amount)) {
      return showError('Enter Deposit Amount')
    }

    if (amount < 5002.9) {
      return showError('Minimum Deposit is $5,002.9')
    }

    // ---- START LOADING AFTER VALIDATION ----
    setload(true)

    try {
      const res = await axios.post(
        'https://reit.smartledgerassist.com/reit-server/deposit.php',
        {
          amount,
          type,
          user_id: id
        }
      )

      if (res?.data?.status === 'success') {
        dispatch(seterrs({ msg: res.data.message }))
        menu_icon.classList.add("succpop")
        setload(false)
      } else {
        showError(res?.data?.message || 'Deposit failed')
      }

    } catch (error) {
      showError(
        error?.response?.data?.message ||
        error?.message ||
        'Network error'
      )
    }
  }


   
  function copyText(text) {
      // Modern method (works on modern browsers + mobile)
      if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text)
              .then(() => {
                
                dispatch(
                  seterrs({
                    msg: 'Address Copied !!'
                  })
                )
                const menu_icon = document.querySelector("#root")
                menu_icon.classList.add("succpop");

              })
              .catch(() => fallbackCopy(text));
          return;
      }

        fallbackCopy(text);
  }

  function fallbackCopy(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;

      textarea.style.position = "fixed";
      textarea.style.top = "-999px";
      textarea.style.left = "-999px";

      document.body.appendChild(textarea);
      textarea.select();

      try {
          document.execCommand("copy");
          dispatch(
            seterrs({
              msg: 'Address Copied !!'
            })
          )
          const menu_icon = document.querySelector("#root")
          menu_icon.classList.add("succpop");
      } catch (err) {
          console.error("Copy failed", err);
      }

      document.body.removeChild(textarea);
  }


  return (
    <div className='dashboard_container' >
        <SideBar />
        <div className='dashboard_container_'>
            <Header dep={true}/>

            <div className='proj_details_ proj_det_' style={{margin:'5px 0', fontSize:'16px'}} >
                <h4 style={{color:'#3c3c3c'}} >
                  Fund your account securely with crypto currency
                </h4>
                <p style={{fontWeight:300}}>
                  Add crypto to your account to invest in premium real estate opportunities. All deposits are processed using secure and encrypted channels to ensure your funds are safe.
                </p>
            </div>

            <div className='deposit_container' >
              <div className='deposit_container_' >
                

                <div className='proj_details_ proj_det_' style={{margin:'5px 0', fontSize:'16px', padding:0}} >
                    <h4 style={{color:'#3c3c3c'}}  >
                      Deposit Method
                    </h4>
                    <p style={{fontWeight:300}}>
                      Cryptocurrency you should make use of:
                    </p>
                </div>

                <div className='deposit_container_wallets'>
                  <div style={{backgroundColor:'#000', color:'#fff'}} onClick={()=>settype('USDT')} >
                    <img style={{borderRadius:'50%'}} src='/assets/usdt.jfif' alt='' />
                    <p>USDT</p>
                    -
                    <p>BNB Smart Chain</p>
                  </div>
                </div>
                
                <div className='proj_details_ proj_det_' style={{margin:'5px 0', fontSize:'16px', padding:0}} >
                    <h4 style={{color:'#3c3c3c'}}  >
                      Enter Deposit Amount
                    </h4>
                </div>

                <div style={{marginBottom:'20px'}} onFocus={()=>setfst(true)} onMouseLeave={()=> fst_txt.trim() === '' ? setfst(false) : setfst(true)} className={`contact_form_input_ ${fst && "contact_form_input__"}`}>
                  <label>Enter Amount in Crypto Currency</label>
                  <input inputMode='numeric' style={{fontSize:'25px'}} type='text' value={fst_txt} onChange={(e)=>{
                    let raw = e.target.value.replace(/,/g, "")

                    setfst_txt(Number(raw).toLocaleString('en-US')); 
                    setfst(true)
                  }} />
                </div>

                <small>Minimum deposit is $5,002.9</small>

              </div>


              <div>
                <div className='proj_details_ proj_det_' style={{margin:'35px 0 10px 0', fontSize:'16px'}} >
                  <h3 style={{color:'#3c3c3c'}}  >Deposit Details</h3>
                  <h4 style={{marginTop:'10px', fontWeight:300}} >WorldCrest REIT Investment Ltd</h4>
                </div>
                <div className='deposit_wallet_display' >
                  <img src='/assets/usdqr.jpg' alt='' />
                  <div className='deposit_wallet_display_txt'>
                    <div className='deposit_wallet_display_txt_1'>
                      <p style={{fontWeight:600}} className='wallet_address'>0x22c0B88375Ac21ef8230914E293700F592086eac</p>
                      <div onClick={()=>copyText('0x22c0B88375Ac21ef8230914E293700F592086eac')}>
                        <p>Copy</p>
                        <FaCopy size={23} />
                      </div>
                    </div>

                    <div className='deposit_wallet_display_txt_' ></div>

                    <div className='deposit_wallet_display_txt_1' style={{display:'flex', justifyContent:'flex-start'}}>
                      <FaCopy size={23} />
                      <p style={{margin:'0 10px'}} >Copy or Scan the QR code to make your deposit</p>
                    </div>

                    <div style={{margin:'10px 0', backgroundColor:'#ffc54863', padding:'10px'}} className='deposit_wallet_display_txt_1' >
                      <MdWarning size={40} color='orange' />
                      <p style={{margin:'0 10px', fontSize:'14px'}}>Only send USDT BNB Smart Chain to this deposit address. Sending other cryptocurrencies may result in loss of funds.</p>
                    </div>
                    
                    <div onClick={()=>!load ? handleDeposit() :{}} style={{backgroundColor:'#000', color:'#fff'}} className='deposit_container_wallets_btn' >
                      {
                        !load ?
                        <p>Confirm Deposit</p>
                        :
                        <IosLoader/>
                      }
                    </div>            
                  </div>
                </div>
              </div>
            </div>

            <h2 style={{width:'100%', padding:'0 5%'}} >How to Deposit Cryptocurrency on Worldcrest</h2>
            <div className='proj_details_ proj_det_' style={{margin:'35px 0 10px 0', fontSize:'16px'}} >
                <h4 style={{color:'#3c3c3c'}}  >1. Cryptocurrency</h4>
                <p style={{fontWeight:300}} >
                  The deposit asset is USDT, which is set as the default and only supported option.
                </p>
            </div>
            <div className='proj_details_ proj_det_' style={{margin:'5px 0', fontSize:'16px'}} >
                <h4 style={{color:'#3c3c3c'}}  >2. Enter the Deposit Amount</h4>
                <p style={{fontWeight:300}} >
                  Input the amount you wish to transfer in the selected cryptocurrency.                
                </p>
            </div>
            <div className='proj_details_ proj_det_' style={{margin:'5px 0', fontSize:'16px'}} >
                <h4 style={{color:'#3c3c3c'}}  >3. Copy the Wallet Address or Scan the QR Code.</h4>
                <p style={{fontWeight:300}} >
                  Use the copy button or scan the QR code with your crypto wallet app.
                </p>
            </div>
            <div className='proj_details_ proj_det_' style={{margin:'5px 0', fontSize:'16px'}} >
                <h4 style={{color:'#3c3c3c'}}  >4. Send Funds</h4>
                <p style={{fontWeight:300}} >
                  From your personal wallet, exchange, or bank, send the exact amount to the displayed payment details. Please ensure the transfer is made using the provided information to avoid delays or lost of funds.
                </p>
            </div>
            <div className='proj_details_ proj_det_' style={{margin:'5px 0', fontSize:'16px'}} >
                <h4 style={{color:'#3c3c3c'}}  >5. Wait for Network Confirmation</h4>
                <p style={{fontWeight:300}} >
                  Click on confirm button and Your deposit will be credited automatically once the blockchain confirms the transaction.
                </p>
            </div>
            <div className='proj_details_ proj_det_' style={{margin:'5px 0', fontSize:'16px'}} >
                <h4 style={{color:'#3c3c3c'}}  >6. Check Your Balance</h4>
                <p style={{fontWeight:300}} >
                  After confirmation, your updated balance will appear in your Worldcrest dashboard.
                </p>
            </div>
            

            <div className='proj_details_ proj_det_' style={{margin:'5px 0', fontSize:'16px', borderTop:'2px solid grey', padding:'50px 5%'}} >
                <h4 style={{color:'#3c3c3c'}}  >Important Notes</h4>
                <p style={{fontWeight:300}} >
                  •Sending the wrong cryptocurrency may result in permanent loss.
                </p>
                <p style={{fontWeight:300}} >
                  •Processing time depends on the blockchain network.
                </p>
                <p style={{fontWeight:300}} >
                  •Worldcrest does not charge deposit fees; standard network fees may apply.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Deposit
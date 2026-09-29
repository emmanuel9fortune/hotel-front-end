import { useEffect, useState } from "react"
import SideBar from "../../components/dashboard/SideBar"
import Header from "../../components/dashboard/Header"
import { MdWarning } from "react-icons/md"
import { useDispatch } from "react-redux"
import { seterrs } from "../../features/errSlice"
import { useSelector } from "react-redux"
import { selectinfo } from "../../features/infoSlice"
import axios from "axios"
import IosLoader from "../../components/IosLoader"


function Withdrawals() {
  const [fst, setfst] = useState(false)
  const [sec, setsec] = useState(false)

  const [fst_txt, setfst_txt] = useState('')
  const [sec_txt, setsec_txt] = useState('')
  const [type, settype] = useState('')

  const info = useSelector(selectinfo)
  const id = info?.info?.id 

  const [load, setload] = useState(false)
  
  const dispatch = useDispatch()

  const [crp, setcrp] = useState('')

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en'
    
  useEffect(()=>{
      axios.get(url).then((reponse)=>{
          reponse.data?.map((cn)=>(
            type.toLowerCase() === cn?.symbol ?
                  setcrp(cn?.current_price)
                : null
            ))
      })
  },[type])


  const handleWithdraw =async()=>{
      const func =()=>{
          dispatch(
            seterrs({
              msg: 'Enter All Field'
            })
          )
          navigator.vibrate(200)
          const menu_icon = document.querySelector("#root")
          menu_icon.classList.add("errpop");
      }
      if(Number(fst_txt.replace(/,/g,"")) === '' || sec_txt === '' || type === '' ){
        return func()
      }

      const func1 =()=>{
        dispatch(
          seterrs({
            msg: 'Insufficient Balance'
          })
        )
        navigator.vibrate(200)
        const menu_icon = document.querySelector("#root")
        menu_icon.classList.add("errpop");
      }

      if(info?.info?.balance < Number(fst_txt.replace(/,/g,""))){
        return func1()
      }

    
      const func2 =()=>{
          dispatch(
              seterrs({
                msg: 'Identity Verification in Progress'
              })
          )
          navigator.vibrate(200)
          const menu_icon = document.querySelector("#root")
          menu_icon.classList.add("errpop");
      }
      if(info?.info?.verified_id === 'PENDING' && info?.info?.face_img){
          return func2()
      }

      const func3 =()=>{
          dispatch(
              seterrs({
                msg: 'Verify your identity'
              })
          )
          navigator.vibrate(200)
          const menu_icon = document.querySelector("#root")
          menu_icon.classList.add("errpop");
      }
      if(info?.info?.verified_id === 'PENDING' || info?.info?.verified_id === 'DECLINED'){
          return func3()
      }
    
      setload(true)

    try {
      const value ={
        amount: Number(fst_txt.replace(/,/g,"")),
        type,
        user_id: id,
        address: sec_txt
      }
      
      const res = await axios.post('https://reit.smartledgerassist.com/reit-server/withdraw.php', value)
      console.log(res);
      
      if(res?.data?.status === 'success'){
        dispatch(
          seterrs({
            msg: res?.data?.message
          })
        )
        const menu_icon = document.querySelector("#root")
        menu_icon.classList.add("succpop");
        setload(false)
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
      console.log(error);
      
    }
  }

  return (
    <div className='dashboard_container' >
        <SideBar />
        <div className='dashboard_container_'>
            <Header wit={true}/>

            <div className='deposit_container' >
              <div className='deposit_wallet_display' style={{display:'flex', flexDirection:'column'}}  >
                <div className='proj_details_ proj_det_1' style={{margin:'5px 0', fontSize:'16px', padding:0}} >
                  <h4 style={{color:'#3c3c3c'}}  >Securely withdraw funds to your crypto wallet</h4>
                  <p style={{fontWeight:300}} >
                    Withdraw your funds safely and quickly using secure cryptocurrency transfers. All withdrawals are processed using secure and encrypted channels to ensure your funds are safe.
                  </p>
                </div>

                
                <div style={{margin:'10px 0', backgroundColor:'#ffc54863', padding:'10px'}} className='deposit_wallet_display_txt_1' >
                  <MdWarning size={40} color='orange' />
                  <p style={{margin:'0 10px', fontSize:'14px'}}>
                    Tip: Double-check the wallet address before submitting your request to avoid loss of funds.
                  </p>
                </div>

                <h2 style={{width:'100%', padding:'0'}} >How to Withdraw Funds in Cryptocurrency from Worldcrest</h2>
                <div className='proj_details_ proj_det_1' style={{margin:'35px 0 10px 0', fontSize:'16px', padding:0}} >
                    <h4 style={{color:'#3c3c3c'}}  >1. Choose Your Cryptocurrency</h4>
                    <p style={{fontWeight:300}} >
                      Select the asset you want to withdraw: Bitcoin (BTC), Ethereum (ETH), or USDT.
                    </p>
                </div>
                <div className='proj_details_ proj_det_1' style={{margin:'5px 0', fontSize:'16px', padding:0}} >
                    <h4 style={{color:'#3c3c3c'}}  >2. Enter the Withdrawal Amount</h4>
                    <p style={{fontWeight:300}} >
                      Input the amount you wish to withdraw from your available balance.               
                    </p>
                </div>
                <div className='proj_details_ proj_det_1' style={{margin:'5px 0', fontSize:'16px', padding:0}} >
                    <h4 style={{color:'#3c3c3c'}}  >3. Provide Your Wallet Address</h4>
                    <p style={{fontWeight:300}} >
                      Paste your personal wallet address for the selected cryptocurrency. Ensure the address matches the chosen asset and network.               
                    </p>
                </div>
                <div className='proj_details_ proj_det_1' style={{margin:'5px 0', fontSize:'16px', padding:0}} >
                    <h4 style={{color:'#3c3c3c'}}  >4. Review Withdrawal Details</h4>
                    <p style={{fontWeight:300}} >
                      Confirm the amount, wallet address, and applicable network fee before proceeding.
                    </p>
                </div>
                <div className='proj_details_ proj_det_1' style={{margin:'5px 0', fontSize:'16px', padding:0}} >
                    <h4 style={{color:'#3c3c3c'}}  >5. Submit Withdrawal Request</h4>
                    <p style={{fontWeight:300}} >
                      Click “Withdraw” to submit your request for processing.
                    </p>
                </div>
                <div className='proj_details_ proj_det_1' style={{margin:'5px 0', fontSize:'16px', padding:0}} >
                    <h4 style={{color:'#3c3c3c'}}  >6. Security Verification</h4>
                    <p style={{fontWeight:300}} >
                      Complete any required security checks to authorize the transaction.
                    </p>
                </div>
                <div className='proj_details_ proj_det_1' style={{margin:'5px 0', fontSize:'16px', padding:0}} >
                    <h4 style={{color:'#3c3c3c'}}  >7. Receive Funds in Your Wallet</h4>
                    <p style={{fontWeight:300}} >
                      Once processed and confirmed on the blockchain, the funds will arrive in your wallet.
                    </p>
                </div>

                <div className='proj_details_ proj_det_1' style={{margin:'5px 0', fontSize:'16px', borderTop:'2px solid grey', padding:'50px 5%'}} >
                    <h4 style={{color:'#3c3c3c'}}  >Important Notes</h4>
                    <p style={{fontWeight:300}} >
                      • Only withdraw to wallets you control.
                    </p>
                    <p style={{fontWeight:300}} >
                      • Incorrect wallet addresses or networks may result in permanent loss.
                    </p>
                    <p style={{fontWeight:300}} >
                      • Processing time depends on blockchain network activity.
                    </p>
                    <p style={{fontWeight:300}} >
                      • Network fees are deducted automatically
                    </p>
                </div>
              </div>


              <div className='deposit_container_' >
                
                <div className='proj_details_ proj_det_1' style={{margin:'5px 0', fontSize:'16px', padding:0}} >
                    <h4 style={{color:'#3c3c3c'}}  >
                      Withdrawal Method
                    </h4>
                    <p style={{fontWeight:300}}>
                      Select the cryptocurrency you would like to Withdraw into:
                    </p>
                </div>
                <div className='deposit_container_wallets'>
                  
                  <div  onClick={()=> settype('BTC')} style={type === 'BTC' ? {backgroundColor:'#000', color:'#fff'} : {}} >
                    <img src='/assets/btc.png' alt='' />
                    <p>BTC</p>
                  </div>
                  <div  onClick={()=> settype('ETH')} style={type === 'ETH' ? {backgroundColor:'#000', color:'#fff'} : {}} >
                    <img src='/assets/eth.png' alt='' />
                    <p>ETH</p>
                  </div>
                  <div  onClick={()=> settype('USDT')} style={type === 'USDT' ? {backgroundColor:'#000', color:'#fff'} : {}} >
                    <img src='/assets/usdt.png' alt='' />
                    <p>USDT</p>
                  </div>
                </div>

                
                <div className='proj_details_ proj_det_1' style={{margin:'5px 0', fontSize:'16px', padding:0}} >
                    <h4 style={{color:'#3c3c3c'}}  >
                      Enter Withdrawal Amount
                    </h4>
                </div>
                <div onFocus={()=>setfst(true)} onMouseLeave={()=> fst_txt.trim() === '' ? setfst(false) : setfst(true)} className={`contact_form_input_ ${fst && "contact_form_input__"}`}>
                  <label>Enter Amount in Crypto Currency</label>
                  <input style={{fontSize:'30px'}} type='text' inputMode='numeric' value={fst_txt} onChange={(e)=>{
                    let raw = e.target.value.replace(/,/g, "")

                    setfst_txt(Number(raw).toLocaleString('en-US')); 
                    setfst(true)
                  }} />
                </div>

                {
                  crp && fst_txt ?
                  <small>Amount in crypto <span style={{fontWeight:'20px', fontSize:'23px'}} > {(Number(fst_txt.replace(/,/g,""))/crp).toLocaleString('en-US')} {type}</span> </small>
                  : null
                }

                <div style={{margin:'20px 0'}} ></div>

                <div className='proj_details_ proj_det_1' style={{margin:'5px 0', fontSize:'16px', padding:0}} >
                    <h4 style={{color:'#3c3c3c'}}  >
                      Enter Destination Wallet Address
                    </h4>
                </div>
                <div onFocus={()=>setsec(true)} onMouseLeave={()=> sec_txt.trim() === '' ? setsec(false) : setsec(true)} className={`contact_form_input_ ${sec && "contact_form_input__"}`}>
                  <label>Destination Wallet Address</label>
                  <input type='text' value={sec_txt} onChange={(e)=>[setsec_txt(e.target.value), setsec(true)]} />
                </div>

                <div style={{margin:'20px 0'}} ></div>

                <div onClick={()=> !load ? handleWithdraw() : console.log('')} className='deposit_container_wallets_btn' >
                  {
                    !load ?
                    <p>Withdraw</p>
                    :
                    <IosLoader/>
                  }
                </div>
              </div>

            </div>

        </div>
    </div>
  )
}
  export default Withdrawals
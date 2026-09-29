import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './routes/main-pages/Home';
import About from './routes/main-pages/About';
import Potfolio from './routes/main-pages/Potfolio';
import HIW from './routes/main-pages/HIW';
import Insights from './routes/main-pages/Insights';
import Contact from './routes/main-pages/Contact';
import Signup from './routes/sign-up/Signup';
import Login from './routes/log-in/Login';
import Loader from './components/Loader';
import AOS from 'aos'
import 'aos/dist/aos.css'
import ScrollToTop from './ScrollToTop';
import Terms from './Terms';
import { useSelector } from 'react-redux';
import { selectid } from './features/idSlice';
import Dashboard from './routes/main-pages/Dashboard';
import ErrorPop from './components/ErrorPop';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setinfos } from './features/infoSlice';
import { seterrs } from './features/errSlice';
import { selectreload, setreloads } from './features/reloadSlice';
import SuccessPop from './components/SuccessPop';
import Invest from './routes/main-pages/Invest';
import Projects from './components/invest/Projects';
import Deposit from './routes/main-pages/Deposit';
import Withdrawals from './routes/main-pages/Withdrawals';
import Analytics from './routes/main-pages/Analytics';
import MyInvestments from './routes/main-pages/MyInvestments';
import Setting from './routes/main-pages/Setting';
import Transactins from './routes/main-pages/Transactins';
import Member from './Member';
import Bonus from './components/Bonus';
import Reset from './routes/log-in/Reset';
import ForgetAuth from './routes/log-in/ForgotAuth';
import ChatWidget from './components/ChatWidget';
import ChatButton from './components/ChatButton';
import CookieConsent from './CookieConcent';
import Privacy from './Privacy';
import Legal from './Legal';

AOS.init()

function App() {

  const id = useSelector(selectid)  
  
  const reload = useSelector(selectreload)
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    
    const handleLoad =()=>{
      const menu_icon = document.querySelector("#root")
      menu_icon.classList.remove("dropdown");
      setloading(false)
    }

    if(document.readyState === "complete"){
        const menu_icon = document.querySelector("#root")
        menu_icon.classList.remove("dropdown");
        setloading(false)
    }else{
      window.addEventListener('load', handleLoad)
    }

    return()=>{
      window.removeEventListener('load', handleLoad)
    }
  },[loading])

  
  const [openChat, setOpenChat] = useState(false);
  const member = localStorage.getItem('member')


  if(loading){
    return <Loader/>
  }


  return (
    <div className='App'>
      <ErrorPop/>
      <SuccessPop/>
      <Loader/> 
      <Bonus/> 
      {/* {
        !member &&
        <Member/>
      } */}
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={!id ? <Home /> : <Dashboard/>} />
          <Route path='/about-us' element={!id ? <About /> : <Navigate to={'/'} />} />
          <Route path='/portfolio' element={!id ? <Potfolio /> : <Navigate to={'/'} />} />
          <Route path='/how-it-works' element={!id ? <HIW /> : <Navigate to={'/'} />} />
          <Route path='/insights' element={!id ? <Insights /> : <Navigate to={'/'} />} />
          <Route path='/contact-us' element={!id ? <Contact /> : <Navigate to={'/'} />} />
          <Route path='/sign-up' element={!id ? <Signup /> : <Navigate to={'/'} />} />
          <Route path='/sign-in' element={!id ? <Login /> : <Navigate to={'/'} />} />
          <Route path='/terms-&-condition' element={<Terms />} />
          <Route path='/privacy-policies' element={<Privacy />} />
          <Route path='/legal-&-compliance' element={<Legal />} />
          <Route path='/invest' element={id ? <Invest /> : <Navigate to={'/'}/>} />
          <Route path='/invest/:clas' element={id ? <Invest /> : <Navigate to={'/'}/>} />
          <Route path='/projects/:class/:name' element={id ? <Projects /> : <Navigate to={'/'}/>} />
          <Route path='/deposit' element={id ? <Deposit /> : <Navigate to={'/'}/>} />
          <Route path='/withdrawals' element={id ? <Withdrawals /> : <Navigate to={'/'}/>} />
          <Route path='/analytics' element={id ? <Analytics /> : <Navigate to={'/'}/>} />
          <Route path='/my-investments' element={id ? <MyInvestments /> : <Navigate to={'/'}/>} />
          <Route path='/settings' element={id ? <Setting /> : <Navigate to={'/'}/>} />
          <Route path='/transactions' element={id ? <Transactins /> : <Navigate to={'/'}/>} />
          <Route path='/forget-password' element={!id ? <ForgetAuth />  : <Navigate to={'/'} />} />
          <Route path='/reset/:email' element={id ? <Reset />  : <Navigate to={'/'}/>} />
        </Routes>
      </BrowserRouter>


      <CookieConsent/>

      
      {openChat && <ChatWidget onCloseChat={() => setOpenChat(false)} />}

      {!openChat && (
        <ChatButton unread={1} onClick={() => setOpenChat(true)} />
      )}
    </div>
  )
} 

export default App
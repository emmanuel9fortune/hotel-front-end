import React from 'react'
import { FaBriefcase } from 'react-icons/fa6'
import { MdAnalytics, MdCreditCard, MdCurrencyExchange, MdHome, MdOutlineAnalytics, MdOutlineCreditCard, MdOutlineHome, MdOutlineWallet, MdSettings, MdTrendingUp, MdWallet } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'

function SideBar() {

    const {pathname} = useLocation()

  return (
    <div className='side_bar' >
        <Link to={'/'} className='desk_header_logo' >
            <h3>월드크레스트 리츠</h3>
            <h3>WorldCrest (REIT)</h3>
        </Link>

        <h4>MAIN MENU</h4>

        <Link to={'/'} className={pathname !== '/' ? 'sidebar_link' : 'sidebar_link sidebar_lnk'} >
            <MdOutlineHome size={25} />
            <p>Dashboard</p>
        </Link>
        
        <Link to={'/invest'} className={pathname !== '/invest' ? 'sidebar_link' : 'sidebar_link sidebar_lnk'} >
            <MdTrendingUp size={25} />
            <p>Invest</p>
        </Link>

        <Link to={'/deposit'} className={pathname !== '/deposit' ? 'sidebar_link' : 'sidebar_link sidebar_lnk'} >
            <MdOutlineCreditCard size={25} />
            <p>Deposits</p>
        </Link>

        <Link to={'/withdrawals'} className={pathname !== '/withdrawals' ? 'sidebar_link' : 'sidebar_link sidebar_lnk'} >
            <MdOutlineWallet size={25} />
            <p>Withdrawals</p>
        </Link>

        <h4>Account Management</h4>
        
        <Link to={'/analytics'} className={pathname !== '/analytics' ? 'sidebar_link' : 'sidebar_link sidebar_lnk'} >
            <MdOutlineAnalytics size={25} />
            <p>Analytics</p>
        </Link>
        
        <Link to={'/my-investments'} className={pathname !== '/my-investments' ? 'sidebar_link' : 'sidebar_link sidebar_lnk'} >
            <FaBriefcase size={25} />
            <p>My Investments</p>
        </Link>
        
        <Link to={'/transactions'} className={pathname !== '/transactions' ? 'sidebar_link' : 'sidebar_link sidebar_lnk'} >
            <MdCurrencyExchange size={25} />
            <p>Transactions</p>
        </Link>
        
        <Link to={'/settings'} className={pathname !== '/settings' ? 'sidebar_link' : 'sidebar_link  '} >
            <MdSettings size={25} />
            <p>Settings</p>
        </Link>
    </div>
  )
}

export default SideBar
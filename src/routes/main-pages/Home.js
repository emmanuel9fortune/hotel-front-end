import React from 'react'
import Banner from '../../components/Banner'
import Head from '../../components/Navbar'
import Rate from '../../components/Rate'
import News from '../../components/News'
import Invest from '../../components/Invest'
import SubFooter from '../../components/SubFooter'
import FacilitiesSection from '../../components/Facility'
import DiningSection from '../../components/DiningSection'

function Home() {
  return (
    <div>
      <Head/>
      <Banner/>
      <Rate/>
      <FacilitiesSection/>
      <News/>
      <Invest/>
      <SubFooter/>
    </div>
  )
}

export default Home
import React, { useState } from 'react'
import Head from '../../components/Navbar'
import Greating from '../../components/about/Greating'
import '../../styles/about.css'
import AboutSelect from '../../components/about/aboutSelect'
import BottomBar from '../../components/BottomBar'
import Mission from '../../components/about/Mission'
import History from '../../components/about/History'
import OrgChart from '../../components/about/Organization'

function About() {

  const [count, setcount] = useState(0)

  return (
    <div>
      <Head stick={true} />
      <AboutSelect count={count}  setcount={setcount} />
      {
        count === 0 &&
        <Greating/>
      }
      {
        count === 1 &&
        <Mission/>
      }
      {
        count === 2 &&
        <History/>
      }
      {
        count === 3 &&
        <OrgChart/>
      }

      <BottomBar/>
    </div>
  )
}

export default About
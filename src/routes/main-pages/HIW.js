import React, { useState } from 'react'
import Head from '../../components/Navbar'
import BottomBar from '../../components/BottomBar'
import { MdDrafts, MdList, MdOutlineCancel, MdPersonOutline, MdTrendingUp } from 'react-icons/md'
import { MdWallet } from 'react-icons/md'
import { MdVerified } from 'react-icons/md'
import { FaCoins, FaUserLock } from 'react-icons/fa6'
import '../../styles/hiw.css'
import { useTranslation } from 'react-i18next'

function HIW() {

    const { t } = useTranslation()

    const fst = {
        hd : t("hiw.text17"),
        txt1: t("hiw.text18"),
        txt2: t("hiw.text19"),
        txt3: t("hiw.text20"),
        txt4: t("hiw.text21"),
        txt5: t("hiw.text22"),
        txt6: t("hiw.text23"),
    }

    const sec = {
        hd : t("hiw.text24"),
        txt1: t("hiw.text25"),
        txt2: t("hiw.text26"),
        li1: t("hiw.text27"),
        li2: t("hiw.text28"),
        li3: t("hiw.text29"),
        li4: t("hiw.text30"),
        li5: t("hiw.text31"),
        txt3: t("hiw.text32"),
        txt4: t("hiw.text33"),
    }

    const trd = {
        hd : t("hiw.text34"),
        txt1: t("hiw.text35"),
        txt2: t("hiw.text36"),
        li1: t("hiw.text37"),
        li2: t("hiw.text38"),
        li3: t("hiw.text39"),
        li4: t("hiw.text40"),
        txt3: t("hiw.text41"),
    }

    const frt = {
        hd : t("hiw.text42"),
        txt1: t("hiw.text43"),
        txt2: t("hiw.text44"),
        li1: t("hiw.text45"),
        li2: t("hiw.text46"),
        li3: t("hiw.text47"),
        txt3: t("hiw.text48"),
    }

    const fif = {
        hd : t("hiw.text49"),
        txt1: t("hiw.text50"),
        txt2: t("hiw.text51"),
        li1: t("hiw.text52"),
        li2: t("hiw.text53"),
        li3: t("hiw.text54"),
        txt3: t("hiw.text55"),
    }

    const six = {
        hd : t("hiw.text56"),
        txt1: t("hiw.text57"),
        txt2: t("hiw.text58"),
        li1: t("hiw.text59"),
        li2: t("hiw.text60"),
        li3: t("hiw.text61"),
        txt3: t("hiw.text62"),
    }

    const sev = {
        hd : t("hiw.text63"),
        txt1: t("hiw.text64"),
        txt2: t("hiw.text65"),
        li1: t("hiw.text66"),
        li2: t("hiw.text67"),
        li3: t("hiw.text68"),
        li4: t("hiw.text19"),
        txt3: t("hiw.text70"),
        txt4: t("hiw.text71"),
        txt5: t("hiw.text72"),
    }

    const [det, setdet] = useState(null)

  return (
    <div>
        <Head stick={true} />

        <div className='how_it_works'>
            <h1>{t("hiw.text1")}</h1>
            <p>{t("hiw.text2")}</p>

            <div className='how_it_works_boxes'>
                <div className='how_it_works_box' onClick={()=>setdet(fst)} >
                    <div>
                        <h3>{t("hiw.text3")}</h3>
                        <p>{t("hiw.text4")}</p>
                    </div>

                    <MdPersonOutline size={26} color='#464646' />
                </div>
                <div className='how_it_works_lines' ></div>
                <div className='how_it_works_box' onClick={()=>setdet(sec)} >
                    <div>
                        <h3>{t("hiw.text5")} </h3>
                        <p>{t("hiw.text6")}</p>
                    </div>

                    <MdWallet size={26} color='#464646' />
                </div>
                <div className='how_it_works_lines' ></div>
                <div className='how_it_works_box' onClick={()=>setdet(trd)} >
                    <div>
                        <h3>{t("hiw.text7")}</h3>
                        <p>{t("hiw.text8")}</p>
                    </div>

                    <MdVerified size={26} color='#464646' />
                </div>
                <div className='how_it_works_lines' ></div>
                <div className='how_it_works_box' onClick={()=>setdet(frt)} >
                    <div>
                        <h3>{t("hiw.text9")}</h3>
                        <p>{t("hiw.text10")}</p>
                    </div>

                    <MdDrafts size={26} color='#464646' />
                </div>
                <div className='how_it_works_lines' ></div>
                <div className='how_it_works_box'onClick={()=>setdet(fif)}  >
                    <div>
                        <h3>{t("hiw.text11")}</h3>
                        <p>{t("hiw.text12")}</p>
                    </div>

                    <MdTrendingUp size={26} color='#464646' />
                </div>
                <div className='how_it_works_lines' ></div>
                <div className='how_it_works_box' onClick={()=>setdet(six)} >
                    <div>
                        <h3>{t("hiw.text13")}</h3>
                        <p>{t("hiw.text14")}</p>
                    </div>

                    <FaCoins size={26} color='#464646' />
                </div>
                <div className='how_it_works_lines' ></div>
                <div className='how_it_works_box' onClick={()=>setdet(sev)} >
                    <div>
                        <h3>{t("hiw.text15")}</h3>
                        <p>{t("hiw.text16")}</p>
                    </div>

                    <FaUserLock size={26} color='#464646' />
                </div>
            </div>
        </div>

        {
            det &&
            <div className='hiw_pop' >
                <div className='hiw_pop_overlay' onClick={()=>setdet(null)} ></div>
                <div className='hiw_pop_container'>
                    <div className='hiw_pop_container_' >
                        <div className='hiw_pop_container_hd'>
                            <h3>{det?.hd} </h3>

                            <div onClick={()=>setdet(null)} >
                                <MdOutlineCancel size={23} />
                            </div>
                        </div>

                        <p>{det?.txt1}</p>

                        <p>
                            {det?.txt2}
                        </p>

                        <ul style={{margin:'0 20px'}}>
                            {det?.li1 && <li>{det?.li1}</li>}
                            {det?.li2 && <li>{det?.li2}</li>}
                            {det?.li3 && <li>{det?.li3}</li>}
                            {det?.li4 && <li>{det?.li4}</li>}
                            {det?.li5 && <li>{det?.li5}</li>}
                        </ul>

                        <p>{det?.txt3}</p>

                        <p>{det?.txt4}</p>
                        <p>{det?.txt5}</p>
                        <p>{det?.txt6}</p>
                    </div>
                </div>
            </div>
        }

        <BottomBar/>
    </div>
  )
}

export default HIW
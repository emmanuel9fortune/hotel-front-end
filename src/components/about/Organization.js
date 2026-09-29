import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaHouse } from "react-icons/fa6";



export default function OrgChart() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const orgData = [
  {
    id: 1,
    title: t("about.org.text4"),
    img:'/assets/org1.jpg',
    color: "#e74c3c",
    info: t("about.org.text5"),
    row: 1,
    col: 2,
  },
  {
    id: 2,
    title: t("about.org.text6"),
    color: "#1f6feb",
    info: t("about.org.text7"),
    row: 2,
    col: 1,
  },
  {
    id: 3,
    title: t("about.org.text8"),
    color: "#1f6feb",
    info: t("about.org.text9"),
    row: 2,
    col: 3,
  },
  {
    id: 4,
    title: t("about.org.text10"),
    img:'/assets/org2.jpg',
    color: "#e74c3c",
    info: t("about.org.text11"),
    row: 3,
    col: 2,
  },
  {
    id: 5,
    title: t("about.org.text12"),
    color: "#1f6feb",
    info: t("about.org.text13"),
    row: 4,
    col: 1,
  },
  {
    id: 6,
    title: t("about.org.text14"),
    color: "#1f6feb",
    info: t("about.org.text15"),
    row: 4,
    col: 3,
  },
  {
    id: 7,
    title: t("about.org.text16"),
    color: "#e74c3c",
    info: t("about.org.text17"),
    row: 5,
    col: 2,
  },
];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [pos, setpos] = useState(null)
  const [itm, setitm] = useState(null)

  const handleHover =(e, item)=>{
    const rect = e.currentTarget.getBoundingClientRect()
    setpos({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width
    })
    setitm(item)
  }

  
  const mobile = window.innerWidth <= 830

  return (
    <div className='about_container__ ' style={{width:'100%', padding:'5%'}}>
      <div className='abount_container_head' >
          <h3>{t("about.org.text1")}</h3>

          <div>
              <div>
                  <FaHouse color='grey' size={18}/>
              </div>
              <p><FaArrowRight style={{margin:'0 5px'}} color='grey'/> {t("about.org.text2")}</p>
              <p><FaArrowRight style={{margin:'0 5px'}} color='grey'/> {t("about.org.text1")}</p>
          </div>
      </div>
      <div className="org-scale-wrapper">
        <div className="org-container">
          <div className="center-line"></div>

          {orgData.map((item) => (
            <div
              key={item.id}
              className="org-box"
              style={{
                gridColumn: item.col,
                gridRow: item.row,
                backgroundColor: item.color,
              }}
            >
              <h4
                onMouseEnter={(e)=>handleHover(e, item)}
                onMouseLeave={()=>setpos(null)}
                onClick={(e)=>handleHover(e, item)}
              >
                {item.title}
              </h4>

              
            </div>
          ))}

          {pos && (
            <div 
              className="info_popup"
              style={{
                position:"absolute",
                top: mobile ? pos.top - 180 : pos.top - 100,
                left: mobile ? pos.left + 10 : pos.left- 200,
                width: "250px",
                zIndex: 999999
              }}
            >
              {
                itm?.img &&
                <img src={itm?.img} alt="" /> 
              }
              <h4>{t("about.org.text3")}</h4>
              <p>{itm.info}</p>
            </div>
          )}

          {/* -------------- CONNECTING LINES -------------- */}
          {/* vertical lines */}
          <div className="line v1" style={{ gridRow: "1 / 6", gridColumn: 2 }}></div>

          {/* horizontal lines second row */}
          <div className="line h1" style={{ gridRow: 2, gridColumn: "1 / 3" }}></div>
          <div className="line h2" style={{ gridRow: 2, gridColumn: "2 / 4" }}></div>

          {/* horizontal lines fourth row */}
          <div className="line h3" style={{ gridRow: 4, gridColumn: "1 / 3" }}></div>
          <div className="line h4" style={{ gridRow: 4, gridColumn: "2 / 4" }}></div>
        </div>
      </div>
    </div>
  );
}

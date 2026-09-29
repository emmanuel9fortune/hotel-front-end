import React from "react";
import { useTranslation } from "react-i18next";

export default function Timeline() {
  
  const { t } = useTranslation()

  const data = [
    {
      year: t("about.history.text1"),
      color: "red",
      events: [
        t("about.history.text2")
      ]
    },
    {
      year: t("about.history.text3"),
      color: "blue",
      events: [
        t("about.history.text4")
      ]
    },
    {
      year: t("about.history.text5"),
      color: "blue",
      events: [
        t("about.history.text6")
      ]
    },
    {
      year: t("about.history.text7"),
      color: "blue",
      events: [
        t("about.history.text8"),
        t("about.history.text9")
      ]
    },
    {
      year: t("about.history.text10"),
      color: "red",
      events: [
        t("about.history.text11"),
        t("about.history.text12")
      ]
    },
    {
      year: t("about.history.text13"),
      color: "red",
      events: [
        t("about.history.text14"),
        t("about.history.text15")
      ]
    },
    {
      year: t("about.history.text16"),
      color: "blue",
      events: [
        t("about.history.text17"),
        t("about.history.text18")
      ]
    },
    {
      year: t("about.history.text19"),
      color: "blue",
      events: [
        t("about.history.text20"),
        t("about.history.text21")
      ]
    },
    {
      year: t("about.history.text22"),
      color: "red",
      events: [
        t("about.history.text23"),
        t("about.history.text24"),
        t("about.history.text25")
      ]
    }
  ];

  return (
    <div className="timeline-container">

      <div className="timeline-line"></div>

      {data.map((item, index) => {
        const side = item.color === "red" ? "left-side" : "right-side";

        return (
          <div key={index} className={`timeline-item ${side}`}>

            {/* YEAR */}
            <div className="timeline-left">
              <h2>{item.year}</h2>
            </div>

            {/* DOT */}
            <div
              className="timeline-dot"
              style={{ backgroundColor: item.color }}
            ></div>

            {/* EVENTS */}
            <div className="timeline-right">
              {item.events.map((ev, i) => (
                <p key={i}>{ev}</p>
              ))}
            </div>

          </div>
        );
      })}

    </div>
  );
}

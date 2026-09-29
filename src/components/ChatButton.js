import React from "react";
import "../styles/ChatWidget.css";
import { MdOutlineChatBubble } from "react-icons/md";

export default function ChatButton({ onClick}) {
  return (
    <button className="chat-floating" onClick={onClick}>
      <p style={{margin:'0 6px'}}>Chat</p>
      <span className="chat-badge"></span>
      <div style={{width:'50px', borderRadius:'50%', height:'50px', borderRadius:'50%', display:'flex', flexDirection:'column', alignItems:'center', backgroundColor:'#303030ff', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <MdOutlineChatBubble size={25}/>
      </div>
    </button>
  );
}

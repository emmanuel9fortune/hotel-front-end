import React, { useState, useRef, useEffect } from "react";
import "../styles/ChatWidget.css";
import { FaArrowDown } from "react-icons/fa";
import axios from "axios";

export default function ChatWidget({onCloseChat}) {

    const [chats, setchats] = useState([])
    const [reload, setreload] = useState(0)
    const chatContainerRef = useRef(null);

    const getuser_id = sessionStorage.getItem('user_id_')

    useEffect(()=>{
        const func =async()=>{
            try {
                const res = await axios.post('https://reit.smartledgerassist.com/reit-server/accesschat.php', {user_id: getuser_id + '@admin'})      
                if(res.data.status === 'success'){
                    setchats(res.data.chats)
                    setreload(0)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        func()
         const interval = setInterval(func, 2000); // poll every 2 seconds
         return () => clearInterval(interval);
    },[reload])

    
    const chatRef = useRef(null)
    const bottomRef = useRef(null)
    const editorRef = useRef(null);

    const handleSubmit =async()=>{
        const user_id = getuser_id ? getuser_id : Date.now()
        const combined_id = user_id + '@admin'
        const friend_id = '@admin'

        const value={
            user_id,
            combined_id,
            friend_id,
            message: editorRef.current.innerHTML,
            status : getuser_id ? 'old' : 'new'
        }

        sessionStorage.setItem('user_id_', user_id)

        try {
            const res = await axios.post('https://reit.smartledgerassist.com/reit-server/addchat.php', value)    
            if(res.data.status === 'success'){
                setreload(reload + 1)
                editorRef.current.innerHTML = ''
                editorRef.current.style.height = "auto"
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior:'smooth'
        })
        if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [reload, chats]);

    const autoGrow=()=>{
        const el = editorRef?.current
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 100) + "px"
    }

    const handlePaste =(e)=>{
        e.preventDefault()
        const text = e.clipboardData.getData("text/plain")
        document.execCommand("insertText", false, text)
    }

    

  return (
    <div className="chatbox-container">
        <div className="chatbox-header">
        <div className="header-left">
            <img
            src="/assets/avatar.png"
            alt="agent"
            className="agent-avatar"
            />
            <div className="agent-info">
            <h4>How can we help?</h4>
            <span style={{display:'flex', alignItems:'center'}} ><span style={{position:'initial', height:'6px', width:'6px', display:'block', margin:'0 5px 0 0', border:'none'}} className="chat-badge"></span>We reply immediately</span>
            </div>
        </div>

        <button className="chat-close" onClick={onCloseChat}>
            <FaArrowDown/>
        </button> 
        </div>

        <div className="chatbox-body" ref={chatContainerRef}>
            <div className="message friend">
                <div className="bubble">
                    👋 Welcome to WorldCrest!  
                    Whether you have a question or need assistance, we're here.  
                    😊 What would you like to know?
                </div>
            </div>

            {
                chats?.length > 0 &&
                chats?.map((item, i)=>(
                    item?.user_id === getuser_id ?
                    <div key={i} className="message user">
                        <div className="bubble">{item?.message}</div>
                    </div>
                    :
                    <div key={i} className="message friend">
                        <div className="bubble">{item?.message}</div>
                    </div>
                ))
            }
        </div>

        <div className="chatbox-input">
            
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={autoGrow}
                onPaste={handlePaste}
                data-placeholder="Message"
                className="editable"
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px',
                    backgroundColor: '#fff',
                    width: '85%',
                    overflowY: 'scroll',
                    fontSize: '16px',
                    whiteSpace: 'pre-wrap',
                    height:'50px',
                    margin:'0 5px'
                }}
            >
            </div>
            {
                editorRef?.current?.innerHTML.trim() !== ''?
                <button onClick={handleSubmit} className="send-button">➤</button>
                :
                <button style={{backgroundColor:'grey'}} className="send-button">➤</button>
            }
        </div>

        <div className="powered">Powered by WorldCrest</div>
    </div>
  );
}


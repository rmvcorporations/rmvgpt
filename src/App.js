import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [value,setValue] = useState(null);
  const [msg,setMsg] = useState(null);
  const [previousChats,setPreviousChats] = useState([]);
  const [currentTitle,setCurrentTitle] = useState(null);

  const getMessage = async() =>{
    const options = {
      method:"POST",
      body:JSON.stringify({
        message:value
      }),
      headers:{
        "Content-Type":"application/json"
      }
    }
    try{
      const response = await fetch('http://localhost:8080/',options)
      const data = await response.json()
      console.log(data)
      setMsg(data.choices[0].message)
      // console.log(msg.content)
    }
    catch(error){
      console.log("Error in getMessage "+error)
    }
  }

  useEffect(()=>{
    if(!currentTitle && value && msg){
      setCurrentTitle(value)
    }
    if(currentTitle && value && msg){
      setPreviousChats(previousChats => (
        [...previousChats,{
          title:currentTitle,
          role:"user",
          content:value
        },{
          title:currentTitle,
          role:msg.role,
          content:msg.content
        }]
      ))
    }
  },[msg,currentTitle])
  console.log(previousChats)

  const currentChat = previousChats.filter(previousChats=>previousChats.title===currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChats => previousChats.title)))
  console.log(uniqueTitles)

  return (
    <div className="app">
      <section className='side-bar'>
        <button>+ New Chat</button>
        <ul className='history'>
          {uniqueTitles?.map((uniqueTitle,index)=>
          <li key={index}>
            {uniqueTitle}
          </li>
        )}
        </ul>
        <nav>
          <p>Made by RMV</p>
        </nav>
      </section>
      <section className='main'>
        <h1>RMV-GPT</h1>
        <ul className='feed'>
          {currentChat.map((chatMsg,index)=>
            <li key={index}>
              <p className='role'>{chatMsg.role}</p>
              <p>{chatMsg.content}</p>
            </li>
          )}
        </ul>
        <div className='bottom-section'>
          <div className='input-container'>
            <input type="text" id="text"
              onChange={(e)=>{setValue(e.target.value)}}
              onKeyDown={(e)=>{
                  if(e.key==='Enter'){
                    getMessage();
                    e.target.value="";
                  }
              }
            }
            />
            <div id="submit" onClick={getMessage}>➤</div>
          </div>
          <p className='info'>
            RMV-GPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;

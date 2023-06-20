import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generateRandomMessage, generateRandomNames } from '../utils/helper';

const LiveChat = () => {
    const [liveMessage, setLiveMessage] = useState("");

    const dispatch = useDispatch();
    const chatMessages = useSelector(store => store.chat.messages);

    useEffect(() => {
        const interval = setInterval(() => {
            //API Polling
            dispatch(addMessage({
                name: generateRandomNames(),
                message: generateRandomMessage(15) + "😄"
            }))
        }, 1500);

        return () => clearInterval(interval);
    }, [])

  return (
    <div className="">
    <div className="w-full h-[400px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {chatMessages.map((c, index) => <ChatMessage key={index} name={c.name} message={c.message} />)}
        </div>
    </div>
    <form className="w-full p-2 ml-2 border border-black rounded-lg" 
      onSubmit={(e) => {
          e.preventDefault();
          dispatch(addMessage({
            name: "Unzela",
            message: liveMessage
          }))
          setLiveMessage("");
        }}>
        <input className="px-2 w-56 m-1 border border-gray-600 rounded-lg" type="text" 
          value={liveMessage} 
          onChange={(e) => setLiveMessage(e.target.value)} />
        <button className="px-2 mx-2 bg-gray-100 rounded-md">Send</button>
    </form>
    </div>
  )
}

export default LiveChat;
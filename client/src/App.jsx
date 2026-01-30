import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [userName, setUserName] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null); 

  const joinChat = () => {
    if (userName !== "") setJoined(true);
  };

  const sendMessage = async () => {
    console.log(message)
  };

  if (!joined) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Join Chat</h2>
          <input 
            type="text" placeholder="Enter your name..." 
            className="w-full p-2 border rounded mb-4 outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={joinChat} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Join</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <header className="bg-green-600 text-white p-4 shadow-md font-bold">Group Chat</header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.author === userName ? "items-end" : "items-start"}`}>
            <div className={`p-3 rounded-lg shadow max-w-xs ${msg.author === userName ? "bg-green-100" : "bg-white"}`}>
              <p className="text-xs font-bold text-gray-600">{msg.author}</p>
              <p>{msg.message}</p>
              <p className="text-right text-[10px] text-gray-400 mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} /> 
      </div>
      <footer className="p-4 bg-white flex space-x-2">
        <input 
          type="text" value={message} placeholder="Type a message..."
          className="flex-1 p-2 border rounded outline-none"
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()} 
        />
        <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded">Send</button>
      </footer>
    </div>
  );
}

export default App;

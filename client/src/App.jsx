import React, { useState, useEffect, useRef } from "react";
import { IoMdSend, IoMdMore } from "react-icons/io";
import { BsEmojiSmile, BsPaperclip } from "react-icons/bs";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import { connectWS } from "./lib/ws";

const App = () => {
  const socket = useRef(null);
  const chatEndRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.current = connectWS();
  }, []);

  const joinChat = () => {
    if (userName !== "") setJoined(true);
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      return;
    }

    const messageData = {
      id: Date.now(),
      sender: userName,
      message: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    // socket.emit("send_message", messageData);
    setMessages((list) => [...list, messageData]);
    setMessage("");
  };

  if (!joined) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#00a884] p-4">
        <div className="bg-white p-10 rounded shadow-2xl w-full max-w-md text-center">
          <FaUserCircle className="text-gray-300 text-7xl mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            WhatsApp Login
          </h2>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 border-b-2 border-[#00a884] outline-none text-lg mb-8"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            onClick={() => userName && setJoined(true)}
            className="w-full py-3 bg-[#00a884] text-white font-bold rounded hover:bg-[#008f70] transition-colors"
          >
            LOG IN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#efeae2]">
      <header className="bg-[#f0f2f5] px-4 py-2.5 flex justify-between items-center border-b border-gray-300">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-300 text-2xl font-bold uppercase">
            <FaUserCircle className="size-10 border-none outline-none" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-[#111b21]">
              General Group
            </h2>
            <p className="text-[12px] text-[#667781]">online</p>
          </div>
        </div>
        <div className="flex space-x-5 items-center text-[#54656f] text-xl">
          <span>
            <span className="text-sm">Signed in as </span>
            <span className="text-[15px] font-semibold text-[#111b21]">
              {userName}
            </span>
          </span>
          <FaSearch className="cursor-pointer" />
          <IoMdMore className="cursor-pointer" />
        </div>
      </header>

      <div
        className="flex-1 overflow-y-auto px-10 py-4 space-y-2"
        style={{
          backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === userName ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative px-3 py-1.5 shadow-sm max-w-[65%] min-w-20 ${msg.sender === userName ? "bg-[#dcf8c6] rounded-l-lg rounded-br-lg" : "bg-white rounded-r-lg rounded-bl-lg"}`}
            >
              {msg.sender !== userName && (
                <p className="text-[12.5px] font-bold text-blue-500 mb-0.5">
                  {msg.sender}
                </p>
              )}
              <p className="text-[14.2px] text-[#111b21] pb-1 mb-1 pr-10">
                {msg.message}
              </p>
              <div className="absolute bottom-1 right-2 flex items-center space-x-1">
                <span className="text-[10px] text-gray-500">{msg.time}</span>
                {msg.sender === userName && (
                  <MdDoneAll className="text-[#53bdeb] text-sm" />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <footer className="bg-[#f0f2f5] p-3 flex items-center space-x-3">
        <div className="flex space-x-3 text-[#54656f] text-2xl">
          <BsEmojiSmile className="cursor-pointer" />
          <BsPaperclip className="cursor-pointer transform rotate-45" />
        </div>
        <textarea
          rows={1}
          type="text"
          value={message}
          placeholder="Type a message"
          className="flex-1 py-2.5 px-4 bg-white rounded-lg resize-none outline-none text-[#111b21] text-[15px]"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="text-[#54656f] text-2xl">
          <IoMdSend
            className={`${message.trim() ? "text-[#00a884]" : "text-[#54656f]"} transition-colors`}
          />
        </button>
      </footer>
    </div>
  );
};

export default App;

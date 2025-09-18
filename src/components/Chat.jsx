import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { formatDistanceToNow } from "date-fns";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // keep socket in ref to avoid duplicate connections
  const socketRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text: text,
        createdAt: createdAt || new Date(),
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, text, createdAt: new Date() },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        text: newMessage,
        firstName: user.firstName,
        lastName: user.lastName,
        userId,
        targetUserId,
      });
    }
    // Remove this line to prevent duplicate (since server will broadcast back)
    // setMessages((prevMessages) => [...prevMessages, { firstName: user.firstName, lastName: user.lastName, text: newMessage, createdAt: new Date() }]);
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-r-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          const isCurrentUser = msg.firstName === user.firstName;
          return (
            <div
              className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}
              key={index}
            >
              <div className="chat-header">
                {isCurrentUser ? "You" : `${msg.firstName} ${msg.lastName}`}
                <time className="text-xs opacity-50 ml-2">
                  {formatDistanceToNow(new Date(msg.createdAt), {
                    addSuffix: true,
                  })}
                </time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">
                {isCurrentUser ? "✔️✔️" : "✔️✔️"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
//------------------------------------------------------

// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { createSocketConnection } from '../utils/socket';
// import axios from 'axios';
// import { BASE_URL } from '../utils/constants';

// const Chat = () => {
//     const {targetUserId} = useParams();
//     const [messages, setMessages] = useState([]); // Example message data
//     const [newMessage, setNewMessage] = useState("");
//     const user = useSelector((store)=> store.user)
//     const userId = user?._id

//     const fetchChatMessages = async () => {
//       const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//         withCredentials: true,
//       });

//        console.log(chat.data.messages);

//        const chatMessages = chat?.data?.messages.map((msg) => {
//         const {senderId, text} = msg;
//          return {
//            firstName: senderId?.firstName,
//            lastName: senderId?.lastName,
//            text: text,
//          };
//        });
//        setMessages(chatMessages);
//     }

//     useEffect(() => {
//       fetchChatMessages()
//     }, [])

//     useEffect(() => {
//       if (!userId) {
//             return;
//         }
//         // Create socket connection when the page loads and make the connection to sockets in backend
//         const socket = createSocketConnection()
//         socket.emit("joinChat", {
//           firstName: user.firstName,
//           userId,
//           targetUserId,
//         }),
//           socket.on("messageReceived", ({ firstName, lastName, text }) => {
//             console.log("Message received: ", firstName + " : " + text);
//             setMessages((prevMessages) => [...prevMessages, { firstName, lastName, text }]);
//           });

//         return ()=>{
//             //when the component unmounts disconnect the socket and clean up
//             socket.disconnect();
//         }
//     }, [userId, targetUserId])

//     const sendMessage = ()=>{
//         const socket = createSocketConnection()
//         socket.emit("sendMessage", {
//           text: newMessage,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           userId,
//           targetUserId,
//         });
//         setNewMessage("")
//     }

//   return (
//     <div className="w-3/4 mx-auto border border-r-gray-600 m-5 h-[70vh] flex flex-col">
//       <h1 className="p-5 border-b border-gray-600">Chat</h1>
//       <div className="flex-1 overflow-scroll p-5">
//         {/*Show messages in here */}
//         {messages.map((msg, index) => {
//             return(
//                 <div className="chat chat-start" key={index}>
//                     <div className="chat-header">
//                       {msg.firstName === user.firstName ? "You" : `${msg.firstName} ${msg.lastName}`}
//                        {/* {`${msg.firstName}  ${msg.lastName}`} */}
//                         <time className="text-xs opacity-50">minute ago</time>
//                     </div>
//                     <div className="chat-bubble">{msg.text}</div>
//                     <div className="chat-footer opacity-50">Just Now</div>
//                 </div>
//             )
//         })}
//       </div>

//       <div className="p-5 border-t border-gray-600 flex items-center gap-2">
//         <input  value={newMessage} onChange={(e)=> setNewMessage(e.target.value)}
//         className="flex-1 border border-gray-500 text-white rounded p-2" />
//         <button onClick={sendMessage} className="btn btn-secondary">Send</button>
//       </div>
//     </div>
//   );
// }

// export default Chat

import { useEffect, useRef, useState } from "react";
import "./ChatComponent.scss";
import { IoSend } from "react-icons/io5";
import { MessageComponent } from "./MessageComponent/MessageComponent";

const messages = [
  {
    message: "Hello everyone!",
    tripId: 1,
    userId: 2,
  },
  {
    message: "Looking forward to this trip!",
    tripId: 1,
    userId: 1,
  },
  {
    message: "Are we all set for the journey?",
    tripId: 1,
    userId: 4,
  },
  {
    message: "Can’t wait to explore!",
    tripId: 1,
    userId: 2,
  },
  {
    message: "What time are we meeting?",
    tripId: 1,
    userId: 1,
  },
  {
    message: "All packed and ready!",
    tripId: 1,
    userId: 4,
  },
];

type Message = {
  id: number;
  timestamp: string;
  userId: number;
  tripId: number;
  message: string;
};

type Params = {
  tripId: number;
};

export const ChatComponent: React.FC<Params> = ({ tripId }) => {
  const [message, setMessage] = useState("");

  const chatListRef = useRef<HTMLDivElement>(null);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [updateAllMessages, setUpdateAllMessages] = useState(1);



  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const token = localStorage.getItem("authToken");

    try {
      if (message.length > 0) {
        const response = await fetch("http://localhost:8088/message", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: message,
            tripId: tripId,
          }),
        });

        const data = await response.json();

        setUpdateAllMessages((prev) => prev + 1);
        setMessage("");

        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllMessages = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(
          `http://localhost:8088/message/trip/${tripId}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data: Message[] = await response.json();

        return data;
      } catch (error) {
        console.log(error);
      }
    };

    getAllMessages().then((data) => {
      if (data) {
        setAllMessages(data);
      }
    });
  }, [updateAllMessages]);

  return (
    <div className="chat">
      <nav className="chat__nav">
        <p className="chat__nav--item">Chat</p>
        <p className="chat__nav--item">Votes</p>
      </nav>

      <div className="chat__chat">
        <div className="chat__chat--list" ref={chatListRef}>
          {allMessages.length > 0 ? (
            allMessages.map((message) => (
              <MessageComponent message={message} key={message.id}/>
            ))
          ) : (
            <h2>No messages yet :(</h2>
          )}
        </div>

        <div className="chat__chat--bottom">
          <input
            type="text"
            className="chat__chat--bottom--input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message"
          />

          <button className="chat__chat--bottom--button" onClick={sendMessage}>
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

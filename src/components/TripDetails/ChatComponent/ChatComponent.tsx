import { useEffect, useRef, useState } from "react";
import "./ChatComponent.scss";
import { IoSend } from "react-icons/io5";
import { getData } from "../../../api";
import classNames from "classnames";
import { User } from "../../../types/User";

const messages = [
  {
    "message": "Hello everyone!",
    "tripId": 1,
    "userId": 2
  },
  {
    "message": "Looking forward to this trip!",
    "tripId": 1,
    "userId": 1
  },
  {
    "message": "Are we all set for the journey?",
    "tripId": 1,
    "userId": 4
  },
  {
    "message": "Can’t wait to explore!",
    "tripId": 1,
    "userId": 2
  },
  {
    "message": "What time are we meeting?",
    "tripId": 1,
    "userId": 1
  },
  {
    "message": "All packed and ready!",
    "tripId": 1,
    "userId": 4
  }
];

export const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User>();
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getData("users/current").then(setUser);
  }, []);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat">
      <nav className="chat__nav">
        <p className="chat__nav--item">Chat</p>
        <p className="chat__nav--item">Votes</p>
      </nav>

      <div className="chat__chat">
        <div className="chat__chat--list" ref={chatListRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={classNames("chat__chat--list--item", {
                "current-user": message.userId === user?.id,
              })}
            >
              <p className="chat__chat--list--item--author">
                {user?.id === message.userId ? user?.firstName : message.userId}
              </p>

              <p className="chat__chat--list--item--message">{message.message}</p>
            </div>
          ))}
        </div>

        <div className="chat__chat--bottom">
          <input
            type="text"
            className="chat__chat--bottom--input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message"
          />

          <button className="chat__chat--bottom--button">
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

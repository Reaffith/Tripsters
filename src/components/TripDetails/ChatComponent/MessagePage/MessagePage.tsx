import { IoSend } from "react-icons/io5";
import { MessageComponent } from "./MessageComponent/MessageComponent";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

type Message = {
  id: number;
  timestamp: string;
  userId: number;
  tripId: number;
  message: string;
};

export const MessagePage = () => {
  const { id } = useParams();
  const chatListRef = useRef<HTMLDivElement>(null);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [updateAllMessages, setUpdateAllMessages] = useState(1);

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
            tripId: id,
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
          `http://localhost:8088/message/trip/${id}`,
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
  }, [id, updateAllMessages]);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [allMessages]);
  
  return (
    <>
      <div className="chat__chat">
        <div className="chat__chat--list" ref={chatListRef}>
          {allMessages.length > 0 ? (
            allMessages.map((message) => (
              <MessageComponent message={message} key={message.id} />
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
    </>
  );
};

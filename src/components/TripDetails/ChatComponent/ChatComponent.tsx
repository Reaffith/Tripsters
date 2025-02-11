import { useState } from "react";
import "./ChatComponent.scss";
import classNames from "classnames";
import { Outlet, useNavigate } from "react-router-dom";

export const ChatComponent = () => {
  const [isChat, setIsChat] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="chat">
      <nav className="chat__nav">
        <p
          className={classNames("chat__nav--item", { "chat-active": isChat })}
          onClick={() => {
            setIsChat(true)
            navigate('messages')
          }}
        >
          Chat
        </p>
        <p
          className={classNames("chat__nav--item", { "chat-active": !isChat })}
          onClick={() => {
            setIsChat(false)
            navigate('votes')
          }}
        >
          Votes
        </p>
      </nav>

      <Outlet />
    </div>
  );
};

import { useEffect, useState } from "react";
import { User } from "../../../../types/User";
import "./MessageComponent.scss";
import { getAllusersInTrip, getData } from "../../../../api";
import classNames from "classnames";
import noPfp from "../../../../pics/no-pfp.png";

type Message = {
  id: number;
  timestamp: string;
  userId: number;
  tripId: number;
  message: string;
};

type Params = {
  message: Message;
};

export const MessageComponent: React.FC<Params> = ({ message }) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [author, setAuthor] = useState<User>();
  const [imgSrc, setImgSrc] = useState<string>(noPfp);

  const transformDate = () => {
    const date = message.timestamp;
    const dateArr = [...date];

    const dateTime = [dateArr[11], dateArr[12], dateArr[13],  dateArr[14], dateArr[15],].join('');

    return dateTime;
  }

  useEffect(() => {
    if (author && author.fileUrl) {
      import(`../../../../main/resources/images/${author.fileUrl}`)
        .then((image) => setImgSrc(image.default))
        .catch(() => setImgSrc(noPfp));
    }
  }, [author, currentUser]);

  useEffect(() => {
    getAllusersInTrip(message.tripId.toString()).then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    setAuthor(users.filter((u) => u.id === message.userId)[0]);
  }, [users]);

  useEffect(() => {
    getData("users/current").then(setCurrentUser);
  }, []);

  return (
    <div
      key={message.id}
      className={classNames("message", {
        "current-user": message.userId === currentUser?.id,
      })}
    >
      {author?.id !== currentUser?.id && (
        <img src={imgSrc} alt="PFP" className="message__pfp" />
      )}

      <div className="message__block">
        {author?.id !== currentUser?.id && (
          <p className="message__block--author">{author?.firstName}</p>
        )}

        <p className="message__block--message">{message.message}</p>

        <p className="message__block--time">
          {transformDate()}
        </p>
      </div>

      {author?.id === currentUser?.id && (
        <img src={imgSrc} alt="PFP" className="message__pfp" />
      )}
    </div>
  );
};

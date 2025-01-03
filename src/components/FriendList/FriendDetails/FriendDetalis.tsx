import { useEffect, useState } from "react";
import { User } from "../../../types/User";
import "./FriendDetails.scss";
import noPfp from "../../../pics/no-pfp.png";
import { useNavigate } from "react-router-dom";
import { putData } from "../../../api";

type Props = {
  user: User | undefined;
  isRequest: boolean;
  friendShipId : number;
};

export const FriendDetails: React.FC<Props> = ({ user, isRequest, friendShipId }) => {
  const [imgSrc, setImgSrc] = useState<string>(noPfp);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.fileUrl) {
      import(`../../../main/resources/images/${user.fileUrl}`)
        .then((image) => setImgSrc(image.default))
        .catch(() => setImgSrc(noPfp));
    }
  }, [user]);

  const acceptFriendRequest = async () => {
    try {
      const response = await putData<{status: string}>(`friends/${friendShipId}`, {status: 'ACCEPTED'});

      console.log(response);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <div className="friendDetails">
      <div className="friendDetails__block">
        <img src={imgSrc} alt="PFP" className="friendDetails__block--img" />

        <p className="friendDetails__block--text">{`${user?.firstName} ${user?.lastName}`}</p>
      </div>

      {isRequest ? (
        <button
        className="friendDetails__button"
        onClick={acceptFriendRequest}
      >
        Accept
      </button>
      ) : (
        <button
          className="friendDetails__button"
          onClick={() => navigate(`../profile/${user?.id}`)}
        >
          See profile
        </button>
      )}
    </div>
  );
};

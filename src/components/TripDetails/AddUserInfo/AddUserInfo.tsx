import { Dispatch, SetStateAction, useEffect, useState } from "react";

import noPfp from "../../../pics/no-pfp.png";
import { User } from "../../../types/User";
import "./AddUserInfo.scss";
import { useNavigate } from "react-router-dom";

type Props = {
  user: User;
  tripId: number | undefined;
  alreadyInTrip: boolean;
  setUpdateUsers: Dispatch<SetStateAction<number>>;
};

export const AddUserInfo: React.FC<Props> = ({
  user,
  tripId,
  alreadyInTrip,
  setUpdateUsers,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(noPfp);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.fileUrl) {
      import(`../../../main/resources/images/${user.fileUrl}`)
        .then((image) => setImgSrc(image.default))
        .catch(() => setImgSrc(noPfp));
    }
  }, [user]);

  const addUserIntoTrip = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `https://tripsters.up.railway.app/trip/${tripId}/users/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
        }
      );

      setUpdateUsers((prev) => prev + 1);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addUserDetails">
      <div className="addUserDetails__block">
        <img src={imgSrc} alt="PFP" className="addUserDetails__block--img" />

        <p
          className="addUserDetails__block--text"
          onClick={() => navigate(`../profile/${user?.id}`)}
        >{`${user.firstName} ${user.lastName}`}</p>
      </div>

      {alreadyInTrip ? (
        <button className="addUserDetails__button disabled" disabled>
          Already in trip
        </button>
      ) : (
        <button className="addUserDetails__button" onClick={addUserIntoTrip}>
          Add to trip
        </button>
      )}
    </div>
  );
};

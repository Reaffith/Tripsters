import { Dispatch, SetStateAction, useEffect, useState } from "react";

import noPfp from "../../../pics/no-pfp.png";
import { User } from "../../../types/User";
import "./MemberDetail.scss";
import { useNavigate } from "react-router-dom";

type Props = {
  user: User;
  setQuery ?: Dispatch<SetStateAction<string>>
};

export const MemberDetails: React.FC<Props> = ({
  user,
  setQuery = () => {}
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`../profile/${user?.id}`);
    setQuery('')
  }

  const [userPfp, setUserPfp] = useState<Blob>();

  useEffect(() => {
    const getPhoto = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch(
          `http://localhost:8088/uploads/images/${user?.fileUrl}`, {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch photo: ${response.statusText}`);
        }

        return await response.blob();
      } catch (error) {
        console.error("Error fetching photo:", error);
        throw error;
      }
    };

    if (user) {
      getPhoto().then(response => {
        setUserPfp(response);
        console.log(response);
      })
    }
  }, [user]);

  return (
    <div className="memberDetails">
      <div className="memberDetails__block">
        <img src={userPfp ? URL.createObjectURL(userPfp) : noPfp} alt="PFP" className="memberDetails__block--img" />

        <p
          className="memberDetails__block--text"
          onClick={onClick}
        >{`${user.firstName} ${user.lastName}`}</p>
      </div>
    </div>
  );
};

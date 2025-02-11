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
  const [imgSrc, setImgSrc] = useState<string>(noPfp);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.fileUrl) {
      import(`../../../main/resources/images/${user.fileUrl}`)
        .then((image) => setImgSrc(image.default))
        .catch(() => setImgSrc(noPfp));
    }
  }, [user]);

  const onClick = () => {
    navigate(`../profile/${user?.id}`);
    setQuery('')
  }

  return (
    <div className="memberDetails">
      <div className="memberDetails__block">
        <img src={imgSrc} alt="PFP" className="memberDetails__block--img" />

        <p
          className="memberDetails__block--text"
          onClick={onClick}
        >{`${user.firstName} ${user.lastName}`}</p>
      </div>
    </div>
  );
};

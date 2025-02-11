import { useNavigate } from "react-router-dom";
import { Trip } from "../../../../types/Trip";

import "./TripInfo.scss";
import { getPlacePhoto } from "../../../../functions/getPlacesPhoto";
import { useEffect, useState } from "react";

import { BsPeopleFill } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import { FaRoute } from "react-icons/fa6";
import { TfiMoreAlt } from "react-icons/tfi";
import { DateToString, stringToDate } from "../../../../functions/dateManager";
import { User } from "../../../../types/User";
import { getData } from "../../../../api";

type Params = {
  trip: Trip;
};

export const TripInfo: React.FC<Params> = ({ trip }) => {
  const {
    destination,
    startDate,
    startPoint,
    endDate,
    endPoint,
    additionalPoints,
    id,
  } = trip;

  const [owner, setOwner] = useState<User>();
  const [members, setMembers] = useState<User[]>([]);

  const getOwner = async () => {
    await getData(`trip/owner/${id}`).then(re => {
      if (re) {
        setOwner(re);
      }
    })
  }

  const getMembers = async () => {
    await getData(`trip/users/all/${id}`).then(re => {
      if (re) {
        setMembers(re);
      }
    })
  }

  useEffect(() => {
    getOwner();
  }, [])

  useEffect(() => {
    getMembers();
  }, [])

  const navigate = useNavigate();

  const goToTrip = () => {
    navigate(`../tripDetails/${id}/map`);
  };

  const [photoUrl, setPhotoUrl] = useState<string | undefined>();

  const fetchPhoto = async () => {
    const photo = await getPlacePhoto(endPoint);
    setPhotoUrl(photo);
  };

  useEffect(() => {
    fetchPhoto();
  }, []);

  const [status, setStatus] = useState<"Incoming" | "In progres" | "Completed">(
    "Incoming"
  );

  useEffect(() => {
    const date = new Date();
    console.log(stringToDate(endDate))

    if (stringToDate(startDate) > date) {
      setStatus("Incoming");
    } else if (stringToDate(endDate) < date) {
      setStatus("Completed");
    } else {
      setStatus("In progres");
    }
  }, []);


  return (
    <div className="trip">
      <div className="trip__pic">
        <img
          src={photoUrl ? photoUrl : ""}
          alt={endPoint}
          className="trip__pic--picture"
        />
      </div>

      <div className="trip-info">
        <div className="trip__top">
          <h2 className="trip__top--name">{destination}</h2>

          <h2 className="trip__top--date">
            {`${DateToString(stringToDate(startDate))} to ${DateToString(stringToDate(endDate))}`}
          </h2>
        </div>

        <div className="trip__bottom">
          <div className="trip__bottom-block">
            <div className="trip__bottom-block-part1">
              <div className="trip__bottom-block-part1--members">
                <BsPeopleFill />

                <p className="trip__bottom-block-part1--members--text">
                  {`${owner?.firstName} and ${members.length - 1} friend${
                    members.length > 2 ? "s" : ""
                  }`}
                </p>
              </div>

              <div className="trip__bottom-block-part1--status">
                <FaCircleInfo />

                <p className="trip__bottom-block-part1--status--text">
                  Status: {status.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="trip__bottom-block-part2">
              <div className="trip__bottom-block-part2--route">
                <FaRoute />

                <p className="trip__bottom-block-part2--route--text">
                  {`${startPoint} to ${endPoint}`}
                </p>
              </div>

              <div className="trip__bottom-block-part2--additional">
                <TfiMoreAlt />

                <p className="trip__bottom-block-part2--additional--text">
                  {`${additionalPoints.length} more stops`}
                </p>
              </div>
            </div>
          </div>

          <button className="trip__bottom--button" onClick={goToTrip}>
            See details
          </button>
        </div>
      </div>
    </div>
  );
};

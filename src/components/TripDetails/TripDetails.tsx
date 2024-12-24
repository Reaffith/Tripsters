import { useEffect, useState } from "react";
import { MapComponent } from "./MapComponent/MapComponent";

import "./TripDetails.scss";
import { useParams } from "react-router-dom";
import { Trip } from "../../types/Trip";
import { getAllusersInTrip, getTrips } from "../../api";
import { DateToString, stringToDate } from "../../functions/dateManager";
import { User } from "../../types/User";
import { ChatComponent } from "./ChatComponent/ChatComponent";

export const TripDetails = () => {
  const { id } = useParams();
  const [isMapVisible, changeIsMapVisible] = useState(true);
  const [isChatVisible, changeIsChatVisible] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [trip, setTrip] = useState<Trip>();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getTrips().then((data) => {
      if (data) {
        setTrips(data);
      } else {
        console.error("No trips loaded");
      }
    });
  }, []);

  useEffect(() => {
    setTrip(trips.filter((t) => t.id === Number(id))[0]);
  });

  useEffect(() => {
    if (id) {
      getAllusersInTrip(id).then((data) => setUsers(data));
    }
  }, []);

  const showMap = () => {
    changeIsMapVisible(true);
    changeIsChatVisible(false);
  };

  const showChat = () => {
    changeIsMapVisible(false);
    changeIsChatVisible(true);
  };

  const getNavItemStyle = (isVisible: boolean) => {
    if (isVisible) {
      return { color: "#309C4D" };
    } else {
      return { color: "#757575" };
    }
  };

  const [status, setStatus] = useState<"Incoming" | "In progres" | "Completed">(
    "Incoming"
  );

  useEffect(() => {
    const date = new Date();

    if (trip) {
      if (stringToDate(trip.startDate) < date) {
        setStatus("Incoming");
      } else if (stringToDate(trip.endDate) > date) {
        setStatus("Completed");
      } else {
        setStatus("In progres");
      }
    }
  }, [trip]);

  const [isAdd, setIsAdd] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case "In progres":
        return "#309C4D";

      case "Completed":
        return "#9C304E";

      default:
        return "#8C8C8C";
    }
  };

  useEffect(() => {
    if (isAdd) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isAdd]);

  return (
    <>
      {isAdd && (
        <div className="add" onClick={() => setIsAdd(false)}>
          <div
            className="add__block"
            onClick={e => e.stopPropagation()}
          >
            <p className="add__block--header">Add an user to your trip</p>

            <div className="add__block--users"></div>
          </div>
        </div>
      )}
      <main className="trip-details">
        <div className="trip-details__block1">
          <h2 className="trip-details__block1--header">{trip?.destination}</h2>

          <div className="trip-details__block1--route">
            <h3 className="trip-details__block1--route--item">
              From : {trip?.startPoint}
            </h3>

            <h3 className="trip-details__block1--route--item">
              {trip?.additionalPoints.length} additional points
            </h3>

            <h3 className="trip-details__block1--route--item">
              To : {trip?.endPoint}
            </h3>
          </div>

          <div className="trip-details__block1--members">
            <h3 className="trip-details__block1--members--header">
              {users.length} members
            </h3>
            <div className="trip-details__block1--members--block"></div>
          </div>

          <div className="trip-details__block1--date">
            <h3 className="trip-details__block1--date--item">
              Start on : {trip && DateToString(stringToDate(trip.startDate))}
            </h3>
            <h3 className="trip-details__block1--date--item">
              Finish on : {trip && DateToString(stringToDate(trip.endDate))}
            </h3>
          </div>
        </div>

        <div className="trip-details__block2">
          <div className="trip-details__block2--info">
            <div className="trip-details__block2--info--left">
              <h1 className="trip-details__block2--info--left--header">
                {trip?.destination}
              </h1>

              <p className="trip-details__block2--info--left--status">
                <div
                  className="trip-details__block2--info--left--status--circle"
                  style={{ backgroundColor: getStatusColor() }}
                ></div>

                {status}
              </p>
            </div>

            <button
              className="trip-details__block2--info--add"
              onClick={() => setIsAdd(true)}
            >
              Add user into trip
            </button>
          </div>

          <div className="trip-details__block2--nav">
            <p
              className="trip-details__block2--nav--item"
              onClick={showMap}
              style={getNavItemStyle(isMapVisible)}
            >
              Map
            </p>

            <p
              className="trip-details__block2--nav--item"
              onClick={showChat}
              style={getNavItemStyle(isChatVisible)}
            >
              Chat
            </p>
          </div>

          <div className="trip-details__block2--content">
            {isMapVisible && trip && (
              <MapComponent
                startPoint={trip.startPoint}
                finishPoint={trip.endPoint}
                additionalPoints={trip.additionalPoints}
              />
            )}

            {isChatVisible && <ChatComponent/>}
          </div>
        </div>
      </main>
    </>
  );
};

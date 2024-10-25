import { useState } from "react";
import { MapComponent } from "./MapComponent/MapComponent";

import "./TripDetails.scss";

export const TripDetails = () => {
  const [isMapVisible, changeIsMapVisible] = useState(true);
  const [isChatVisible, changeIsChatVisible] = useState(false);

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
      return { borderColor: "#36453B" };
    } else {
      return { borderColor: "lightblue" };
    }
  };

  return (
    <main className="trip-details">
      <div className="trip-details__block1">
        <h2 className="trip-details__block1--header">trip_name</h2>

        <div className="trip-details__block1--route">
          <h3 className="trip-details__block1--route--item">
            From : startPoint
          </h3>

          <h3 className="trip-details__block1--route--item">
            N additional points
          </h3>

          <h3 className="trip-details__block1--route--item">
            To : Finish point
          </h3>
        </div>

        <div className="trip-details__block1--members">
          <h3 className="trip-details__block1--members--header">n members</h3>
          <div className="trip-details__block1--members--block"></div>
        </div>

        <div className="trip-details__block1--date">
          <h3 className="trip-details__block1--date--item">
            Start on : start date
          </h3>
          <h3 className="trip-details__block1--date--item">
            Finish on : finish date
          </h3>
        </div>
      </div>

      <div className="trip-details__block2">
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
          {isMapVisible && (
            <MapComponent
              startPoint="Kyiv, Ukraine"
              finishPoint="Paris, France"
              additionalPoints={["Berlin, Germany", "Amsterdam, Netherlands"]}
            />
          )}

          {isChatVisible && <div> chat component </div>}
        </div>
      </div>
    </main>
  );
};

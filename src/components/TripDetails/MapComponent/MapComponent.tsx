import { useState, useEffect } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

import "./mapComponent.scss";
import { getCoordinates } from "../../../functions/getCoordinates";
import PlacesAutocomplete from "react-places-autocomplete";

type Params = {
  startPoint: string;
  finishPoint: string;
  additionalPoints: string[];
};

function getRouteCenter(route: { lat: number; lng: number }[]) {
  const total = route.length;

  const sumCoords = route.reduce(
    (acc, coord) => {
      return {
        lat: acc.lat + coord.lat,
        lng: acc.lng + coord.lng,
      };
    },
    { lat: 0, lng: 0 }
  );

  return {
    lat: sumCoords.lat / total,
    lng: sumCoords.lng / total,
  };
}

export const MapComponent: React.FC<Params> = ({
  startPoint,
  finishPoint,
  additionalPoints = [],
}) => {
  const [startPointCoordinates, setStartPointCoordinates] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const [finishPointCoordinates, setFinishPointCoordinates] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const [additionalPointsCoordinates, setAdditionalPointsCoordinates] =
    useState<{ lat: number; lng: number }[]>([]);

  const [centerCoordinates, setCenterCoordinates] = useState<{
    lat: number;
    lng: number;
  }>();

  
  const [suggest, setSuggest] = useState("");


  useEffect(() => {
    getCoordinates(startPoint)
      .then((coords) => setStartPointCoordinates(coords))
      .catch((e) => console.log(e));

    getCoordinates(finishPoint)
      .then((coords) => setFinishPointCoordinates(coords))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const fetchAdditionalCoordinates = async () => {
      const coordinates = await Promise.all(
        additionalPoints.map((point) =>
          getCoordinates(point).catch((e) => {
            console.log(e);
            return null;
          })
        )
      );

      setAdditionalPointsCoordinates(
        coordinates.filter((coord) => coord !== null)
      );
    };

    fetchAdditionalCoordinates();
  }, [additionalPoints]);

  useEffect(() => {
    setCenterCoordinates(
      getRouteCenter([
        startPointCoordinates,
        ...additionalPointsCoordinates,
        finishPointCoordinates,
      ])
    );
  }, [
    startPointCoordinates,
    finishPointCoordinates,
    additionalPointsCoordinates,
  ]);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: startPointCoordinates,
        destination: finishPointCoordinates,
        waypoints: additionalPointsCoordinates.map((coords) => ({
          location: coords,
          stopover: true,
        })),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          setDirections(response);
        } else {
          console.error("Directions request failed", response);
        }
      }
    );
  }, [
    additionalPointsCoordinates,
    startPointCoordinates,
    finishPointCoordinates,
  ]);

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerCoordinates}
        zoom={5}
        options={{ streetViewControl: false }}
      >
        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions,
            }}
          />
        )}
      </GoogleMap>

      <div className="suggest">
        <label className="suggest--header">Suggest to add a poit</label>

        <PlacesAutocomplete
          value={suggest}
          onChange={setSuggest}
          onSelect={(v) => setSuggest(v)}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="suggest-block">
              <div>
                <input
                  id="suggestion"
                  {...getInputProps({
                    placeholder: "Select place",
                  })}
                />
                <div
                  className="suggestions"
                  style={{
                    position: "relative",
                    borderRadius: "10px",
                    width: "100%",
                  }}
                >
                  {loading ? <div>Loading...</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = suggestion.active
                      ? {
                          width: "100%",
                          backgroundColor: "#ECF9EF",
                          cursor: "pointer",
                          padding: "8px 12px",
                          borderRadius: "20px",
                        }
                      : {
                          width: "100%",
                          cursor: "pointer",
                          padding: "8px 12px",
                          backgroundColor: "white",
                        };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { style })}
                        key={suggestion.placeId}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
              <button className="suggest-block--button">Submit</button>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    </div>
  );
};

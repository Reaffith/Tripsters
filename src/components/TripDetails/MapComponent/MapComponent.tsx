import { useState, useEffect } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

import "./mapComponent.scss";
import PlacesAutocomplete from "react-places-autocomplete";

type Params = {
  startPoint: string;
  finishPoint: string;
  additionalPoints: string[];
};

async function getCoordinates(
  place: string
): Promise<{ lat: number; lng: number }> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      place
    )}&key=AIzaSyArB1rBwI5SEnm4_5UkvO50tFUqK0bT24M`
  );
  const data = await response.json();
  if (data.results.length > 0) {
    const location = data.results[0].geometry.location;
    return {
      lat: location.lat,
      lng: location.lng,
    };
  } else {
    throw new Error("Місце не знайдено");
  }
}

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

    additionalPoints.map((point) =>
      getCoordinates(point)
        .then((coords) =>
          setAdditionalPointsCoordinates((perv) => [...perv, coords])
        )
        .catch((e) => console.log(e))
    );
  }, []);

  useEffect(() => {
    setCenterCoordinates(
      getRouteCenter([
        ...additionalPointsCoordinates,
        startPointCoordinates,
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
                <div className="suggestions">
                  {loading ? <div>Loading...</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = suggestion.active
                      ? { backgroundColor: "#a8dadc", cursor: "pointer" }
                      : { backgroundColor: "white", cursor: "pointer" };
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

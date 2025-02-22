import { useEffect, useState } from "react";
import { NoTrips } from "./NoTrips/NoTrips";
import { TripsList } from "./TripsList/TripList";
import { getTrips } from "../../api";

export const TripsPage = () => {
  const [tripsCount, setTripsCount] = useState(0);

  useEffect(() => {
    getTrips().then(r => setTripsCount(r.length))
  }, [])

  return <main>{tripsCount > 0 ? <TripsList /> : <NoTrips />}</main>;
};

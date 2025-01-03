import { TripInfo } from "./TripInfo/TripInfo";
import "./TripList.scss";
import { Trip } from "../../../types/Trip";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { stringToDate } from "../../../functions/dateManager";
import { getNumbers } from "../../../functions/getNumbers";
import classNames from "classnames";
import { getTrips } from "../../../api";

type FilterOptions = "ALL" | "COMPLETED" | "INCOMING" | "IN PROGRESS";

export const TripsList = () => {
  // const [trips, setTrips] = useState<Trip[]>([]);
  const [filter, setFilter] = useState<FilterOptions>("ALL");
  const [isDropDown, setIsDropDown] = useState(false);
  const [paging, setPaging] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [tripsToRender, setTripsToRender] = useState<Trip[]>([]);
 
  // useEffect(() => {
  //   getTrips().then(data => {
  //     if (data) {
  //       setTrips(data);
  //     } else {
  //       console.error('No trips data returned from API.');
  //     }
  //   });
  // }, []);

  const showDropDown = () => {
    setIsDropDown(true);
  };

  const hideDropDown = () => {
    setIsDropDown(false);
  };

  const tripFilter = (trip: Trip) => {
    const today = new Date();


    switch (filter) {
      case "COMPLETED": {
        if (stringToDate(trip.endDate) <= today) {
          return true;
        } else {
          return false;
        }
      }

      case "INCOMING": {
        if (stringToDate(trip.startDate) >= today) {
          return true;
        } else {
          return false;
        }
      }

      case "IN PROGRESS": {
        if (
          stringToDate(trip.startDate) <= today &&
          stringToDate(trip.endDate) >= today
        ) {
          return true;
        } else {
          return false;
        }
      }

      default: {
        return true;
      }
    }
  };

  const getTripsToRender = (trips: Trip[]) => {
    const filteredTrips = trips
      .filter((trip) => tripFilter(trip))
      .sort((a, b) => {
        return (
          stringToDate(b.startDate).getTime() -
          stringToDate(a.startDate).getTime()
        );
      });

    if (filteredTrips.length > 5) {
      const numOfPages = Math.ceil(filteredTrips.length / 5);
      setPaging(getNumbers(numOfPages));

      const render = [];

      for (let i = 0; i < 5; i++) {
        if (page === 1) {
          if (filteredTrips[i]) {
            render.push(filteredTrips[i]);
          }
        } else {
          if (filteredTrips[i + (page - 1) * 5]) {
            render.push(filteredTrips[i + (page - 1) * 5]);
          }
        }
      }

      setTripsToRender(render);
    } else {
      setTripsToRender(filteredTrips);
      console.log(filteredTrips)
      setPaging([]);
    }
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const trips = await getTrips();

        return getTripsToRender(trips);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTrips();
  }, [page, filter]);

  useEffect(() => {
    console.log(tripsToRender)
  }, [tripsToRender])

  return (
    <main className="triplist">
      <h1 className="triplist__header">My Trips</h1>

      <div
        className="triplist__filter"
        tabIndex={0}
        onClick={showDropDown}
        onBlur={hideDropDown}
      >
        <div className="triplist__filter--block">
          <p className="triplist__filter--block--current">
            {filter === "ALL" ? "All trips" : filter}
          </p>

          <div className="triplist__filter--block--dropdown">
            <IoMdArrowDropdown />
          </div>
        </div>

        <div
          className="triplist__filter--options"
          style={
            isDropDown
              ? { opacity: "1", pointerEvents: "all" }
              : { opacity: "0", pointerEvents: "none" }
          }
        >
          <p
            className="triplist__filter--options--item"
            onClick={() => {
              setFilter("ALL");
              hideDropDown();
            }}
          >
            All trips
          </p>

          <p
            className="triplist__filter--options--item"
            onClick={() => {
              setFilter("INCOMING");
              hideDropDown();
            }}
          >
            Incoming
          </p>

          <p
            className="triplist__filter--options--item"
            onClick={() => {
              setFilter("IN PROGRESS");
              hideDropDown();
            }}
          >
            In progress
          </p>

          <p
            className="triplist__filter--options--item"
            onClick={() => {
              setFilter("COMPLETED");
              hideDropDown();
            }}
          >
            Completed
          </p>
        </div>
      </div>

      <div className="triplist__list">
        {tripsToRender.map((trip) => {
          console.log(trip);

          return (
            <TripInfo trip={trip} key={trip.id }/>
          )
        })}

        {paging.length > 1 && (
          <div className="triplist__list--paging">
            {paging.map((pa) => (
              <p 
                key={pa}
                onClick={() => setPage(pa)}
                className={classNames("triplist__list--paging--item", {
                  active: page === pa,
                })}
              >
                {pa}
              </p>
            ))}
          </div>
        )}
      </div>

      <Link to={"create"} className="triplist__button">
        Create trip
      </Link>
    </main>
  );
};

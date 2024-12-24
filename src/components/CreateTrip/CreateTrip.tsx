import { useEffect, useState } from "react";
import "./CreateTrip.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlacesAutocomplete from "react-places-autocomplete";
import { IoCloseCircleOutline } from "react-icons/io5";
import { createTrip } from "../../api";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";
import { formatDateToISO } from "../../functions/dateManager";
import { useNavigate } from "react-router-dom";

export const CreateTrip = () => {
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [startPoint, setStartPoint] = useState("");
  const [finishPoint, setFinishPoint] = useState("");
  const [additionalPoint, setAdditionalPoint] = useState("");
  const [aditionalPointsArray, setAdditionalPointsArray] = useState<string[]>(
    []
  );
  const [error, setError] = useState("");
  const [isErorr, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (startDate === null) {
      setStartDate(new Date());
    }
  }, [startDate]);

  async function onCreateTrip() {
    if (!startPoint.length) {
      setError("Please select start point");
    } else if (!finishPoint.length) {
      setError("Please select finish point");
    } else if (finishDate === null) {
      setError("Please select finish date");
    } else if (startDate === null) {
      setError("Please select start date");
    } else if (!tripName.length) {
      setTripName(`Trip to ${finishPoint}`);
    } else {
      createTrip({
        destination: tripName,
        startDate: formatDateToISO(startDate),
        endDate: formatDateToISO(finishDate),
        startPoint: startPoint,
        endPoint: finishPoint,
        additionalPoints: aditionalPointsArray,
      })
        .then((data) => {
          if (data && data.id) {
            navigate(`../../tripDetails/${data.id}`);
          } else {
            console.error("Trip creation failed: Missing data ID");
          }
        })
        .catch((error) => {
          console.error("Error creating trip:", error);
        });      
    }
  }

  useEffect(() => {
    if (error.length > 0) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [error]);

  return (
    <main className="createTrip">
      {isErorr && (
       <ErrorBlock error={error} setError={setError} />
      )}

      <h1 className="createTrip__header">Create a new trip!</h1>

      <div className="createTrip__block">
        <label htmlFor="name" className="createTrip__block--label">
          Name*
        </label>
        <input
          type="text"
          className="createTrip__block--input"
          placeholder="Enter trip name"
          id="name"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
        />
      </div>

      <div className="createTrip__block double--block">
        <div className="createTrip__block--doubleBlock">
          <label htmlFor="date" className="createTrip__block--label">
            Start date*
          </label>

          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a start date"
          />
        </div>

        <div className="createTrip__block--doubleBlock">
          <label htmlFor="date" className="createTrip__block--label">
            Finish date
          </label>

          <DatePicker
            selected={finishDate}
            onChange={(date: Date | null) => setFinishDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a start date"
          />
        </div>
      </div>

      <div className="createTrip__block double--block">
        <div className="createTrip__block--doubleBlock">
          <label htmlFor="startPoint" className="createTrip__block--label">
            Start point*
          </label>

          <PlacesAutocomplete
            value={startPoint}
            onChange={setStartPoint}
            onSelect={(v) => setStartPoint(v)}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  id="startPoint"
                  {...getInputProps({
                    placeholder: "Select start location",
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
            )}
          </PlacesAutocomplete>
        </div>

        <div className="createTrip__block--doubleBlock">
          <label htmlFor="finishPoint" className="createTrip__block--label">
            Finish point
          </label>

          <PlacesAutocomplete
            value={finishPoint}
            onChange={setFinishPoint}
            onSelect={(v) => setFinishPoint(v)}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  id="finishPoint"
                  {...getInputProps({
                    placeholder: "Select finish location",
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
            )}
          </PlacesAutocomplete>
        </div>
      </div>

      <div className="createTrip__block additinal-block">
        <label htmlFor="additionalPoints" className="createTrip__block--label">
          Additional points
        </label>

        <PlacesAutocomplete
          value={additionalPoint}
          onChange={setAdditionalPoint}
          onSelect={(v) => {
            setAdditionalPointsArray((prev) => [...prev, v]);
            setAdditionalPoint("");
          }}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="additional-search">
              <input
                id="additionalPoints"
                {...getInputProps({
                  placeholder: "Add location to your trip",
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
          )}
        </PlacesAutocomplete>

        <div className="additional-block">
          {aditionalPointsArray.map((value) => (
            <div className="additional-block-element">
              <p className="additional-block-element--text">{value}</p>
              <p
                className="additional-block-element--button"
                onClick={() => {
                  setAdditionalPointsArray((prev) =>
                    prev.filter((v) => v !== value)
                  );
                }}
              >
                <IoCloseCircleOutline />
              </p>
            </div>
          ))}
        </div>
      </div>

      <button className="createTrip__button" onClick={onCreateTrip}>
        Create trip
      </button>
    </main>
  );
};

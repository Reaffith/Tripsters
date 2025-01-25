import { useParams } from "react-router-dom";
import "./VoteComponent.scss";
import { useEffect, useState } from "react";
import { User } from "../../../../types/User";
import { getAllusersInTrip, getTrips, updateTrip } from "../../../../api";
import { Trip } from "../../../../types/Trip";

type Params = {
  vote: {
    id: number;
    tripId: number;
    title: string;
    voteOptions: {
      id: number;
      optionText: string;
      count: number;
    }[];
  };
};

export const VoteComponent: React.FC<Params> = ({ vote }) => {
  const { id } = useParams();
  const totalCount = vote.voteOptions.reduce(
    (sum, option) => sum + option.count,
    0
  );

  const [users, setUsers] = useState<User[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [trip, setTrip] = useState<Trip>();

  useEffect(() => {
    getAllusersInTrip(id ? id : "0").then((response) => setUsers(response));
  }, [id]);

  useEffect(() => {
    getTrips().then((response: Trip[]) =>
      setTrip(response.filter((t) => t.id === (id ? +id : 0))[0])
    );
  }, [id]);

  const isFinished = () => {
    for (let i = 0; i < vote.voteOptions.length; i++) {
      if (vote.voteOptions[i].count > users.length / 2) {
        setIsDisabled(true);

        if (i === 0) {
          sendVote();
        }
      }
    }

    if (
      totalCount === users.length &&
      vote.voteOptions[0].count === vote.voteOptions[1].count
    ) {
      if (Math.random() < 0.5) {
        sendVote();
      }
    }
  };

  const sendVote = async () => {
    if (trip) {
      const updatedTrip = {
        id: trip.id,
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        startPoint: trip.startPoint,
        endPoint: trip.endPoint,
        additionalPoints: trip.additionalPoints.includes(vote.title)
          ? trip.additionalPoints
          : [...trip.additionalPoints, vote.title],
      };
  
      await updateTrip(updatedTrip);
    }
  };

  useEffect(() => {
    isFinished();
  }, [id, vote, trip]);

  return (
    <div className="vote">
      <p className="vote__title">{`Do you want to add ${vote.title} to the trip route`}</p>

      <div className="vote__options">
        {vote.voteOptions.map((voteOption) => (
          <div className="vote__options--option">
            <p className="vote__options--option--title">
              {voteOption.optionText}
            </p>

            <div className="vote__options--option--line">
              <div
                className="vote__options--option--line--color"
                style={{
                  width:
                    totalCount !== 0
                      ? `${((voteOption.count / totalCount) * 100).toString()}%`
                      : 0,
                }}
              >
                {""}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="vote__total">{`${totalCount} voted`}</p>
    </div>
  );
};

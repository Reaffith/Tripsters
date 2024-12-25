import { useParams } from "react-router-dom";
import "./ProfilePage.scss";
import { useEffect, useState } from "react";
import { User } from "../../types/User";
import { getAllUsers, getData } from "../../api";
import noPfp from "../../pics/home-block1.png";

export const ProfilePage = () => {
  const { id } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    getData("users/current").then(setCurrentUser);
  }, []);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        if (response && typeof response !== "number") {
          setUsers(response);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    setUser(users.filter((u) => u.id === Number(id))[0]);
  }, [users]);

  console.log(user, user?.fileURL);

  return (
    <>
      {user && (
        <main className="profile">
          <div className="profile__top">
            <img
              src={
                !user.fileURL
                  ? noPfp
                  : `../../main/resources/images/${user.fileURL}`
              }
              alt="PFP"
              className="profile__top--pic"
            />

            <div className="profile__top--info">
              <h1 className="profile__top--info--name">
                {`${user.firstName} ${user.lastName}`}
              </h1>

              <p className="profile__top--info--stat">
                n friends
              </p>

              <p className="profile__top--info--stat">
                n trips
              </p>
            </div>

            {currentUser ? (
              currentUser.id === user.id ? (
                <button className="profile__top--button">Edit profile</button>
              ) : (
                <button className="profile__top--button">Send friend request</button>
              )
            ) : (
              <div className="profile__top--button">{` `}</div>
            )}
          </div>
        </main>
      )}
    </>
  );
};

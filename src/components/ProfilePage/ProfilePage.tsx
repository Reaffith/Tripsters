import { useParams } from "react-router-dom";
import "./ProfilePage.scss";
import { useEffect, useState } from "react";
import { User } from "../../types/User";
import { getAllUsers, getData, getUsersFriends } from "../../api";
import noPfp from "../../pics/no-pfp.png";


export const ProfilePage = () => {
  const { id } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [friendRequests, setFriendRequests] = useState<
    {
      id: number;
      userId: number;
      friendId: number;
      status: string;
      createdAt: Date;
    }[]
  >([]);

  useEffect(() => {
    getUsersFriends().then((res) => {
      if (res && typeof res !== "number") {
        setFriendRequests(res);
      }
    });
  }, []);

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
  }, [users, id]);

  const [imgSrc, setImgSrc] = useState<string>(noPfp);

  useEffect(() => {
    if (user && user.fileUrl) {
      import(`../../main/resources/images/${user.fileUrl}`)
        .then((image) => setImgSrc(image.default))
        .catch(() => setImgSrc(noPfp));
    }
  }, [user]);

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const postPhoto = async () => {
    console.log(file);
    const token = localStorage.getItem("authToken");

    if (file !== null) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:8088/uploads/images", {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        console.log(response);

        return response.text();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };


  return (
    <>
      {user && (
        <main className="profile">
          <div className="profile__top">
            <img src={imgSrc} alt="PFP" className="profile__top--pic" />

            <div className="profile__top--info">
              <h1 className="profile__top--info--name">
                {`${user.firstName} ${user.lastName}`}
              </h1>

              <p className="profile__top--info--stat">n friends</p>

              <p className="profile__top--info--stat">n trips</p>
            </div>

            {currentUser ? (
              currentUser.id === user.id ? (
                <button className="profile__top--button">Edit profile</button>
              ) : (
                <button
                  className="profile__top--button"
                  disabled={
                    friendRequests.filter(
                      (req) =>
                        req.friendId === currentUser.id ||
                        req.userId === user.id
                    ).length > 0
                  }
                >
                  Send friend request
                </button>
              )
            ) : (
              <div className="profile__top--button">{` `}</div>
            )}
          </div>
          <input id="file" type="file" onChange={handleFileChange} />

          <button onClick={postPhoto}>Upload photo</button>
        </main>
      )}
    </>
  );
};

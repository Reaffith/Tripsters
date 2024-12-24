import { useParams } from 'react-router-dom';
import './ProfilePage.scss';
import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { getAllUsers, getData } from '../../api';
import noPfp from '../../pics/no-pfp.webp';

export const ProfilePage = () => {
  const {id} = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
      getData("users/current").then(setCurrentUser);
    }, []);

  useEffect(() => {
    getAllUsers().then(response => {
      if (response && typeof response !== 'number') {
        setUsers(response);
      }
    }).catch(e => console.error(e));
  }, []);

  useEffect(() => {
    setUser(users.filter(u => u.id === Number(id))[0]);
  }, [users]);

  return (
    <>
      {user && (
        <main className="profile">
          <img src={user.fileURL === null ? noPfp : `../../main/resources/images/${user.fileURL}`} alt="PFP" />
        </main>
      )}
    </>
  );
}
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import { Home } from "./home/Home";
import { TripsPage } from "./TripsPage/TripsPage";
import { CreateTrip } from "./CreateTrip/CreateTrip";
import { TripDetails } from "./TripDetails/TripDetails";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import { LoginPage } from "./RegisterPage/LoginPage";
import { ProfilePage } from "./ProfilePage/ProfilePage";
import { FriendList } from "./FriendList/FriendList";

export const RouteManager = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to="/" />}></Route>
          <Route index element={<Home />} />
          <Route path="trips" element={<TripsPage />}></Route>
          <Route path="trips/create" element={<CreateTrip />}></Route>
          <Route path="tripDetails/:id" element={<TripDetails/>}></Route>
          <Route path="auth/">
            <Route path="login" element={<LoginPage/>}></Route>
            <Route path="reg" element={<RegisterPage/>}></Route>
          </Route>
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="friends" element={<FriendList/>} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

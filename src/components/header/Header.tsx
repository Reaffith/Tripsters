import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../../pics/logo.svg";

import "./Header.scss";
import { useEffect, useState } from "react";
import { getData } from "../../api";
import { User } from "../../types/User";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");

  const changeLanguage = (lng: "en" | "ua") => {
    i18n.changeLanguage(lng); // Change the language dynamically
  };

  const navigate = useNavigate();

  const regButtonClick = () => {
    navigate("auth/login");
  };

  const [user, setUser] = useState<User | undefined>();
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    getData("users/current").then(setUser);
  }, []);

  return (
    <div className="header">
      <Link to="/" className="header__link logo">
        <img src={Logo} alt="Logo" className="header__link--pic" />
      </Link>

      <div className="header__linkBlock">
        <Link to="/trips/create" className="header__linkBlock--link">
          Create
        </Link>

        <Link to="/trips" className="header__linkBlock--link">
          {t("header_yourTrips")}
        </Link>

        <Link to="/friends" className="header__linkBlock--link">
          Friends
        </Link>

        <Link to={user ? `profile/${user.id}` : '/auth/reg'} className="header__linkBlock--link">
          {t("header_profile")}
        </Link>

        <input
          type="text"
          placeholder={t("header_search")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="header__block">
        <div className="header__block--lang">
          <p
            className="header__block--lang--option"
            onClick={() => changeLanguage("en")}
            style={{ cursor: "pointer" }}
          >
            EN
          </p>
          <p className="header__block--lang--option">/</p>
          <p
            className="header__block--lang--option"
            onClick={() => changeLanguage("ua")}
            style={{ cursor: "pointer" }}
          >
            UA
          </p>
        </div>

        {user ? (
          <div
            className="header_user"
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
          >
            <Link
              to={`/profile/${user.id}`}
              className="header_user"
            >{`${user.firstName} ${user.lastName}`}</Link>

            <div
              className="header_user--options"
              style={
                mouseOver
                  ? {
                      opacity: "1",
                      position: "absolute",
                      backgroundColor: "#ECF9EF",
                      cursor: 'pointer',
                      borderRadius: '20px',
                      padding: '10px 20px'
                    }
                  : {
                      opacity: "0",
                      position: "absolute",
                      pointerEvents: "none",
                    }
              }
              onClick={() => {
                localStorage.removeItem("authToken");
                window.location.reload();
              }}
            >
              Log out
            </div>
          </div>
        ) : (
          <div className="header__block--sign" onClick={regButtonClick}>
            <p>{t("header_login")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

import { useState } from "react";
import { registerUser } from "../../api";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";

import "./RegisterPage.scss";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState("");

  async function onButtonClick() {
    localStorage.removeItem("authToken");

    if (
      email.length < 3 ||
      password.length < 3 ||
      password !== repeatPassword ||
      firstName.length < 1 ||
      lastName.length < 1
    ) {
      setError("Please check your input and try again.");
      return;
    }

    const userData = {
      email,
      password,
      repeatPassword,
      firstName,
      lastName,
    };

    await registerUser(userData);
  }

  return (
    <>
      {error.length > 1 && <ErrorBlock error={error} setError={setError} />}
      <main className="register">
        <h1 className="register__header">Register</h1>
        <form className="register__form" autoComplete="off">
          <label htmlFor="email" className="register__form--label">
            Email
          </label>
          <input
            className="register__form--input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            placeholder="Enter your email"
          />

          <div className="register__form--block">
            <div className="">
              <label htmlFor="password" className="register__form--label">
                Password
              </label>
              <input
                className="register__form--input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='off'
                placeholder="Enter your password"
              />
            </div>

            <div className="">
              {" "}
              <label htmlFor="repeatPassword" className="register__form--label">
                Repeat passwrod
              </label>
              <input
                className="register__form--input"
                id="repeatPassword"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                autoComplete='off'
                placeholder="Repeat your password"
              />
            </div>
          </div>

          <div className="register__form--block">
            <div className="">
              <label htmlFor="firstName" className="register__form--label">
                First name
              </label>
              <input
                className="register__form--input"
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete='off'
                placeholder="Enter your first name"
              />
            </div>

            <div className="">
              <label htmlFor="lastName" className="register__form--label">
                Last name
              </label>
              <input
                className="register__form--input"
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete='off'
                placeholder="Enter your last name"
              />
            </div>
          </div>
        </form>
        <button onClick={onButtonClick} className="register__button">
          register
        </button>
      </main>
    </>
  );
};

import { useEffect, useState } from "react";
import { registerUser } from "../../api";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState<undefined | string>();

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

  useEffect(() => {
    if (error) {
      console.log(error);
      setError(undefined);
    }
  }, [error]);

  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  return (
    <main>
      <form>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="repeatPassword">repeat passwrod</label>
        <input
          id="repeatPassword"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <label htmlFor="firstName">first name</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName"> lastName </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            if (event.target.files) {
              const selectedFile = event.target.files[0]
              setPhoto(event.target.files[0]);
              const objectUrl = URL.createObjectURL(selectedFile);
              setPreview(objectUrl);
            }

            console.log(photo);
          }}
        />
      </form>
      <button onClick={onButtonClick}>register</button>

      {preview && (
        <img src={preview} alt="Preview" style={{ maxWidth: "300px" }} />
      )}
    </main>
  );
};

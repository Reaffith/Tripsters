import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";
import { logIn } from "./api";

function App() {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGljZUBleGFtcGxlLmNvbSIsImlhdCI6MTczMTY4NTgxMiwiZXhwIjo5OTAwMTczMTY4NTgxMn0.aGKLYXhU0elp22mowy57Ii135vu5Zcuus9ST_FgQNZE";

  // fetch("http://localhost:8088/users", {
  //   method: "GET",
  //   mode: "cors",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error("ялох", error);
  //   })
  //   .finally(() => {
  //     console.log("end");
  //   });

  // logIn({
  //   email: "alice@example.com",
  //   password: "StrongPass1234",
  // })
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}

export default App;

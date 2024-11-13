import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";

function App() {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNzI5ODY4NDY0LCJleHAiOjk5MDAxNzI5ODY4NDY0fQ.3KAdq6WPZc_B5sFLXMSHJPLBMuXWLz0NW3P2fBFuCGI'

  fetch("http://localhost:8088/users", {
    method: "GET", 
    headers: {
      Authorization: `Bearer ${token}`, 
    },
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); 
    })
    .catch((error) => {
      console.error("ялох", error);
    })
    .finally(() => {console.log('end')});

  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}

export default App;

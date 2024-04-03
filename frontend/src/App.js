import Navbar from "./components/Navbar";
import "./styles.css";
import LoginForm from "./components/login/LoginForm";
import Register from "./components/register/register";
import Home from "./components/home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Gurukul from "./components/gurukul/gurukul";

function App() {
  const [user, setLoginUser] = useState({});

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("user_id", user._id);
    }
  }, [user]);

  return (
    <>
      <div className="">
        <Router>
          <Navbar setLoginUser={setLoginUser} />
          <Routes>
            <Route
              path="/"
              element={
                user && user._id ? (
                  <Home setLoginUser={setLoginUser} />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />

            <Route
              path="/home"
              element={
                sessionStorage.getItem("success") ? (
                  <Home setLoginUser={setLoginUser} />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
            <Route
              path="/questions"
              element={
                sessionStorage.getItem("success") ? (
                  <Gurukul setLoginUser={setLoginUser} />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />

            <Route
              path="/login"
              element={<LoginForm setLoginUser={setLoginUser} />}
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

import React, { useState } from "react";
import './LoginForm.css'
import axios from "axios"
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setLoginUser }) => {

  const navigate = useNavigate()
  const handleClick = () => navigate('/register');

  const [ user, setUser] = useState({
      email:"",
      password:""
  })

  const handleChange = e => {
      const { name, value } = e.target
      setUser({
          ...user,
          [name]: value
      })
  }

  const login = () => {
      axios.post("http://localhost:9002/api/login", user)
      .then(res => {
          alert(res.data.message)
          setLoginUser(res.data.user)
          sessionStorage.setItem("user",res.data.user.email);
          sessionStorage.setItem("success",res.data.success)
          navigate('/')
      })
  }
    return(
      <div className="container">
      <div className="login">
      <h1>Login</h1>
      <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
      <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
      <div className="button" onClick={login}>Login</div>
      <div>or</div>
      <div className="button" onClick={handleClick}>Register</div>
  </div>
  </div>
    );
}

export default LoginForm
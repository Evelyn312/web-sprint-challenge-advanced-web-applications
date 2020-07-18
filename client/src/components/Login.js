import React, {useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const[loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });
  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
      
  }
  const submit = (e) => {
    e.preventDefault();
    console.log("submitted", loginForm)
    axiosWithAuth()
    .post("api/login", loginForm)
    .then(res => {
      console.log("test res after login", res)
      localStorage.setItem("token", res.data.payload)
      props.history.push("/api/colors")
    })
    .catch(err => console.log(err))
  } 
  return (
    <>
      <h1>Welcome to BubbleLand</h1>
      <form onSubmit={submit}>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={loginForm.username}
            onChange={handleChange} 
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            value={loginForm.password}
            onChange={handleChange} 
          />
        </label>
        <button>Sign In</button>
      </form>
    </>
  );
};

export default Login;

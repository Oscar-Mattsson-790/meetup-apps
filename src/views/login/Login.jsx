import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import InputField from "../../components/inputField/InputField";
import { getLogin } from "../../api";

import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate("");

  const handleLogin = (e) => {
    e.preventDefault();

    const userDetails = {
      username: username,
      password: password,
    };

    console.log(userDetails);

    getLogin(username, password);
    setMessage("Login successful!");
    navigate("/meetups");

    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2 className="login-title">Login</h2>
          <InputField
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="signup-button" type="submit">
            Login
          </Button>
          {message && <div className="login-message">{message}</div>}
        </form>
      </div>
    </div>
  );
}

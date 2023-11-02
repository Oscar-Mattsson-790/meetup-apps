import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import InputField from "../../components/inputField/InputField";
import { getLogin } from "../../api";
import danceLogo from "../../assets/danceLogoLogin.png";
import lockIcon from "../../assets/lockIcon.svg";
import userIcon from "../../assets/userIcon.svg";

import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await getLogin(username, password);

      localStorage.setItem("token", result.token);

      if (result && result.success) {
        setMessage("Login successful!");
        navigate("/meetups");
        setUsername("");
        setPassword("");
      } else {
        setMessage("Login failed! Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleSignupNavigate = () => {
    navigate("/signup");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={danceLogo} alt="login-logo" />
        <h2 className="login-title">MeetUp</h2>
        <p className="login-subtitle">Join the community to get started</p>
        <form onSubmit={handleLogin}>
          <InputField
            type="text"
            iconSrc={userIcon}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <InputField
            type="password"
            iconSrc={lockIcon}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button className="login-button" type="submit">
            Login
          </Button>
          {message && <div className="login-message">{message}</div>}
        </form>
        <div className="signup-prompt">
          Not a member?
          <span onClick={handleSignupNavigate} className="signup-link">
            Signup
          </span>
        </div>
      </div>
    </div>
  );
}

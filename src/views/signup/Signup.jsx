import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import InputField from "../../components/inputField/InputField";
import "./Signup.css";
import danceLogoSignup from "../../assets/danceLogoSignup.png";

import mailIcon from "../../assets/mailIcon.svg";
import lockIcon from "../../assets/lockIcon.svg";
import userIcon from "../../assets/userIcon.svg";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const userDetails = {
      userName: username,
      email: email,
      password: password,
    };

    console.log(userDetails);

    try {
      const response = await fetch(
        "https://tmlbv7ux12.execute-api.eu-north-1.amazonaws.com/api/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );

      const responseData = await response.json();

      if (response && responseData.sucess) {
        setMessage("Registration successful!");
        navigate("/");
      } else {
        setMessage(responseData.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("There was an error signing up:", error);
      setMessage("An error occurred. Please try again later.");
    }

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <form onSubmit={handleSignup}>
          <img
            className="danceLogoSignup"
            src={danceLogoSignup}
            alt="signup-logo"
          />
          <h2 className="signup-title">Register</h2>
          <p>Username *</p>
          <InputField
            type="text"
            iconSrc={userIcon}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p>Email *</p>
          <InputField
            type="email"
            iconSrc={mailIcon}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p>Password *</p>
          <InputField
            type="password"
            iconSrc={lockIcon}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button className="signup-button" type="submit">
            Register
          </Button>
          {message && <div className="signup-message">{message}</div>}
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import InputField from "../../components/inputField/InputField";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate("");

  const handleLogin = (e) => {
    e.preventDefault();

    const userDetails = {
      email: email,
      password: password,
    };

    console.log(userDetails);

    setMessage("Login successful!");
    navigate("/listMeetup");

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2 className="login-title">Login</h2>
          <InputField
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

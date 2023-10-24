import { useState } from "react";
import Button from "../../components/button/Button";
import InputField from "../../components/inputField/InputField";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const userDetails = {
      email: email,
      password: password,
    };

    console.log(userDetails);

    setMessage("Registration successful!");

    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <form onSubmit={handleSignup}>
          <h2 className="signup-title">Register</h2>
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
            Register
          </Button>
          {message && <div className="signup-message">{message}</div>}
        </form>
      </div>
    </div>
  );
}

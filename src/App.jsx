import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/login/Login";
import Signup from "./views/signup/Signup";
import Profile from "./views/profile/Profile";
import Home from "./views/home/Home";
import MeetupInfo from "./views/meetupInfo/MeetupInfo";
import AppLayout from "./views/appLayout/AppLayout";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="meetup-apps">
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="meetups" element={<Home />} />
            <Route path="meetupInfo/:id" element={<MeetupInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

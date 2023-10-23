import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/login/Login";
import Signup from "./views/signup/Signup";
import Profile from "./views/profile/Profile";
import ListMeetup from "./views/listMeetup/ListMeetup";
import MeetupInfo from "./views/meetupInfo/MeetupInfo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="listMeetup" element={<ListMeetup />} />
          <Route path="meetupInfo/:id" element={<MeetupInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
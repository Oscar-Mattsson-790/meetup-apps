import { useEffect, useState } from "react";
import { getMeetups } from "../../api";
import profileIcon from "../../assets/meetupLogo.svg";
import "./Profile.css";

function MeetupCard({ meetup }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="meetup-card" onClick={() => setShowDetails(!showDetails)}>
      <h3>{meetup.title}</h3>
      <p>
        {meetup.date} at {meetup.time}
      </p>
      {showDetails && <p>{meetup.description}</p>}
    </div>
  );
}

export default function Profile() {
  const user = {
    name: "Oscar Mattsson",
    email: "oscar@gmail.com",
    username: "ogge1337",
  };

  const [registeredMeetups, setRegisteredMeetups] = useState([]);
  const [pastMeetups, setPastMeetups] = useState([]);

  useEffect(() => {
    async function fetchMeetups() {
      try {
        const fetchedMeetups = await getMeetups();

        const currentDate = new Date();
        const registered = fetchedMeetups.filter(
          (meetup) => new Date(meetup.date) >= currentDate
        );
        const past = fetchedMeetups.filter(
          (meetup) => new Date(meetup.date) < currentDate
        );

        setRegisteredMeetups(registered);
        setPastMeetups(past);
      } catch (error) {
        console.error("Failed to fetch meetups:", error);
      }
    }

    fetchMeetups();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h2 className="profile-title">
            <img
              className="profile-icon"
              src={profileIcon}
              alt="profile-icon"
            />
            <p>{user.username}</p>
          </h2>
        </div>
        <div className="profile-info">
          <h2>Registered Meetups</h2>
          {registeredMeetups.map((meetup, index) => (
            <MeetupCard key={index} meetup={meetup} />
          ))}
          <h2>Past Meetups</h2>
          {pastMeetups.map((meetup) => (
            <MeetupCard key={meetup.id} meetup={meetup} />
          ))}
        </div>
      </div>
    </div>
  );
}

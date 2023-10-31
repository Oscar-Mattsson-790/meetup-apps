import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMeetups } from "../../api";
import profileIcon from "../../assets/meetupLogo.svg";
import MeetupItem from "../../components/meetupItem/MeetupItem";

import "./Profile.css";

export default function Profile() {
  const [registeredMeetups, setRegisteredMeetups] = useState([]);
  const [pastMeetups, setPastMeetups] = useState([]);
  // const [feedbacks, setFeedbacks] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state.userInfo.user.Item;
  const myMeetups = userInfo.registeredMeetups;

  useEffect(() => {
    async function fetchMeetups() {
      try {
        const allMeetUps = await getMeetups();

        const currentDate = new Date();
        const registeredMeetups = allMeetUps.filter((meetup) =>
          myMeetups.includes(meetup.name)
        );
        const past = allMeetUps.filter(
          (meetup) => new Date(meetup.date) < currentDate
        );

        setRegisteredMeetups(registeredMeetups);
        setPastMeetups(past);
      } catch (error) {
        console.error("Failed to fetch meetups:", error);
      }
    }

    fetchMeetups();
  }, []);

  function getInfo(meetup) {
    navigate(`/meetupInfo/${meetup.PK}`, { state: { meetup: meetup } });
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-title">
            <img
              className="profile-icon"
              src={profileIcon}
              alt="profile-icon"
            />
            <h2>{userInfo.userName}</h2>
          </div>
        </div>
        <div className="profile-info">
          <h2>Registered Meetups</h2>
          {registeredMeetups.map((meetup) => (
            <MeetupItem
              key={meetup.PK}
              meetup={meetup}
              getInfo={() => getInfo(meetup)}
            />
          ))}
          <h2>Past Meetups</h2>
          {pastMeetups.map((meetup) => (
            <MeetupItem
              key={meetup.PK}
              meetup={meetup}
              getInfo={() => getInfo(meetup)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

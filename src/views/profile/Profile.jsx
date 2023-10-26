import { useEffect, useState } from "react";
import { getMeetups } from "../../api";
import profileIcon from "../../assets/meetupLogo.svg";
import Button from "../../components/button/Button";
import "./Profile.css";

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(dateString).toLocaleString(undefined, options);
}

function MeetupCard({ meetup, isPastMeetup }) {
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedback, setFeedback] = useState("");

  return (
    <div
      className="meetup-card"
      onClick={() => {
        if (!isPastMeetup) setShowFeedbacks(!showFeedbacks);
      }}
    >
      <h3>{meetup.title}</h3>
      <p>{meetup.name}</p>
      <p>{formatDate(meetup.date)}</p>

      {isPastMeetup ? (
        <>
          <Button onClick={() => setShowFeedbackInput(!showFeedbackInput)}>
            Send Feedback
          </Button>
          {showFeedbackInput && (
            <div className="textarea-icon-container">
              <textarea
                className="custom-textarea"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback"
              />
              <Button
                onClick={() => {
                  console.log(feedback);
                  setShowFeedbackInput(false);
                  setFeedback("");
                }}
              >
                Submit
              </Button>
            </div>
          )}
        </>
      ) : showFeedbacks ? (
        <div className="meetup-details">
          <p>{meetup.description}</p>
          <p>City: {meetup.city}</p>
          <p>Location: {meetup.location}</p>
        </div>
      ) : null}
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
          <div className="profile-title">
            <img
              className="profile-icon"
              src={profileIcon}
              alt="profile-icon"
            />
            <h2>{user.username}</h2>
          </div>
        </div>
        <div className="profile-info">
          <h2>Registered Meetups</h2>
          {registeredMeetups.map((meetup, index) => (
            <MeetupCard key={index} meetup={meetup} />
          ))}
          <h2>Past Meetups</h2>
          {pastMeetups.map((meetup) => (
            <MeetupCard key={meetup.PK} meetup={meetup} isPastMeetup={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMeetups } from "../../api";
import profileIcon from "../../assets/meetupLogo.svg";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
// import MeetupItem from "../../components/meetupItem/MeetupItem";

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

function MeetupCard({ meetup, isPastMeetup, storedFeedback }) {
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [feedback, setFeedback] = useState(storedFeedback || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      {isPastMeetup && (
        <>
          {feedback && (
            <div className="saved-feedback">Feedback: {feedback}</div>
          )}
          <Button onClick={() => setIsModalOpen(true)}>Send Feedback</Button>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <textarea
              className="custom-textarea"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback"
            />
            <Button
              onClick={() => {
                console.log(feedback);
                setIsModalOpen(false);
                setFeedback("");
              }}
            >
              Submit
            </Button>
          </Modal>
        </>
      )}

      {!isPastMeetup && showFeedbacks && (
        <div className="meetup-details">
          <p>{meetup.description}</p>
          <p>City: {meetup.city}</p>
          <p>Location: {meetup.location}</p>
        </div>
      )}
    </div>
  );
}

export default function Profile() {
  const [registeredMeetups, setRegisteredMeetups] = useState([]);
  const [pastMeetups, setPastMeetups] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const location = useLocation();
  const userInfo = location.state.userInfo.user.Item;

  const myMeetups = userInfo.registeredMeetups;

  console.log(userInfo);

  useEffect(() => {
    setFeedbacks(JSON.parse(localStorage.getItem("meetupFeedbacks")) || {});
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
            <MeetupCard key={meetup.PK} meetup={meetup} />
          ))}
          <h2>Past Meetups</h2>
          {pastMeetups.map((meetup) => (
            <MeetupCard
              key={meetup.PK}
              meetup={meetup}
              isPastMeetup={true}
              storedFeedback={feedbacks[meetup.PK]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

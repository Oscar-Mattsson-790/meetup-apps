import "./MeetupInfo.css";
import { useLocation } from "react-router-dom";
import Button from "../../components/button/Button";
import moment from "moment/moment";
import RenderFeedback from "../../components/renderFeedback/RenderFeedback";
import { bookMeetup, getMeetups } from "../../api";
import { useEffect, useState } from "react";
import Popup from "../../components/popoup/Popup";

export default function MeetupInfo() {
  const [meetupInfo, setMeetupInfo] = useState({});
  const [feedback, setFeedback] = useState([]);
  const [registeredPeople, setRegisteredPeople] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const location = useLocation();
  const meetupPK = location.state.meetup.PK;
  const today = moment();
  const meetupDate = moment(meetupInfo.date).format("D MMM YYYY hh:m a");
  const checkDate = today.isAfter(meetupDate);

  useEffect(() => {
    async function meetupArr() {
      const listMeetups = await getMeetups();
      const currentMeetup = listMeetups.find((meetup) => {
        return meetup.PK === meetupPK;
      });
      const currentFeedback = currentMeetup.feedbacks;
      setFeedback(currentFeedback);
      setMeetupInfo(currentMeetup);
    }
    meetupArr();
  }, [registeredPeople]);

  const maxGuests = meetupInfo.registeredPeople + meetupInfo.totalTickets;
  const ticketsLeft = meetupInfo.totalTickets > 0;

  const displayFeedback = feedback.map((feedback, index) => {
    return <RenderFeedback key={index} feedback={feedback} />;
  });

  async function confirmBooking(name) {
    await bookMeetup(name);
    setRegisteredPeople(registeredPeople + 1);
    setOpenPopup(false);
  }

  return (
    <div className="meetup-info">
      <div className="info-container">
        <div className="general-info">
          <h1 className="meetup-name"> {meetupInfo.name} </h1>
          <p className="description"> {meetupInfo.description} </p>
          <p className="host"> Hosted by {meetupInfo.host} </p>
        </div>
        <div className="detail-info">
          <p className="topic">
            Where:{" "}
            <span className="location">
              {" "}
              {meetupInfo.city}, {meetupInfo.location}
            </span>
          </p>
          <p className="topic">
            When: <span className="date">{meetupDate}</span>
          </p>
          <p className="topic">
            Available tickets:{" "}
            <span className="tickets">
              {checkDate ? 0 : meetupInfo.totalTickets}/{maxGuests}
            </span>
          </p>
        </div>
      </div>
      {checkDate ? (
        displayFeedback
      ) : (
        <Button className="bookingBtn" onClick={() => setOpenPopup(true)}>
          Get tickets
        </Button>
      )}
      {ticketsLeft && openPopup ? (
        <Popup
          message="Click Confirm to book your ticket"
          closePopup={() => setOpenPopup(false)}
          confirmBooking={() => confirmBooking(meetupInfo.name)}
          btnText="Confirm"
        />
      ) : openPopup ? (
        <Popup
          message="Tickets are sold out"
          closePopup={() => setOpenPopup(false)}
          btnText="Got it!"
        />
      ) : null}
    </div>
  );
}

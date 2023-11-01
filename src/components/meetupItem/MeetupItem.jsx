import "./MeetupItem.css";
import Modal from "../modal/Modal";
import Button from "../../components/button/Button";
import { deleteBookedMeetup } from "../../api";
import moment from "moment/moment";
import { useLocation } from "react-router";
import { useState } from "react";

export default function MeetupItem({
  meetup,
  showMeetupInfo,
  onCancelBooking,
}) {
  const [openPopup, setOpenPopup] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const today = moment();

  // Format the meetup date
  const formattedMeetupDate = moment(meetup.date).format("D MMM YYYY hh:m a");

  // Determine if the meetup is in the past or future
  const isMeetupInPast = today.isAfter(meetup.date);
  const isMeetupInFuture = today.isBefore(meetup.date);

  function handleClosePopup() {
    setOpenPopup(false);
  }

  async function handleCancelBooking(name) {
    await deleteBookedMeetup(name);
    if (onCancelBooking) {
      onCancelBooking(name);
    }
  }

  return (
    <div className="meetup-container">
      <div className="meetup-card">
        <h1 className="meetup-name"> {meetup.name} </h1>
        <section className="short-info">
          <p className="city"> {meetup.city} </p>
          <p className="date"> {formattedMeetupDate} </p>
        </section>
        {path === "/meetups" && (
          <Button onClick={showMeetupInfo}>More Info</Button>
        )}
        {path === "/profile" && isMeetupInPast && (
          <div>
            <div className="btn-container">
              <Button onClick={showMeetupInfo}>More Info</Button>
              <Button onClick={() => setOpenPopup(true)}>Send Feedback</Button>
            </div>
            <Modal
              isOpen={openPopup}
              onClick={() => setOpenPopup(false)}
              name={meetup.name}
              handlePopup={handleClosePopup}
            ></Modal>
          </div>
        )}
        {path === "/profile" && isMeetupInFuture && (
          <div className="btn-container">
            <Button onClick={showMeetupInfo}>More Info</Button>
            <Button onClick={() => handleCancelBooking(meetup.name)}>
              Cancel booking
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

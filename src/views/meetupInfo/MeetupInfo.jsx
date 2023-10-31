import "./MeetupInfo.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import moment from "moment/moment";
import RenderFeedback from "../../components/renderFeedback/RenderFeedback";
import { bookMeetup, getMeetups } from "../../api";
import { useEffect, useState } from "react";

export default function MeetupInfo() {
  const [meetupInfo, setMeetupInfo] = useState({});
  const [feedback, setFeedback] = useState([]);
  const location = useLocation();
  const meetupPK = location.state.meetup.PK;
  const today = moment();
  const meetupDate = moment(meetupInfo.date).format("D MMM YYYY hh:m a");
  const checkDate = today.isAfter(meetupDate);

  useEffect(() => {
    async function meetupArr() {
      const listMeetups = await getMeetups();
      const currentMeetup = listMeetups.find((meetup) => {
        return meetup.PK === meetupPK
      });
      const currentFeedback = currentMeetup.feedbacks;
      setFeedback(currentFeedback)
      setMeetupInfo(currentMeetup)
    }
    meetupArr();

  }, []);

  const maxGuests = meetupInfo.registeredPeople+meetupInfo.totalTickets;
  
  const displayFeedback = feedback.map((feedback,index) => {
    return <RenderFeedback key={index} feedback={feedback}/>
  })

  async function handleBooking(name) {
    await bookMeetup(name)
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
          <p className="topic">Where: <span className="location"> {meetupInfo.city}, {meetupInfo.location}</span></p>
          <p className="topic">When: <span className="date">{meetupDate}</span></p>
          <p className="topic">Available tickets: <span className="tickets">{checkDate ? 0 : meetupInfo.totalTickets}/{maxGuests}</span></p>
        </div>
      </div>
      {checkDate ? displayFeedback : <Button className="bookingBtn" onClick={() => handleBooking(meetupInfo.name)}>
        Get tickets
      </Button>}
    </div>
  );
}

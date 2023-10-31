import "./MeetupInfo.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import moment from "moment/moment";
import RenderFeedback from "../../components/renderFeedback/RenderFeedback";
import { bookMeetup } from "../../api";

export default function MeetupInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state.meetup;
  const feedbackArr = info.feedbacks;
  const today = moment();
  const meetupDate = moment(info.date).format("D MMM YYYY hh:m a");

  const checkDate = today.isAfter(meetupDate);

  const displayFeedback = feedbackArr.map((feedback,index) => {
    return <RenderFeedback key={index} feedback={feedback}/>
  })

  async function handleBooking(name) {
    await bookMeetup(name)
  }

  function backToMeetups() {
    navigate('/meetups')
  }

  return (
    <div className="meetup-info">
      <div className="info-container">
        <div className="general-info">
          <h1 className="meetup-name"> {info.name} </h1>
          <p className="description"> {info.description} </p>
          <p className="host"> Hosted by {info.host} </p>
        </div>
        <div className="detail-info">
          <p className="topic">Where: <span className="location"> {info.city}, {info.location}</span></p>
          <p className="topic">When: <span className="date">{meetupDate}</span></p>
          <p className="topic">Available tickets: <span className="tickets">{info.totalTickets}</span></p>
        </div>
      </div>
      {checkDate ? displayFeedback : <Button className="bookingBtn" onClick={() => handleBooking(info.name)}>
        Get tickets
      </Button>}
      <Button onClick={backToMeetups}>Find Other Meetups</Button>
    </div>
  );
}

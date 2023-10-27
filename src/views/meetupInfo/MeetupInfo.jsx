import "./MeetupInfo.css";
import { useLocation } from "react-router-dom";
import Button from "../../components/button/Button";
import moment from "moment/moment";
// import { useState } from "react";

export default function MeetupInfo() {
  // const [showFeedback, setShowFeedback] = useState(false)
  const location = useLocation();
  const info = location.state.meetup;
  const today = moment();
  const meetupDate = moment(info.date).format("D MMM YYYY hh:m a");

  const checkDate = today.isAfter(meetupDate);
  console.log(checkDate);

  const bookMeetup = async () => {
    const data = {
      name: info.name,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/bookMeetup`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="meetup-info">
      <div className="info-container">
        <div className="general-info">
          <h1 className="meetup-name"> {info.name} </h1>
          <p className="description"> {info.description} </p>
          <p className="host"> Hosted by {info.host} </p>
        </div>
        <div className="detail-info">
          <p className="topic">
            {" "}
            Where:{" "}
            <span className="location">
              {" "}
              {info.city}, {info.location}{" "}
            </span>{" "}
          </p>
          <p className="topic">
            {" "}
            When: <span className="date">{meetupDate}</span>{" "}
          </p>
          <p className="topic">
            Available tickets:{" "}
            <span className="tickets">{info.totalTickets}</span>{" "}
          </p>
        </div>
      </div>
      <Button className="bookingBtn" onClick={bookMeetup}>
        Get tickets
      </Button>
      {checkDate && <p>feedback</p>}
    </div>
  );
}

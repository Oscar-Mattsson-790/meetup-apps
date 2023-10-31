import { useState, useEffect } from "react";
import MeetupItem from "../../components/meetupItem/MeetupItem";
import { useNavigate } from "react-router-dom";
import { getMeetups } from "../../api";
import moment from "moment";

export default function ListMeetup() {
  const navigate = useNavigate();
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function meetupArr() {
      const listMeetups = await getMeetups();
      setMeetups(listMeetups);
    }
    meetupArr();
  }, []);

  const today = moment();
  const getUpcomingMeetups = meetups.filter((meetup) => 
    today.isBefore(meetup.date)
  )

  const getPastMeetups = meetups.filter((meetup) =>
    today.isAfter(meetup.date)
  )

  function getInfo(meetup) {
    navigate(`/meetupInfo/${meetup.PK}`, { state: { meetup: meetup } });
  }

  const upcomingMeetups = getUpcomingMeetups.map((futureMeetup) => {
    return (
      <MeetupItem
        meetup={futureMeetup}
        key={futureMeetup.PK}
        getInfo={() => getInfo(futureMeetup)}
      />
    );
  });

  const pastMeetups = getPastMeetups.map((pastMeetup) => {
    return (
      <MeetupItem
        meetup={pastMeetup}
        key={pastMeetup.PK}
        getInfo={() => getInfo(pastMeetup)}
      />
    );
  });

  return (
    <div className="list-page">
      <h1>Upcoming Meetups</h1>
      {upcomingMeetups}
      <h1>Past Meetups</h1>
      {pastMeetups}
    </div>
  )
}

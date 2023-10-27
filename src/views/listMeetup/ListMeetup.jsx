import { useState, useEffect } from "react";
import MeetupItem from "../../components/meetupItem/MeetupItem";
import { useNavigate } from "react-router-dom";
import { getMeetups } from "../../api";

export default function ListMeetup() {
  const navigate = useNavigate();
  const [meetups, setMeetups] = useState([]);
  const [info, setInfo] = useState('');  
  useEffect(() => {
    async function meetupArr() {
      const testMeetups = await getMeetups();
      console.log(testMeetups);
      setMeetups(testMeetups)
    }
    meetupArr()
  }, []);


  const allMeetUps = meetups.map((meetup) => {
    return <MeetupItem meetup={meetup} key={meetup.PK} getInfo={() => getInfo(meetup)} />
  });

  function getInfo(meetup) {
    setInfo(meetup);
    navigate(`/meetupInfo/${meetup.PK}`, {state: {meetup: meetup}})
  }


  return (
    <div className="list-page">
      {allMeetUps}
    </div>
  );
}

import { useState, useEffect } from "react";
import MeetupItem from "../../components/meetupItem/MeetupItem";
import { useNavigate } from "react-router-dom";
import { getMeetups } from "../../api";
import moment from "moment";
import MeetupFilter from "../../components/meetupFilter/MeetupFilter";

export default function ListMeetup() {
  const navigate = useNavigate();
  const [meetups, setMeetups] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    city: "",
    name: "",
  });
  const today = moment();

  useEffect(() => {
    async function meetupArr() {
      const listMeetups = await getMeetups();
      setMeetups(listMeetups);
    }
    meetupArr();

  }, [filters]);


  const today = moment();
  const getUpcomingMeetups = meetups.filter((meetup) => 
    today.isBefore(meetup.date)
  )


  const applyFilters = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  // const getUpcomingMeetups = meetups.filter((meetup) =>
  //   today.isBefore(meetup.date)
  // );

  const getUpcomingMeetups = meetups.filter((meetup) => {
    const dateFilter =
      !filters.date || moment(meetup.date).isSameOrAfter(filters.date);
    const cityFilter =
      !filters.city ||
      meetup.city.toLowerCase().includes(filters.city.toLowerCase());
    const nameFilter =
      !filters.name ||
      meetup.name.toLowerCase().includes(filters.name.toLowerCase());
    return (
      today.isBefore(meetup.date) && dateFilter && cityFilter && nameFilter
    );
  });

  // const getPastMeetups = meetups.filter((meetup) => today.isAfter(meetup.date));

  const getPastMeetups = meetups.filter((meetup) => {
    const dateFilter =
      !filters.date || moment(meetup.date).isBefore(filters.date);
    const cityFilter =
      !filters.city ||
      meetup.city.toLowerCase().includes(filters.city.toLowerCase());
    const nameFilter =
      !filters.name ||
      meetup.name.toLowerCase().includes(filters.name.toLowerCase());
    return today.isAfter(meetup.date) && dateFilter && cityFilter && nameFilter;
  });

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
      <MeetupFilter onApplyFilters={applyFilters} />
      <h1>Upcoming Meetups</h1>
      {upcomingMeetups}
      <h1>Past Meetups</h1>
      {pastMeetups}
    </div>
  );
}

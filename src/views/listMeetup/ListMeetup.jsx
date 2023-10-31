import { useState, useEffect } from "react";
import MeetupItem from "../../components/meetupItem/MeetupItem";
import { useNavigate } from "react-router-dom";
import { getMeetups } from "../../api";
import moment from "moment";
import MeetupFilter from "../../components/meetupFilter/MeetupFilter";
import "./ListMeetup.css"

export default function ListMeetup() {
  const navigate = useNavigate();
  const [meetups, setMeetups] = useState([]);



  const [filters, setFilters] = useState({
    date: "",
    city: "",
    name: "",
    category: "",
    searchQuery: "",
  });

  useEffect(() => {
    async function meetupArr() {
      const listMeetups = await getMeetups();
      setMeetups(listMeetups);
    }
    meetupArr();

  }, []);


  const today = moment();

  const applyFilters = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  function showMeetupInfo(meetup) {
    navigate(`/meetupInfo/${meetup.PK}`, { state: { meetup: meetup } });
  }


  const getUpcomingMeetups = meetups.filter((meetup) => {
    const dateFilter =
      !filters.date || moment(meetup.date).isSameOrAfter(filters.date);
    const cityFilter =
      !filters.city ||
      meetup.city.toLowerCase().includes(filters.city.toLowerCase());
    const nameFilter =
      !filters.name ||
      meetup.name.toLowerCase().includes(filters.name.toLowerCase());
    const categoryFilter =
      !filters.category || meetup.category === filters.category;
    const searchQueryFilter =
      !filters.searchQuery ||
      meetup.keywords.includes(filters.searchQuery.toLowerCase())
      console.log(meetup.keywords)
    return (
      today.isBefore(meetup.date) && dateFilter && cityFilter && nameFilter && categoryFilter && searchQueryFilter
    );
  });

  console.log("getUpcomingMeetups", getUpcomingMeetups)


  const upcomingMeetups = getUpcomingMeetups.map((futureMeetup) => {
    return (
      <MeetupItem
        meetup={futureMeetup}
        key={futureMeetup.PK}
        showMeetupInfo={() => showMeetupInfo(futureMeetup)}
      />
    );
  });

  const getPastMeetups = meetups.filter((meetup) => {
    return today.isAfter(meetup.date);
  });

  const pastMeetups = getPastMeetups.map((pastMeetup) => {
    return (
      <MeetupItem
        meetup={pastMeetup}
        key={pastMeetup.PK}
        showMeetupInfo={() => showMeetupInfo(pastMeetup)}
      />
    );
  });

  console.log(getUpcomingMeetups.length > 0)
  return (
    <div className="list-page">
      <div className="meetup-filter-hidden">
        <MeetupFilter  onApplyFilters={applyFilters} />
      </div>

      <h1>Upcoming Meetups</h1>
      {getUpcomingMeetups.length > 0 ? upcomingMeetups : (<h1> No meetups found for the given values! </h1>)}
      <h1>Past Meetups</h1>
      {pastMeetups}
    </div>
  );
}

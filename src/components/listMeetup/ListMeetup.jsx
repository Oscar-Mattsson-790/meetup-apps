import { useState, useEffect } from "react";
import MeetupItem from "../../components/meetupItem/MeetupItem";
import { useNavigate } from "react-router-dom";
import { getMeetups } from "../../api";

import MeetupFilter from "../../components/meetupFilter/MeetupFilter";
import "./ListMeetup.css"

export default function ListMeetup({upcomingMeetups, pastMeetups}) {

  return (
    <div className="list-page">
      {/* <div className="meetup-filter-hidden">
        <MeetupFilter  onApplyFilters={onApplyFilters} showInputField={showInputField} />
      </div> */}

      <h1>Upcoming Meetups</h1>
      {upcomingMeetups.length > 0 ? upcomingMeetups : (<h1> No meetups found for the given values! </h1>)}
      <h1>Past Meetups</h1>
      {pastMeetups}
    </div>
  );
}
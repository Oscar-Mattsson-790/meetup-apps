import "./ListMeetup.css";

export default function ListMeetup({ upcomingMeetups, pastMeetups }) {
  return (
    <div className="list-page">
      <h1>Upcoming Meetups</h1>
      {upcomingMeetups.length > 0 ? (
        upcomingMeetups
      ) : (
        <h1> No meetups found for the given values! </h1>
      )}
      <h1>Past Meetups</h1>
      {pastMeetups}
    </div>
  );
}

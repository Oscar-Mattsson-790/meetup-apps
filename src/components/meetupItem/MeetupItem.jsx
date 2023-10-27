import "./MeetupItem.css"

export default function MeetupItem({meetup, getInfo}) {
    return (
        <div className="meetup-card" onClick={getInfo}>
            <h1 className="meetup-name"> {meetup.name} </h1>
            <section className="short-info">
                <p className="city"> {meetup.city} </p>
                <p className="date"> {meetup.date} </p>
            </section>
        </div>
    )
}
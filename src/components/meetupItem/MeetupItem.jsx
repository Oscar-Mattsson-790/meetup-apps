import "./MeetupItem.css"
import Modal from "../modal/Modal"
import Button from "../../components/button/Button";
import FeedbackWithStars from "../feedback/Feedback";
import InputField from "../inputField/InputField";
import { deleteBookedMeetup, postFeedback } from "../../api";
import moment from "moment/moment"
import { useLocation } from "react-router"
import { useState } from "react"



export default function MeetupItem({meetup, getInfo}) {
    const [openPopup, setOpenPopup] = useState(false)
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const location = useLocation();
    const path = location.pathname;
    const today = moment();
    const pastMeetup = today.isAfter(meetup.date)
    const meetupDate = moment(meetup.date).format("D MMM YYYY hh:m a");
    const futureMeetup = today.isBefore(meetup.date)
    

    const handleStarClick = (rating) => {
        setRating(rating)
    }


    const handleSubmit = async (rating, feedback, name, e) => {
        e.preventDefault();
        const feedbackItem = {
            name: name,
            rating: rating,
            feedback: feedback
        }
        console.log(feedbackItem)
        await postFeedback(feedbackItem)
        setOpenPopup(false)
        setFeedback('')
        setRating(0)

    }

    async function handleCancelBooking(name) {
        await deleteBookedMeetup(name)
    }
    
    return (
        <div className="meetup-container">
            <div className="meetup-card">
                <h1 className="meetup-name"> {meetup.name} </h1>
                <section className="short-info">
                    <p className="city"> {meetup.city} </p>
                    <p className="date"> {meetupDate} </p>
                </section>
                {path === '/profile' && pastMeetup  && (
                    <div>
                        <div className="btn-container">
                            <Button onClick={getInfo}>More Info</Button>
                            <Button onClick={() => setOpenPopup(true)}>Send Feedback</Button>
                        </div>

                        <Modal isOpen={openPopup} onClose={() => setOpenPopup(false)}>
                        <FeedbackWithStars 
                            rating={rating}
                            onStarClick={handleStarClick}
                            feedback={feedback}
                            name={meetup.name}
                        />
                        <form onSubmit={(e) => {handleSubmit(rating, feedback, meetup.name, e)}}>
                        <InputField
                            type="text"
                            placeholder="Enter your feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                        <Button type="submit">Submit</Button>
                        </form>
                        </Modal>
                    </div>
                )}
                {path === '/profile' && futureMeetup && (
                    <div className="btn-container">
                        <Button onClick={getInfo}>More Info</Button>
                        <Button onClick={() => handleCancelBooking(meetup.name)}>Cancel booking</Button>
                    </div>
                    

                    
                ) } 
            </div>
        </div>
    )
        
}


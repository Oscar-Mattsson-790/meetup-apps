import { useState } from "react";
import { postFeedback } from "../../api";
import FeedbackWithStars from "../feedback/Feedback";
import InputField from "../inputField/InputField";
import "./Modal.css";
import Button from "../button/Button";

export default function Modal({ isOpen, onClose, name, handlePopup }) {
  if(!isOpen) return null

  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  
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

      await postFeedback(feedbackItem)
      handlePopup()
      setFeedback('')
      setRating(0)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h4>Share your feedback with us!</h4>
        <FeedbackWithStars 
          rating={rating}
          onStarClick={handleStarClick}
          feedback={feedback}
          name={name}
        />
        <form onSubmit={(e) => {handleSubmit(rating, feedback, name, e)}}>
        <InputField
          type="text"
          placeholder="Enter your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <Button type="submit">Submit</Button>
       </form>
      </div>
    </div>
  );
}

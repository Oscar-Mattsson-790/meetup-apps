
import { useState } from "react";
import "./Feedback.css";


const FeedbackWithStars = ({ feedback, rating, name, onStarClick }) => {
  const maxRating = 5;
  const [hoverRating, setHoverRating] = useState(rating);

  const handleStarClick = (rating) => {
    onStarClick(rating)
  }


  const starArray = Array.from({ length: maxRating }, (_, index) => (
    <span 
    key={index} 
    className={`star ${index < (rating || hoverRating) ? "filled" : ""}`}
    onClick={() => handleStarClick(index +1)}
    onMouseEnter={() => setHoverRating(index +1)}
    onMouseLeave={() => setHoverRating(index +1)}>
      ★
    </span>
  ));

  console.log("FEEDBACK", feedback)
  console.log("RATING", rating)

  return (
    <div className="feedback-container">
      <p className="feedback-text">{feedback}</p>
      <div className="star-ratings">{starArray}</div>
    </div>
  );
};

export default FeedbackWithStars;
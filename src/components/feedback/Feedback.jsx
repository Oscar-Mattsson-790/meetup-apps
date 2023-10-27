import "./Feedback.css";

const FeedbackWithStars = ({ feedback, rating }) => {
  const maxRating = 5;

  const starArray = Array.from({ length: maxRating }, (_, index) => (
    <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
      ★
    </span>
  ));

  return (
    <div className="feedback-container">
      <p className="feedback-text">{feedback}</p>
      <div className="star-ratings">{starArray}</div>
    </div>
  );
};

export default FeedbackWithStars;
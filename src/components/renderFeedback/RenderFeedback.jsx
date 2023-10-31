import './RenderFeedback.css'

export default function RenderFeedback({feedback}) {
    
    const maxRating = 5;
    const starArray = Array.from({ length: maxRating }, (_, index) => (
        <span 
        key={index} 
        className={`rating-star ${index < feedback.rating ? "filled" : ""}`}>
          ★
        </span>
      ));
    return (
        <div className='feedback-item'>
            <p className='written-by'>{feedback.name}</p>
            <div className='rating'>{starArray}</div>
            <p className='feedback'>{feedback.feedback}</p>
        </div>
    )
}
import "./Popup.css";
import Button from "../button/Button";

export default function Popup({
  message,
  closePopup,
  btnText,
  confirmBooking,
}) {
  return (
    <div className="popup-container" onClick={closePopup}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h3 className="popup-message">{message}</h3>
        {confirmBooking ? (
          <Button onClick={confirmBooking}>{btnText}</Button>
        ) : (
          <Button onClick={closePopup}>{btnText}</Button>
        )}
      </div>
    </div>
  );
}

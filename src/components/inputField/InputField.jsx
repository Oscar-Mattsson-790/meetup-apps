import "./InputField.css";

export default function InputField({ iconSrc, iconOnClick, ...props }) {
  return (
    <div className="input-icon-container">
      {iconSrc && (
        <img
          src={iconSrc}
          alt="input-icon"
          className="input-icon"
          onClick={iconOnClick}
        />
      )}
      <input className="custom-input" {...props} />
    </div>
  );
}

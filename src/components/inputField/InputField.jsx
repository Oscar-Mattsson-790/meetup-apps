import "./InputField.css";

export default function InputField({ iconSrc, ...props }) {
  return (
    <div className="input-icon-container">
      {iconSrc && <img src={iconSrc} alt="input-icon" className="input-icon" />}
      <input className="custom-input" {...props} />
    </div>
  );
}

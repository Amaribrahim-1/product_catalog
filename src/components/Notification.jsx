export default function Notification({
  type = "info", // success | error | info
  message = "Notification message",
  onClose,
}) {
  return (
    <div className={`notification notification--${type}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {type === "success" && "✅"}
          {type === "error" && "❌"}
          {type === "info" && "ℹ️"}
        </span>

        <p className="notification-message">{message}</p>
      </div>

      <button className="notification-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

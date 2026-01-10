export default function Modal({
  title = "Are you sure?",
  message = "This action cannot be undone",
  onConfirm,
  onCancel,
}) {
  return (
    <>
      <div className="modal-overlay" onClick={onCancel}></div>

      <div className="modal">
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn confirm" onClick={onConfirm}>
            Yes, delete
          </button>
        </div>
      </div>
    </>
  );
}

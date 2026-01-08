export default function Stars({ filled }) {
  return (
    <span className="rating-stars">
      {Array.from({ length: 5 }, (_, i) =>
        i < filled ? <span key={i}>★</span> : <span key={i}>☆</span>
      )}
    </span>
  );
}

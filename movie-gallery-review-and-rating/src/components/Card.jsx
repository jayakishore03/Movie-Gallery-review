import React, { useState, useEffect } from "react";

const Card = ({ movie }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const localStorageKey = `reviews-${movie.title}`;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    setReviews(data);
  }, [localStorageKey]);

  const handleSubmit = () => {
    const newReview = { rating, review };
    const updatedReviews = [...reviews, newReview];
    localStorage.setItem(localStorageKey, JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setRating(0);
    setReview("");
  };

  const averageRating = reviews.length
    ? (
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      ).toFixed(1)
    : "N/A";

  return (
    <div className="card">
      <img src={movie.poster} alt={movie.title} className="poster" />
      <h3 className="title">{movie.title}</h3>
      <p><strong>Avg Rating:</strong> {averageRating} ★</p>

      {/* Star Rating */}
      <div className="stars">
        {[...Array(5)].map((_, index) => {
          const current = index + 1;
          return (
            <span
              key={index}
              style={{
                color: current <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                cursor: "pointer",
                fontSize: "20px",
              }}
              onClick={() => setRating(current)}
              onMouseEnter={() => setHover(current)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          );
        })}
      </div>

      <textarea
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={3}
        className="review-box"
      />

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Review
      </button>

      {/* Show all reviews */}
      {reviews.length > 0 && (
        <div className="saved-review">
          <strong>Reviews:</strong>
          {reviews.map((r, i) => (
            <div key={i} style={{ marginTop: "5px" }}>
              ⭐ {r.rating} - {r.review}
            </div>
          ))}
        </div>
      )}

      <button className="book-btn">Book Ticket 🎟️</button>
    </div>
  );
};

export default Card;




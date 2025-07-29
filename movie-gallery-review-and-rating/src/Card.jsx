// src/Card.jsx
import React, { useState } from "react";
import "./index.css";

const Card = ({ movie }) => {
  const [liked, setLiked] = useState(false);
  const [stars, setStars] = useState(Math.round(movie.rating));
  const [review, setReview] = useState("");
  const [savedReview, setSavedReview] = useState("");

  return (
    <div className="card">
      <img src={movie.poster} alt={movie.name} className="poster" />
      <h3>{movie.name}</h3>
      <p>⭐ {movie.rating}</p>

      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={n <= stars ? "star active" : "star"}
            onClick={() => setStars(n)}
          >
            ⭐
          </span>
        ))}
      </div>

      <button className="like" onClick={() => setLiked(!liked)}>
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>

      <div className="review-section">
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review"
        />
        <button className="save" onClick={() => {
          setSavedReview(review);
          setReview("");
        }}>
          Save
        </button>
        {savedReview && <p className="saved-review">📝 {savedReview}</p>}
      </div>

      <button className="book-button">Book Ticket</button>
    </div>
  );
};

export default Card;

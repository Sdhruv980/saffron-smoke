import { useEffect, useState } from "react";
import AddReview from "../page/reviews/AddReview";

export default function Reviews() {
  const [showReview, setShowReview] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Load approved reviews
  const loadReviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reviews");
      const data = await response.json();

      setReviews(
        data.filter((review) => review.status === "Approved")
      );
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <section id="reviews" className="section reviews">
      <div className="container">

        <div className="section__header">
          <span className="section__label">
            Guest Experiences
          </span>

          <h2 className="section__title">
            Customer Reviews
          </h2>

          <button
            className="reviews__rating-badge"
            onClick={() => setShowReview(true)}
          >
            Give Review
          </button>

          {showReview && (
            <AddReview
              onClose={() => {
                setShowReview(false);
                loadReviews(); // Refresh reviews after submit
              }}
            />
          )}
        </div>

        <div className="reviews__grid">

          {reviews.length > 0 ? (
            reviews.map((review) => (
              <blockquote
                key={review.id}
                className="reviews__card"
              >
                <p className="reviews__quote">
                  &ldquo;{review.review}&rdquo;
                </p>

                <footer className="reviews__author">
                  — {review.name}
                </footer>

                <p>{"⭐".repeat(review.rating)}</p>
              </blockquote>
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%" }}>
              No approved reviews yet.
            </p>
          )}

        </div>

      </div>
    </section>
  );
}
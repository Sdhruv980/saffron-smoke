import { useEffect, useState } from "react";
import {
  getReviews,
  updateReview,
  deleteReview,
} from "../../services/reviewService";
import { FaCheck, FaTimes, FaTrash, FaStar } from "react-icons/fa";

export default function ReviewList({
  manage = false,
  refresh,
  onRefresh,
}) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [refresh]);

  async function loadReviews() {
    try {
      setLoading(true);
      const data = await getReviews();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load Reviews Error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(id, status) {
    try {
      await updateReview(id, { status });
      await loadReviews();
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Update Status Error:", err);
    }
  }

  async function removeReview(id) {
    if (!window.confirm("Delete this review?")) return;

    try {
      await deleteReview(id);
      await loadReviews();
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Delete Review Error:", err);
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "status-badge accepted";
      case "Rejected":
        return "status-badge rejected";
      default:
        return "status-badge pending";
    }
  };

  return (
    <div className="table-wrapper">
      <table className="luxury-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Rating</th>
            <th>Review Comment</th>
            <th>Moderation</th>
            {manage && <th style={{ textAlign: "center" }}>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={manage ? 5 : 4} className="table-state-cell">
                <div className="table-spinner"></div>
                <span>Loading testimonials...</span>
              </td>
            </tr>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <tr key={review.id}>
                <td className="item-name-cell">
                  <strong>{review.name}</strong>
                </td>

                <td>
                  <span className="stars-pill">
                    {"★".repeat(Math.max(1, Math.min(5, Number(review.rating) || 5)))}
                    <span className="stars-empty">
                      {"★".repeat(Math.max(0, 5 - Math.max(1, Math.min(5, Number(review.rating) || 5))))}
                    </span>
                  </span>
                </td>

                <td className="review-text-cell">
                  <p className="review-quote">"{review.review}"</p>
                </td>

                <td>
                  <span className={getStatusClass(review.status)}>
                    {review.status || "Pending"}
                  </span>
                </td>

                {manage && (
                  <td style={{ textAlign: "center" }}>
                    <div className="action-buttons-group">
                      <button
                        onClick={() => changeStatus(review.id, "Approved")}
                        className="btn-action-accept"
                        title="Approve Review"
                      >
                        <FaCheck />
                        <span>Approve</span>
                      </button>

                      <button
                        onClick={() => changeStatus(review.id, "Rejected")}
                        className="btn-action-reject"
                        title="Reject Review"
                      >
                        <FaTimes />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => removeReview(review.id)}
                        className="btn-action-delete"
                        title="Delete Review"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={manage ? 5 : 4} className="table-state-cell empty">
                <FaStar className="empty-icon" />
                <p>No reviews submitted yet.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
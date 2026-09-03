import { useEffect, useState } from "react";
import {
  getReviews,
  updateReview,
  deleteReview,
} from "../../services/reviewService";

export default function ReviewList({
  manage = false,
  refresh,
  onRefresh,
}) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, [refresh]);

  async function loadReviews() {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      console.error("Load Reviews Error:", err);
    }
  }

  async function changeStatus(id, status) {
    try {
      await updateReview(id, { status });

      await loadReviews();

      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      console.error("Update Status Error:", err);
    }
  }

  async function removeReview(id) {
    if (!window.confirm("Delete this review?")) return;

    try {
      await deleteReview(id);

      await loadReviews();

      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      console.error("Delete Review Error:", err);
    }
  }

  return (
    <table
      border="1"
      cellPadding="10"
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Review</th>
          <th>Status</th>
          {manage && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.name}</td>

              <td>{"⭐".repeat(Number(review.rating))}</td>

              <td>{review.review}</td>

              <td>{review.status}</td>

              {manage && (
                <td>
                  <button
                    onClick={() =>
                      changeStatus(review.id, "Approved")
                    }
                    style={{
                      background: "#16a34a",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      changeStatus(review.id, "Rejected")
                    }
                    style={{
                      marginLeft: "10px",
                      background: "#f59e0b",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => removeReview(review.id)}
                    style={{
                      marginLeft: "10px",
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={manage ? 5 : 4}
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              No reviews found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
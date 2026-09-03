import { useState } from "react";
import API_BASE from "../../config";

export default function AddReview({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    review: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.review.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      alert(data.message || "Review submitted successfully!");

      setFormData({
        name: "",
        rating: 5,
        review: "",
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginTop: "20px",
        background: "#fff",
      }}
    >
      <h2>Give Your Review</h2>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Rating</label>
          <br />
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
            }}
          >
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Review</label>
          <br />
          <textarea
            name="review"
            rows="5"
            value={formData.review}
            onChange={handleChange}
            placeholder="Write your review..."
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

        <button
          type="button"
          onClick={onClose}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close
        </button>

      </form>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import ReviewList from "./reviewList";
import { FaStar, FaTasks } from "react-icons/fa";

export default function Reviews() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="page-header-bar">
        <div className="page-header-left">
          <div className="page-icon-pill gold">
            <FaStar />
          </div>
          <div>
            <h2>Guest Testimonials</h2>
            <p>Review diner feedback, star ratings, and review approvals</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/reviews/manage")}
          className="btn-luxury-primary"
        >
          <FaTasks style={{ marginRight: "8px" }} />
          Moderate Reviews
        </button>
      </div>

      <div className="admin-content-card">
        <ReviewList />
      </div>
    </AdminLayout>
  );
}
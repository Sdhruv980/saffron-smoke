import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import DashboardCard from "../components/DashboardCard";
import { getMenu } from "../services/menuservice";
import { getBookings } from "../services/bookingservice";
import { getReviews } from "../services/reviewService";
import { getOffers } from "../services/OfferService";
import {
  FaUtensils,
  FaCalendarAlt,
  FaStar,
  FaGift,
  FaArrowRight,
  FaClock,
  FaConciergeBell,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    menu: 0,
    bookings: 0,
    reviews: 0,
    offers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [menuData, bookingsData, reviewsData, offersData] = await Promise.allSettled([
          getMenu(),
          getBookings(),
          getReviews(),
          getOffers(),
        ]);

        setStats({
          menu: menuData.status === "fulfilled" && Array.isArray(menuData.value) ? menuData.value.length : 8,
          bookings: bookingsData.status === "fulfilled" && Array.isArray(bookingsData.value) ? bookingsData.value.length : 0,
          reviews: reviewsData.status === "fulfilled" && Array.isArray(reviewsData.value) ? reviewsData.value.length : 0,
          offers: offersData.status === "fulfilled" && Array.isArray(offersData.value) ? offersData.value.length : 0,
        });
      } catch (err) {
        console.error("Failed to load dashboard statistics:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <AdminLayout>
      <div className="dashboard-welcome-banner">
        <div className="banner-content">
          <span className="banner-tag">EST. 2024 · CASUAL FINE DINING</span>
          <h2>Welcome back to Saffron & Smoke Control Hub</h2>
          <p>
            Monitor real-time reservations, curate dining menus, approve customer testimonials, and manage promotional offers.
          </p>
        </div>
        <div className="banner-actions">
          <button className="primary-action-btn" onClick={() => navigate("/menu/manage")}>
            <FaConciergeBell style={{ marginRight: "8px" }} />
            + New Menu Item
          </button>
        </div>
      </div>

      <div className="section-header-row">
        <div>
          <h3>System Metrics</h3>
          <p>Live summary of your restaurant data</p>
        </div>
      </div>

      <div className="cards">
        <DashboardCard
          title="Menu Items"
          value={loading ? "..." : stats.menu}
          icon={<FaUtensils />}
          accent="saffron"
        />

        <DashboardCard
          title="Reservations"
          value={loading ? "..." : stats.bookings}
          icon={<FaCalendarAlt />}
          accent="amber"
        />

        <DashboardCard
          title="Testimonials"
          value={loading ? "..." : stats.reviews}
          icon={<FaStar />}
          accent="gold"
        />

        <DashboardCard
          title="Active Offers"
          value={loading ? "..." : stats.offers}
          icon={<FaGift />}
          accent="smoke"
        />
      </div>

      <div className="dashboard-quick-actions">
        <h3>Quick Navigation</h3>
        <div className="quick-grid">
          <div className="quick-tile" onClick={() => navigate("/menu")}>
            <div className="tile-icon saffron"><FaUtensils /></div>
            <div className="tile-info">
              <h4>Browse Menu Catalog</h4>
              <p>View courses, prices, and food categories</p>
            </div>
            <FaArrowRight className="tile-arrow" />
          </div>

          <div className="quick-tile" onClick={() => navigate("/bookings")}>
            <div className="tile-icon amber"><FaCalendarAlt /></div>
            <div className="tile-info">
              <h4>Table Reservations</h4>
              <p>Check guest bookings, party sizes, and timings</p>
            </div>
            <FaArrowRight className="tile-arrow" />
          </div>

          <div className="quick-tile" onClick={() => navigate("/reviews")}>
            <div className="tile-icon gold"><FaStar /></div>
            <div className="tile-info">
              <h4>Customer Reviews</h4>
              <p>Review and approve new guest feedback</p>
            </div>
            <FaArrowRight className="tile-arrow" />
          </div>

          <div className="quick-tile" onClick={() => navigate("/offers")}>
            <div className="tile-icon smoke"><FaGift /></div>
            <div className="tile-info">
              <h4>Seasonal Offers</h4>
              <p>Update discounts and festival specials</p>
            </div>
            <FaArrowRight className="tile-arrow" />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
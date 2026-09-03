import AdminLayout from "../layouts/AdminLayout";
import DashboardCard from "../components/DashboardCard";

import {
  FaUtensils,
  FaCalendarAlt,
  FaStar,
  FaGift,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="cards">
        <DashboardCard
          title="Menu Items"
          value="8"
          icon={<FaUtensils />}
        />

        <DashboardCard
          title="Bookings"
          value="0"
          icon={<FaCalendarAlt />}
        />

        <DashboardCard
          title="Reviews"
          value="0"
          icon={<FaStar />}
        />

        <DashboardCard
          title="Offers"
          value="0"
          icon={<FaGift />}
        />
      </div>
    </AdminLayout>
  );
}
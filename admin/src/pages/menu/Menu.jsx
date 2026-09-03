import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import MenuList from "./MenuList";
import { FaPlus, FaUtensils } from "react-icons/fa";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="page-header-bar">
        <div className="page-header-left">
          <div className="page-icon-pill">
            <FaUtensils />
          </div>
          <div>
            <h2>Menu Catalog</h2>
            <p>Review all culinary dishes, categories, and prices offered to guests</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/menu/manage")}
          className="btn-luxury-primary"
        >
          <FaPlus style={{ marginRight: "8px" }} />
          Manage & Add Dishes
        </button>
      </div>

      <div className="admin-content-card">
        <MenuList manage={false} />
      </div>
    </AdminLayout>
  );
}
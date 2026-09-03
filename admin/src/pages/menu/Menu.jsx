import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import MenuList from "./MenuList";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>Menu Management</h1>

        <button
          onClick={() => navigate("/menu/manage")}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Edit Menu
        </button>
      </div>

      <MenuList manage={false} />
    </AdminLayout>
  );
}
import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AddMenu from "./AddMenu";
import MenuList from "./MenuList";
import { useNavigate } from "react-router-dom";

export default function ManageMenu() {
  const [showForm, setShowForm] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  // Called after Add/Update
  function handleSuccess() {
    setShowForm(false);
    setSelectedMenu(null);
    setRefresh(!refresh);
  }

  // Called when Edit button is clicked
  function handleEdit(menuItem) {
    setSelectedMenu(menuItem);
    setShowForm(true);
  }

  // Called when Add Menu button is clicked
  function handleAdd() {
    setSelectedMenu(null);
    setShowForm(true);
  }

  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
    <button
      onClick={() => navigate("/menu")}
      style={{
        background: "#6b7280",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      ← Back to Menu
    </button>

    <h1>Manage Menu</h1>
  </div>

        

        <button
          onClick={handleAdd}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Add Menu
        </button>
      </div>

      {showForm && (
        <AddMenu
          menuItem={selectedMenu}
          onSuccess={handleSuccess}
          onCancel={() => {
            setShowForm(false);
            setSelectedMenu(null);
          }}
        />
      )}

      <MenuList
        manage={true}
        onEdit={handleEdit}
        refresh={refresh}
      />
    </AdminLayout>
  );
}
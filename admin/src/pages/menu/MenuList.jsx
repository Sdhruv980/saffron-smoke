import { useEffect, useState } from "react";
import { getMenu, deleteMenu } from "../../services/menuservice";

export default function MenuList({
  manage = false,
  onEdit,
  refresh,
}) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    loadMenu();
  }, [refresh]);

  async function loadMenu() {
    try {
      const data = await getMenu();
      setMenu(data);
    } catch (error) {
      console.error("Error loading menu:", error);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMenu(id);

      alert("Menu item deleted successfully");

      loadMenu();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  }

  return (
    <table
      border="1"
      cellPadding="10"
      style={{
        width: "100%",
        marginTop: "20px",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>Category</th>
          <th>Item</th>
          <th>Price</th>

          {manage && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {menu.length > 0 ? (
          menu.map((item) => (
            <tr key={item.id}>
              <td>{item.category}</td>

              <td>{item.item}</td>

              <td>₹{item.price}</td>

              {manage && (
                <td>
                  <button
                    onClick={() => onEdit(item)}
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
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
              colSpan={manage ? 4 : 3}
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              No menu items found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
import { useEffect, useState } from "react";
import { getMenu, deleteMenu } from "../../services/menuservice";
import { FaEdit, FaTrash, FaUtensils } from "react-icons/fa";

export default function MenuList({
  manage = false,
  onEdit,
  refresh,
}) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenu();
  }, [refresh]);

  async function loadMenu() {
    try {
      setLoading(true);
      const data = await getMenu();
      setMenu(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading menu:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMenu(id);
      loadMenu();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  }

  const categoryBadges = {
    Starter: "badge-starter",
    "Main Course": "badge-main",
    Pizza: "badge-pizza",
    Pasta: "badge-pasta",
    Dessert: "badge-dessert",
    Beverage: "badge-beverage",
  };

  return (
    <div className="table-wrapper">
      <table className="luxury-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Item Name</th>
            <th style={{ textAlign: "right" }}>Price</th>
            {manage && <th style={{ textAlign: "center" }}>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={manage ? 4 : 3} className="table-state-cell">
                <div className="table-spinner"></div>
                <span>Loading menu items...</span>
              </td>
            </tr>
          ) : menu.length > 0 ? (
            menu.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className={`category-tag ${categoryBadges[item.category] || "badge-default"}`}>
                    {item.category}
                  </span>
                </td>

                <td className="item-name-cell">
                  <div className="dish-name-wrapper">
                    <span className="dish-title">{item.item}</span>
                  </div>
                </td>

                <td className="item-price-cell" style={{ textAlign: "right" }}>
                  <span className="price-tag">₹{item.price}</span>
                </td>

                {manage && (
                  <td style={{ textAlign: "center" }}>
                    <div className="action-buttons-group">
                      <button
                        onClick={() => onEdit(item)}
                        className="btn-action-edit"
                        title="Edit Item"
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn-action-delete"
                        title="Delete Item"
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={manage ? 4 : 3} className="table-state-cell empty">
                <FaUtensils className="empty-icon" />
                <p>No menu items found.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
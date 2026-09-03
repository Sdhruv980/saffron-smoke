import { useEffect, useState } from "react";
import { addMenu, updateMenu } from "../../services/menuservice";

export default function AddMenu({
  menuItem,
  onSuccess,
  onCancel,
}) {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");

  // Fill form when editing
  useEffect(() => {
    if (menuItem) {
      setCategory(menuItem.category);
      setItem(menuItem.item);
      setPrice(menuItem.price);
    } else {
      setCategory("");
      setItem("");
      setPrice("");
    }
  }, [menuItem]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!category || !item || !price) {
      alert("Please fill all fields.");
      return;
    }

    const data = {
      category,
      item,
      price: Number(price),
    };

    try {
      if (menuItem) {
        await updateMenu(menuItem.id, data);
        alert("Menu updated successfully!");
      } else {
        await addMenu(data);
        alert("Menu added successfully!");
      }

      setCategory("");
      setItem("");
      setPrice("");

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        {menuItem ? "Edit Menu Item" : "Add Menu Item"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Category</label>

          <br />

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Category"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Item Name</label>

          <br />

          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Enter Item Name"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Price</label>

          <br />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {menuItem ? "Update Menu" : "Add Menu"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          style={{
            marginLeft: "10px",
            background: "#6b7280",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
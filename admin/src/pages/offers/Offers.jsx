import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getOffers,
  addOffer,
  updateOffer,
  deleteOffer,
} from "../../services/offerService";

export default function Offers() {
  const [offers, setOffers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    discount: "",
    image: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    try {
      const data = await getOffers();
      setOffers(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingId) {
        await updateOffer(editingId, form);
        alert("Offer Updated");
      } else {
        await addOffer(form);
        alert("Offer Added");
      }

      setForm({
        title: "",
        description: "",
        discount: "",
        image: "",
        startDate: "",
        endDate: "",
        status: "Active",
      });

      setEditingId(null);

      loadOffers();
    } catch (err) {
      console.error(err);
    }
  }

  function editOffer(offer) {
    setEditingId(offer.id);
    setForm(offer);
  }

  async function removeOffer(id) {
    if (!window.confirm("Delete this offer?")) return;

    await deleteOffer(id);
    loadOffers();
  }

  return (
    <AdminLayout>

      <h1>Offer Management</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>

        <input
          type="text"
          placeholder="Offer Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Discount"
          value={form.discount}
          onChange={(e) =>
            setForm({ ...form, discount: e.target.value })
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <br /><br />

        <input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
        />

        <br /><br />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
        />

        <br /><br />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <br /><br />

        <button type="submit">
          {editingId ? "Update Offer" : "Add Offer"}
        </button>

      </form>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Discount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {offers.map((offer) => (
            <tr key={offer.id}>

              <td>{offer.title}</td>

              <td>{offer.discount}</td>

              <td>{offer.status}</td>

              <td>

                <button
                  onClick={() => editOffer(offer)}
                >
                  Edit
                </button>

                <button
                  onClick={() => removeOffer(offer.id)}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </AdminLayout>
  );
}
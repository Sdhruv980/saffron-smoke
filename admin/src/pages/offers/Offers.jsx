import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getOffers,
  addOffer,
  updateOffer,
  deleteOffer,
} from "../../services/OfferService";

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
      } else {
        await addOffer(form);
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

  function cancelEdit() {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      discount: "",
      image: "",
      startDate: "",
      endDate: "",
      status: "Active",
    });
  }

  async function removeOffer(id) {
    if (!window.confirm("Delete this offer?")) return;
    await deleteOffer(id);
    loadOffers();
  }

  return (
    <AdminLayout>

      {/* Page Header */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <div className="page-icon-pill amber">🏷️</div>
          <div>
            <h2>Special Offers & Promos</h2>
            <p>Create and manage discount offers and promotions</p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="admin-content-card" style={{ marginBottom: "28px" }}>
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(212,168,83,0.16)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <span style={{ fontSize: "16px" }}>{editingId ? "✏️" : "➕"}</span>
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "20px",
            color: "var(--smoke)",
            margin: 0,
          }}>
            {editingId ? "Edit Offer" : "Add New Offer"}
          </h3>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
            marginBottom: "18px",
          }}>
            {/* Offer Title */}
            <div className="offer-field-group">
              <label className="offer-label">Offer Title</label>
              <input
                className="offer-input"
                type="text"
                placeholder="e.g. Birthday Special"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            {/* Discount */}
            <div className="offer-field-group">
              <label className="offer-label">Discount</label>
              <input
                className="offer-input"
                type="text"
                placeholder="e.g. 20% or ₹200 off"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                required
              />
            </div>

            {/* Image URL */}
            <div className="offer-field-group">
              <label className="offer-label">Image URL</label>
              <input
                className="offer-input"
                type="text"
                placeholder="https://example.com/image.jpg"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>

            {/* Status */}
            <div className="offer-field-group">
              <label className="offer-label">Status</label>
              <select
                className="offer-input"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="offer-field-group">
              <label className="offer-label">Start Date</label>
              <input
                className="offer-input"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>

            {/* End Date */}
            <div className="offer-field-group">
              <label className="offer-label">End Date</label>
              <input
                className="offer-input"
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>

          {/* Description - full width */}
          <div className="offer-field-group" style={{ marginBottom: "24px" }}>
            <label className="offer-label">Description</label>
            <textarea
              className="offer-input"
              placeholder="Describe this offer..."
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ resize: "vertical", minHeight: "80px" }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" className="btn-luxury-primary" style={{ gap: "8px" }}>
              {editingId ? "✏️ Update Offer" : "➕ Add Offer"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn-luxury-secondary"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Offers Table */}
      <div className="admin-content-card">
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(212,168,83,0.16)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "20px",
            color: "var(--smoke)",
            margin: 0,
          }}>
            All Offers
          </h3>
          <span style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            background: "var(--bg-card-subtle)",
            padding: "4px 12px",
            borderRadius: "var(--radius-pill)",
            border: "1px solid rgba(212,168,83,0.2)",
          }}>
            {offers.length} offer{offers.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="table-wrapper">
          <table className="luxury-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Discount</th>
                <th>Validity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.length > 0 ? (
                offers.map((offer) => (
                  <tr key={offer.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--smoke)" }}>
                        {offer.title}
                      </div>
                    </td>
                    <td>
                      <div style={{
                        fontSize: "13px",
                        color: "var(--text-muted)",
                        maxWidth: "220px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {offer.description || "—"}
                      </div>
                    </td>
                    <td>
                      <span style={{
                        background: "#fef3c7",
                        color: "#b45309",
                        fontWeight: 700,
                        fontSize: "13px",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-pill)",
                        border: "1px solid #fde68a",
                      }}>
                        {offer.discount}
                      </span>
                    </td>
                    <td>
                      {offer.startDate || offer.endDate ? (
                        <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                          {offer.startDate && <span>{offer.startDate}</span>}
                          {offer.startDate && offer.endDate && <span> → </span>}
                          {offer.endDate && <span>{offer.endDate}</span>}
                        </div>
                      ) : (
                        <span style={{ color: "var(--text-light)", fontSize: "13px" }}>—</span>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${offer.status === "Active" ? "accepted" : "rejected"}`}>
                        {offer.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-group">
                        <button
                          className="btn-action-edit"
                          onClick={() => editOffer(offer)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn-action-delete"
                          onClick={() => removeOffer(offer.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="table-state-cell">
                    <div className="empty-icon">🏷️</div>
                    <div>No offers found. Add your first offer above.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline styles for form inputs */}
      <style>{`
        .offer-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .offer-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--smoke);
        }
        .offer-input {
          padding: 10px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-family: var(--font-body);
          color: var(--smoke);
          background: #fdfbf7;
          outline: none;
          transition: all 0.2s;
          width: 100%;
        }
        .offer-input:focus {
          border-color: var(--saffron);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(212,168,83,0.15);
        }
        .offer-input option {
          background: #fff;
        }
      `}</style>

    </AdminLayout>
  );
}

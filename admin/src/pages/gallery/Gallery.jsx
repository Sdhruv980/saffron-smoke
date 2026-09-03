import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getGallery,
  addGallery,
  updateGallery,
  deleteGallery,
} from "../../services/galleryService";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);

  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      const data = await getGallery();
      setGallery(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title || !form.image) {
      alert("Title and Image URL are required.");
      return;
    }

    try {
      if (editingId) {
        await updateGallery(editingId, form);
      } else {
        await addGallery(form);
      }

      setForm({ title: "", image: "", description: "" });
      setEditingId(null);
      loadGallery();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  }

  function editImage(item) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      image: item.image,
      description: item.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ title: "", image: "", description: "" });
  }

  async function removeImage(id) {
    if (!window.confirm("Delete this image?")) return;
    try {
      await deleteGallery(id);
      loadGallery();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AdminLayout>

      {/* Page Header */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <div className="page-icon-pill">🖼️</div>
          <div>
            <h2>Gallery Management</h2>
            <p>Upload and manage restaurant photos and images</p>
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
            {editingId ? "Edit Image" : "Add New Image"}
          </h3>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
            marginBottom: "18px",
          }}>
            {/* Image Title */}
            <div className="gallery-field-group">
              <label className="gallery-label">Image Title <span style={{ color: "#dc2626" }}>*</span></label>
              <input
                className="gallery-input"
                type="text"
                placeholder="e.g. Grilled Lamb Chops"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            {/* Image URL */}
            <div className="gallery-field-group">
              <label className="gallery-label">Image URL <span style={{ color: "#dc2626" }}>*</span></label>
              <input
                className="gallery-input"
                type="text"
                placeholder="https://example.com/photo.jpg"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="gallery-field-group" style={{ marginBottom: "18px" }}>
            <label className="gallery-label">Description</label>
            <textarea
              className="gallery-input"
              placeholder="Brief description of this image..."
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ resize: "vertical", minHeight: "80px" }}
            />
          </div>

          {/* Preview strip */}
          {form.image && (
            <div style={{
              marginBottom: "20px",
              padding: "14px",
              background: "var(--bg-card-subtle)",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(212,168,83,0.16)",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}>
              <img
                src={form.image}
                alt="preview"
                style={{
                  width: "72px",
                  height: "72px",
                  objectFit: "cover",
                  borderRadius: "var(--radius-sm)",
                  border: "2px solid rgba(212,168,83,0.3)",
                }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--smoke)" }}>
                  {form.title || "Untitled"}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                  Image preview
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" className="btn-luxury-primary">
              {editingId ? "✏️ Update Image" : "➕ Add Image"}
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

      {/* Gallery Table */}
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
            Gallery Images
          </h3>
          <span style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            background: "var(--bg-card-subtle)",
            padding: "4px 12px",
            borderRadius: "var(--radius-pill)",
            border: "1px solid rgba(212,168,83,0.2)",
          }}>
            {gallery.length} image{gallery.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="table-wrapper">
          <table className="luxury-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gallery.length > 0 ? (
                gallery.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(212,168,83,0.2)",
                          display: "block",
                        }}
                      />
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--smoke)", fontSize: "15px" }}>
                        {item.title}
                      </div>
                    </td>
                    <td>
                      <div style={{
                        fontSize: "13px",
                        color: "var(--text-muted)",
                        maxWidth: "300px",
                        lineHeight: "1.5",
                      }}>
                        {item.description || <span style={{ color: "var(--text-light)" }}>—</span>}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons-group">
                        <button
                          className="btn-action-edit"
                          onClick={() => editImage(item)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn-action-delete"
                          onClick={() => removeImage(item.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="table-state-cell">
                    <div className="empty-icon">🖼️</div>
                    <div>No images yet. Add your first gallery image above.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .gallery-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .gallery-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--smoke);
        }
        .gallery-input {
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
        .gallery-input:focus {
          border-color: var(--saffron);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(212,168,83,0.15);
        }
      `}</style>

    </AdminLayout>
  );
}

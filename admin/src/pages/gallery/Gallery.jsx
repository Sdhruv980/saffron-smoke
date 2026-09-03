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
        alert("Image Updated Successfully");
      } else {
        await addGallery(form);
        alert("Image Added Successfully");
      }

      setForm({
        title: "",
        image: "",
        description: "",
      });

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

      <h1>Gallery Management</h1>

      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "30px" }}
      >

        <input
          type="text"
          placeholder="Image Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.value,
            })
          }
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <br /><br />

        <button type="submit">
          {editingId ? "Update Image" : "Add Image"}
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
            <th>Preview</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
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
                    width="80"
                    height="80"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>

                <td>{item.title}</td>

                <td>{item.description}</td>

                <td>

                  <button
                    onClick={() => editImage(item)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => removeImage(item.id)}
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Images Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </AdminLayout>
  );
}
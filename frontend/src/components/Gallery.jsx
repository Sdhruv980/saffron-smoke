import { useEffect, useState } from "react";
import API_BASE from "../config";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      const response = await fetch(`${API_BASE}/api/gallery`);

      if (!response.ok) {
        throw new Error("Failed to load gallery");
      }

      const data = await response.json();
      setGallery(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section id="gallery" className="section gallery">
      <div className="container">

        <div className="section__header">
          <span className="section__label">
            Our Gallery
          </span>

          <h2 className="section__title">
            Delicious Moments
          </h2>
        </div>

        <div
          className="gallery__grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {gallery.length > 0 ? (
            gallery.map((item) => (
              <div
                key={item.id}
                className="gallery__card"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "15px" }}>
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No gallery images available.</p>
          )}
        </div>

      </div>
    </section>
  );
}
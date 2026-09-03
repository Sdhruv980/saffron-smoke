import { useEffect, useState } from "react";

export default function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    try {
      const response = await fetch("http://localhost:5000/api/offers");

      const data = await response.json();

      // Show only Active offers
      setOffers(
        data.filter((offer) => offer.status === "Active")
      );
    } catch (error) {
      console.error("Failed to load offers:", error);
    }
  }

  return (
    <section id="offers" className="section offers">
      <div className="container">

        <div className="section__header">
          <span className="section__label">
            Deals & Promotions
          </span>

          <h2 className="section__title">
            Special Offers
          </h2>
        </div>

        <div className="offers__grid">

          {offers.length > 0 ? (
            offers.map((offer, index) => (
              <div
                key={offer.id}
                className="offers__card"
              >
                <span className="offers__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="offers__title">
                  {offer.title}
                </h3>

                <p className="offers__desc">
                  {offer.description}
                </p>

                <p>
                  <strong>Discount:</strong> {offer.discount}
                </p>
              </div>
            ))
          ) : (
            <p>No active offers available.</p>
          )}

        </div>

      </div>
    </section>
  );
}
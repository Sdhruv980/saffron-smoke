import { useEffect, useState } from "react";
import {
  getOffers,
  deleteOffer,
  updateOffer,
} from "../../services/OfferService";

export default function OfferList({ refresh, onRefresh }) {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    loadOffers();
  }, [refresh]);

  async function loadOffers() {
    try {
      const data = await getOffers();
      setOffers(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function removeOffer(id) {
    if (!window.confirm("Delete this offer?")) return;

    try {
      await deleteOffer(id);
      loadOffers();

      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
    }
  }

  async function changeStatus(id, status) {
    try {
      await updateOffer(id, { status });

      loadOffers();

      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
    }
  }

  return (
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
          <th>Description</th>
          <th>Discount</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {offers.length > 0 ? (
          offers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.title}</td>

              <td>{offer.description}</td>

              <td>{offer.discount}</td>

              <td>{offer.status}</td>

              <td>
                <button
                  onClick={() =>
                    changeStatus(offer.id, "Active")
                  }
                  style={{
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Active
                </button>

                <button
                  onClick={() =>
                    changeStatus(offer.id, "Inactive")
                  }
                  style={{
                    marginLeft: "10px",
                    background: "#f59e0b",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Inactive
                </button>

                <button
                  onClick={() => removeOffer(offer.id)}
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
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="5"
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              No offers found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
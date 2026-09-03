const API_URL = "http://localhost:5000/api/offers";

// Get all offers
export async function getOffers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch offers");
  }

  return await response.json();
}

// Add new offer
export async function addOffer(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add offer");
  }

  return await response.json();
}

// Update offer
export async function updateOffer(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update offer");
  }

  return await response.json();
}

// Delete offer
export async function deleteOffer(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete offer");
  }

  return await response.json();
}
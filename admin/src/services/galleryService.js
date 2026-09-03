import API_BASE from "./config";
const API_URL = `${API_BASE}/api/gallery`;

// Get all gallery images
export async function getGallery() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch gallery.");
  }

  return await response.json();
}

// Add gallery image
export async function addGallery(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add image.");
  }

  return await response.json();
}

// Update gallery image
export async function updateGallery(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update image.");
  }

  return await response.json();
}

// Delete gallery image
export async function deleteGallery(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete image.");
  }

  return await response.json();
}
import API_BASE from "./config";
const API = `${API_BASE}/api/menu`;

// ==========================
// GET ALL MENU
// ==========================
export async function getMenu() {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to load menu");
  }

  return await response.json();
}

// ==========================
// ADD MENU
// ==========================
export async function addMenu(menuItem) {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItem),
  });

  if (!response.ok) {
    throw new Error("Failed to add menu item");
  }

  return await response.json();
}

// ==========================
// UPDATE MENU
// ==========================
export async function updateMenu(id, menuItem) {
  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItem),
  });

  if (!response.ok) {
    throw new Error("Failed to update menu item");
  }

  return await response.json();
}

// ==========================
// DELETE MENU
// ==========================
export async function deleteMenu(id) {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete menu item");
  }

  return await response.json();
}
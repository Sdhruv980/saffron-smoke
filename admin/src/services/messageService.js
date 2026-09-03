const API_URL = "http://localhost:5000/api/messages";

// Get all messages
export async function getMessages() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch messages.");
  }

  return await response.json();
}

// Add a new message
export async function addMessage(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to send message.");
  }

  return await response.json();
}

// Update message (Read / Unread)
export async function updateMessage(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update message.");
  }

  return await response.json();
}

// Delete message
export async function deleteMessage(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete message.");
  }

  return await response.json();
}
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getMessages,
  updateMessage,
  deleteMessage,
} from "../../services/messageService";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function changeStatus(id, status) {
    try {
      await updateMessage(id, { status });
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  }

  async function removeMessage(id) {
    if (!window.confirm("Delete this message?")) return;

    try {
      await deleteMessage(id);
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AdminLayout>

      <h1>Message Management</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {messages.length > 0 ? (
            messages.map((msg) => (
              <tr key={msg.id}>

                <td>{msg.name}</td>

                <td>{msg.email}</td>

                <td>{msg.subject}</td>

                <td>{msg.message}</td>

                <td>{msg.status}</td>

                <td>

                  <button
                    onClick={() =>
                      changeStatus(msg.id, "Read")
                    }
                    style={{
                      background: "#16a34a",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Read
                  </button>

                  <button
                    onClick={() =>
                      changeStatus(msg.id, "Unread")
                    }
                    style={{
                      marginLeft: "10px",
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Unread
                  </button>

                  <button
                    onClick={() =>
                      removeMessage(msg.id)
                    }
                    style={{
                      marginLeft: "10px",
                      background: "#dc2626",
                      color: "white",
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
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Messages Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </AdminLayout>
  );
}
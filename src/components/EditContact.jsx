import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const EditContact = () => {
  const { id } = useParams(); // Get contact ID from URL
  const navigate = useNavigate(); // To navigate back after edit
  const { store, dispatch } = useGlobalReducer();

  // State to hold updated contact details
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (store.contacts.length > 0) {
      const foundContact = store.contacts.find(c => c.id === parseInt(id));
      if (foundContact) {
        setFormData(foundContact); // Populate form with existing contact data
      }
    }
  }, [store.contacts, id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Update API)
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    fetch(`https://playground.4geeks.com/contact/agendas/taylor/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((updatedContact) => {
        // Dispatch update action to global store
        dispatch({ type: "update_contact", contact: updatedContact });

        // Navigate back to contact list
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating contact:", err);
        setError("Failed to update contact. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  if (!store?.contacts) {
    return <p>Loading contacts...</p>;
  }

  if (!formData.name) {
    return <p>Contact not found</p>;
  }

  return (
    <div>
      <h2>Edit Contact</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Contact"}
        </button>
      </form>
    </div>
  );
};

export default EditContact;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const DUMMY_CONTACTS = [
  { name: "Alice Johnson", email: "alice.johnson@email.com", phone: "555-101-2020", address: "12 Maple Street" },
  { name: "Bob Smith", email: "bob.smith@email.com", phone: "555-303-4040", address: "34 Oak Avenue" },
  { name: "Charlie Brown", email: "charlie.brown@email.com", phone: "555-505-6060", address: "56 Pine Lane" },
  { name: "Dana White", email: "dana.white@email.com", phone: "555-707-8080", address: "78 Cedar Court" },
  { name: "Ethan Ray", email: "ethan.ray@email.com", phone: "555-909-0001", address: "90 Birch Blvd" },
];

export default function AddContact() {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });
  const [usedIndices, setUsedIndices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitContact = (contact) => {
    setLoading(true);

    fetch("https://playground.4geeks.com/contact/agendas/taylor/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    })
      .then((resp) => {
        if (!resp.ok) {
          console.error("Failed to add contact");
          return null;
        }
        return resp.json();
      })
      .then((data) => {
        if (data) {
          dispatch({ type: "add_contact", contact: data });
          navigate("/");
        }
      })
      .catch((error) => console.error("Error submitting contact:", error))
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitContact(formData);
  };

  const addDummyContact = () => {
    if (usedIndices.length === DUMMY_CONTACTS.length) {
      alert("All dummy contacts have been added.");
      return;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * DUMMY_CONTACTS.length);
    } while (usedIndices.includes(randomIndex));

    setUsedIndices((prev) => [...prev, randomIndex]);
    submitContact(DUMMY_CONTACTS[randomIndex]);
  };

  return (
    <div className="container w-75 my-5 p-4 rounded border bg-success-subtle text-success-emphasis">
      <form className="row g-3" onSubmit={handleSubmit}>
        {["name", "email", "phone", "address"].map((field) => (
          <div className="col" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              type={field === "email" ? "email" : "text"}
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={
                field === "name"
                  ? "e.g., John Doe"
                  : field === "email"
                  ? "john@example.com"
                  : field === "phone"
                  ? "###-###-####"
                  : "1234 Main St"
              }
              required
            />
          </div>
        ))}

        <div className="d-flex justify-content-between">
          <Link to="/">
            <button type="button" className="btn btn-outline-secondary">Go Back</button>
          </Link>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Adding..." : "Add Contact"}
          </button>
        </div>

        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-warning"
            onClick={addDummyContact}
            disabled={loading}
          >
            {loading ? "Adding Dummy..." : "Add Dummy Contact"}
          </button>
        </div>
      </form>
    </div>
  );
}

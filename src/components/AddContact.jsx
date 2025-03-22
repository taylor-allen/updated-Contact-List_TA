import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function AddContact() {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newContact = {
      name: name,
      email: email,
      phone: phone,
      address: address,
    };

    fetch("https://playground.4geeks.com/contact/agendas/taylor/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
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
          // Dispatch the new contact to global state
          dispatch({
            type: "add_contact",
            contact: data,
          });

          // Redirect to the homepage
          navigate("/");
        }
      })
      .catch((error) => console.error("Error adding contact:", error))
      .finally(() => setLoading(false));
  };
  const dummyContacts = [
    {
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "555-101-2020",
      address: "12 Maple Street",
    },
    {
      name: "Bob Smith",
      email: "bob.smith@email.com",
      phone: "555-303-4040",
      address: "34 Oak Avenue",
    },
    {
      name: "Charlie Brown",
      email: "charlie.brown@email.com",
      phone: "555-505-6060",
      address: "56 Pine Lane",
    },
    {
      name: "Dana White",
      email: "dana.white@email.com",
      phone: "555-707-8080",
      address: "78 Cedar Court",
    },
    {
      name: "Ethan Ray",
      email: "ethan.ray@email.com",
      phone: "555-909-0001",
      address: "90 Birch Blvd",
    },
  ];

  const [usedIndices, setUsedIndices] = useState([]);

  const addDummyContact = () => {
    if (usedIndices.length === dummyContacts.length) {
      alert("All dummy contacts have been added.");
      return;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * dummyContacts.length);
    } while (usedIndices.includes(randomIndex));

    const selectedContact = dummyContacts[randomIndex];

    setLoading(true);

    fetch("https://playground.4geeks.com/contact/agendas/taylor/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedContact),
    })
      .then((resp) => {
        if (!resp.ok) {
          console.error("Failed to add dummy contact");
          return null;
        }
        return resp.json();
      })
      .then((data) => {
        if (data) {
          dispatch({
            type: "add_contact",
            contact: data,
          });
          setUsedIndices([...usedIndices, randomIndex]);
        }
      })
      .catch((error) => console.error("Error adding dummy contact:", error))
      .finally(() => setLoading(false));
      navigate("/");
  };

  return (
    <div className="container w-75 my-5 p-4 rounded border bg-success-subtle text-success-emphasis">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., John Doe"
            required
          />
        </div>
        <div className="col">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@email.com"
            required
          />
        </div>
        <div className="col">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="###-###-####"
            required
          />
        </div>
        <div className="col">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="1234 Main St"
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <Link to="/">
            <button type="button" className="btn btn-outline-secondary">
              Go Back
            </button>
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

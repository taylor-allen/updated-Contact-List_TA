import React, { useEffect, useState } from "react";

export const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  const getData = async () => {
    const resp = await fetch(
      "https://playground.4geeks.com/contact/agendas/taylor/contacts/53"
    );
    const data = await resp.json();
    setContacts(data.contacts);
  };

  const createData = async (name, phone, email, address) => {
    const resp = await fetch(
      "https://playground.4geeks.com/contact/agendas/taylor/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "John Doe",
          phone: "123-132-1241",
          email: "another@email.com",
          address: "5324 Anon Dr. City, State, 12345",
        }),
      }
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <hr/>
      <code>{JSON.stringify(contacts)}</code>
      <hr/>
      <button onClick={async () => {await createData(); await getData()}} className="btn btn-primary my-4">Add new data</button>
    </div>
  )
};

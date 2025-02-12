import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"

export const ContactPage = () => {
  const { id } = useParams()
  // const nav = useNavigate()
  const [contact, setContact] = useState({})
  const { store } = useGlobalReducer();

  useEffect(() => {
    setContact(store.contacts.find((contact) => contact.id == id ))
    // if (!contacts && store.contacts) {
    //   nav("/")
    // }
  }, [store])

  return (
    <div className="container mt-3 px-5">
      <h1>{contact?.name}</h1>
      <h2>{contact?.phone}</h2>
      <h2>{contact?.email}</h2>
      <h2>{contact?.address}</h2>
    </div>
  );
};

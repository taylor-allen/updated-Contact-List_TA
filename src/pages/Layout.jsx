import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Layout = () => {
  const { dispatch } = useGlobalReducer();

  const getData = () => {
    console.log("Fetching contacts..."); 

    fetch("https://playground.4geeks.com/contact/agendas/taylor/contacts")
      .then((resp) => {
        console.log("API Response Status:", resp.status);
        
        if (!resp.ok) {
          console.warn("Primary fetch failed. Attempting to create agenda...");

          return fetch("https://playground.4geeks.com/contact/agendas/taylor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ agenda_name: "taylor" }),
          }).then((createResp) => {
            if (!createResp.ok) {
              console.error("Failed to create agenda.");
              return null; // Stop execution if agenda creation fails
            }

            // If the agenda was created successfully, fetch contacts again
            return fetch(
              "https://playground.4geeks.com/contact/agendas/taylor/contacts"
            );
          });
        }
        return resp;
      })
      .then((resp) => (resp ? resp.json() : null)) // Convert response to JSON if it's valid
      .then((data) => {
        console.log("Fetched contacts:", data); // Debugging fetched data

        if (data && data.contacts) {
          dispatch({
            type: "load_contacts",
            contacts: data.contacts,
          });
          console.log("Reducer: Updating store with contacts", data.contacts);
        } else {
          console.warn("No contacts found in response.");
        }
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollToTop>
      
      <Navbar />
      
      <Outlet/>
      
      <Footer />
      
    </ScrollToTop>
  );
};

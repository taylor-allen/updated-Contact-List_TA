import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const {dispatch} = useGlobalReducer();

	const getData = async () => {
		const resp = await fetch(
		  "https://playground.4geeks.com/contact/agendas/taylor/contacts"
		);
		const data = await resp.json();
		dispatch({
            type: "load_contacts",
            contacts: data.contacts
        })
	  };

    useEffect(() => {
        getData();
    }, [])
    
    return (
        <ScrollToTop>
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}

import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const Home = () => {
	  const { store } = useGlobalReducer();


	return (
		<div className="container d-flex flex-column justify-center">
			{store.contacts?.map(contact => <ContactCard contact={contact} key={contact.id}/>)}

			
		</div>
	);
}; 
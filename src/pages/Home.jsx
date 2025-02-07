import { ContactList } from "../components/ContactList.jsx";
import { useEffect, useState } from "react";

export const Home = () => {
	const [isHello, setIsHello] = useState(true)

	return (
		<div className="text-center mt-5">
			<h1>{isHello ? "Hello" : "Goodbye"} world!</h1>
			<button onClick={() => setIsHello(!isHello)} className="btn btn-primary">
				Say { isHello ? "Goodbye" : "Hello"} Instead
			</button>
			<ContactList/>
		</div>
	);
}; 
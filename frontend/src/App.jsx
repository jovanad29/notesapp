import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
	const userId = localStorage.getItem("userId");
	const navigate = useNavigate();
	const handleClick = () => {
		if (confirm("Are you sure you want to sign out?")) {
			localStorage.removeItem("userId");
			navigate("/");
		}
	};
	return (
		<>
			<div className="container">
				<h1>My Notes App</h1>
				{userId && <button onClick={handleClick}>Sign Out</button>}
			</div>
			<div className="outlet-container">
				<Outlet />
			</div>
		</>
	);
}

export default App;

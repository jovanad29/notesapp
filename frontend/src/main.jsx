import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Notes from "./Components/Notes/Notes.jsx";
import ArchivedNotes from "./Components/ArchivedNotes/ArchivedNotes.jsx";
import ErrorPage from "./Components/ErrorPage/ErrorPage.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <SignIn />,
			},
			{
				path: "/my-notes",
				element: <Notes />,
			},
			{
				path: "/archived-notes",
				element: <ArchivedNotes />,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

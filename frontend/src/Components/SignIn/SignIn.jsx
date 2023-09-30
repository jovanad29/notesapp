import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SignIn.module.css";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

export default function SingIn() {
	const navigate = useNavigate();
	const userId = localStorage.getItem("userId");
	if (userId) return <Navigate to={"/my-notes"} />;
	const dispatch = useDispatch();
	const [user, setUser] = useState({ username: "", password: "" });

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				(import.meta.env.VITE_API_URL || "http://localhost:3001/api") +
					"/users/login",
				user
			)
			.then(({ data }) => {
				if (data.statusCode == 200) {
					alert("You've logged in!");
					localStorage.setItem("userId", data.result);
					navigate("/my-notes");
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className={styles.formContainer}>
			<form onSubmit={handleSubmit}>
				<h2>Sign In</h2>
				<div className={styles.formGroup}>
					<label htmlFor="username">
						<strong>Username:</strong>
					</label>
					<input
						type="text"
						name="username"
						id="username"
						onChange={handleChange}
						value={user.username}
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="password">
						<strong>Password:</strong>
					</label>
					<input
						type="password"
						name="password"
						id="password"
						onChange={handleChange}
						value={user.password}
					/>
				</div>
				<div className={styles.wrapperButtonsRight}>
					<button type="button">Cancel</button>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}

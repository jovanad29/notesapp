import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./NoteForm.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getNotes } from "../../redux/actions";

export default function NoteForm({ onClose }) {
	const navigate = useNavigate();
	const userId = localStorage.getItem("userId");
	if (!userId) navigate("/");
	const dispatch = useDispatch();
	const noteId = useSelector((state) => state.noteId);
	const [note, setNote] = useState({
		id: 0,
		title: "",
		content: "",
		userId: userId || null,
		categories: [],
	});
	useEffect(() => {
		if (noteId) {
			axios
				.get(
					"http://localhost:3001/api/notes/" +
						noteId +
						"?userId=" +
						userId
				)
				.then(({ data }) => {
					setNote({
						id: data.result.id,
						userId: data.result.userId,
						title: data.result.title,
						content: data.result.content,
						categories: data.result.Categories.map((c) => c.name),
					});
				})
				.catch((error) => console.log(error));
		}
	}, [noteId]);
	const handleChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	const handleCategory = () => {
		const category = document.getElementById("category").value;
		setNote({ ...note, categories: [...note.categories, category] });
	};
	const delCategory = (input) => {
		// if (confirm("Are you sure?")) {
		setNote({
			...note,
			categories: note.categories.filter((value) => value != input),
		});
		// alert("Category removed");
		// }
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const method = noteId ? "put" : "post";
		const url = noteId
			? "http://localhost:3001/api/notes/" + noteId + "?userId=" + userId
			: "http://localhost:3001/api/notes?userId=" + userId;
		axios[method](url, note)
			.then(({ data }) => {
				if (method == "post") {
					alert(data.statusText);
				} else {
					alert(`Note updated successfuly!`);
				}

				dispatch(getNotes(userId));
				onClose();
			})
			.catch((error) => {
				console.log(error);
				alert(`Error while saving note!`);
			});
		setNote({
			id: 0,
			title: "",
			content: "",
			userId: userId || null,
			categories: [],
		});
	};
	if (Object.keys(note).length) {
		return (
			<div className={styles.formContainer}>
				<form onSubmit={handleSubmit}>
					<h2>{noteId ? "Edit" : "Create"} note</h2>
					<div className={styles.formGroup}>
						<label htmlFor="title">
							<strong>Title:</strong>
						</label>
						<input
							type="text"
							name="title"
							id="title"
							onChange={handleChange}
							value={note.title}
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="content">
							<strong>Content:</strong>
						</label>
						<textarea
							name="content"
							id="content"
							cols="20"
							rows="10"
							onChange={handleChange}
							value={note.content}></textarea>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="category">
							<strong>Categories:</strong>
						</label>
						<div id={styles.categories}>
							{note.categories?.map((c) => {
								return (
									<div key={Math.random()} className="item">
										<div>
											<p>{c}</p>
										</div>
										<button
											className="btn"
											onClick={() => delCategory(c)}>
											x
										</button>
									</div>
								);
							})}
						</div>
					</div>
					<div className={styles.formGroupSpecial}>
						<div className={styles.specialWrapper}>
							<input type="text" name="category" id="category" />
							<button type="button" onClick={handleCategory}>
								Add
							</button>
						</div>
					</div>
					<div className={styles.wrapperButtonsRight}>
						<button type="button" onClick={onClose}>
							Cancel
						</button>
						<button type="submit">Save</button>
					</div>
				</form>
			</div>
		);
	}
	return <h2>Cargando...</h2>;
}

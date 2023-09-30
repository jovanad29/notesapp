import { useDispatch } from "react-redux";
import { getNotes, setNote } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Note.module.css";

export default function Note({ note, setOpen, open }) {
	const { id, title, content, archived, Categories } = note;
	const userId = localStorage.getItem("userId");
	const dispatch = useDispatch();
	const openForm = () => {
		setOpen(true);
		dispatch(setNote(id));
	};
	const archiveNote = () => {
		axios
			.put(
				"http://localhost:3001/api/notes/" +
					id +
					"/archive?userId=" +
					userId
			)
			.then((r) => {
				dispatch(getNotes(userId));
				alert("Note " + (archived ? "Unarchived" : "Archived"));
			})
			.catch((error) => console.log(error));
	};
	const deleteNote = () => {
		if (confirm("Are you sure?")) {
			axios
				.delete(
					"http://localhost:3001/api/notes/" +
						id +
						"?userId=" +
						userId
				)
				.then((r) => {
					dispatch(getNotes(userId));
					alert("Note deleted successfuly");
				})
				.catch((error) => console.log(error));
		}
	};
	return (
		<ul className={styles.noteContainer}>
			<div className={styles.styleWrapper}>
				<li>
					<strong>Title:</strong> {title}
				</li>
				<li>
					<strong>Content:</strong> {content}
				</li>
			</div>
			<ul>
				{Categories.length
					? Categories.map((category) => (
							<li key={category.id}>Category: {category.name}</li>
					  ))
					: ""}
			</ul>
			<button type="button" onClick={openForm}>
				Update
			</button>
			<button type="button" onClick={archiveNote}>
				{archived ? "Unarchive" : "Archive"}
			</button>
			<button type="button" onClick={deleteNote}>
				Delete
			</button>
		</ul>
	);
}

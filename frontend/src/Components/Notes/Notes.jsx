import { Link, Navigate } from "react-router-dom";
import Note from "../Note/Note";
import NotFound from "../NotFound/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../redux/actions";
import { useEffect, useState } from "react";
import NoteForm from "../NoteForm/NoteForm";
import styles from "./Notes.module.css";

export default function Notes() {
	const userId = localStorage.getItem("userId");
	if (!userId) return <Navigate to={"/"} />;
	const notes = useSelector((state) => state.notes);
	const filteredNotes = notes;
	const categories = useSelector((state) => state.categories);
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const openForm = () => {
		setOpen(true);
	};
	const closeForm = () => {
		setOpen(false);
	};
	useEffect(() => {
		dispatch(getNotes(userId));
	}, [dispatch]);

	// const handleChange = (e) => {
	// 	filteredNotes = notes.filter((n) =>
	// 		n.Categories.map((c) => c.name).includes(e.target.value)
	// 	);
	// };
	return (
		<section>
			<div className={styles.stylesWrapper}>
				<h1>My Notes</h1>
				<button type="button" onClick={openForm}>
					Create note
				</button>
			</div>
			<Link to={`/archived-notes`}>Archived Notes</Link>
			{filteredNotes.length ? (
				notes.map((note) => (
					<Note
						key={note.id}
						note={note}
						setOpen={setOpen}
						open={open}
					/>
				))
			) : (
				<NotFound />
			)}
			{open && <NoteForm onClose={closeForm} />}
		</section>
	);
}

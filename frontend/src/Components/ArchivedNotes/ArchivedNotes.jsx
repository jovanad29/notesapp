import { Link, useNavigate } from "react-router-dom";
import Note from "../Note/Note";
import NotFound from "../NotFound/NotFound";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getArchivedNotes } from "../../redux/actions";

export default function Notes() {
	const navigate = useNavigate();
	const userId = localStorage.getItem("userId");
	if (!userId) navigate("/");
	const archivedNotes = useSelector((state) => state.archivedNotes);
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const closeForm = () => {
		setOpen(false);
	};
	useEffect(() => {
		dispatch(getArchivedNotes(userId));
	}, [dispatch]);
	return (
		<section>
			<h1>Archived Notes</h1>
			<Link to={`/my-notes`}>Go back to unarchived notes</Link>
			{archivedNotes.length ? (
				archivedNotes.map((note) => (
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

import {
	GET_NOTES,
	GET_ARCHIVED_NOTES,
	FILTER_BY_CATEGORY,
	SET_NOTE,
	GET_CATEGORIES,
} from "./actions";

const initialState = {
	notes: [],
	archivedNotes: [],
	filteredNotes: [],
	categories: [],
	noteId: null,
	userId: null,
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_NOTES:
			return {
				...state,
				notes: action.payload,
				filteredNotes: action.payload,
			};
		case GET_ARCHIVED_NOTES:
			return {
				...state,
				archivedNotes: action.payload,
			};
		case FILTER_BY_CATEGORY:
			return {
				...state,
				filteredNotes: action.payload,
			};
		case SET_NOTE:
			return {
				...state,
				noteId: action.payload,
			};
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		default:
			return state;
	}
};

export default rootReducer;

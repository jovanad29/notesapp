import axios from "axios";

export const GET_NOTES = "GET_NOTES";
export const GET_ARCHIVED_NOTES = "GET_ARCHIVED_NOTES";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const SET_NOTE = "SET_NOTE";
export const GET_CATEGORIES = "GET_CATEGORIES";
const API_URL = import.meta.env.VITE_API_URL;

export function getNotes(userId) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`${API_URL}/notes?userId=${userId}`
			);
			console.log(data);
			return dispatch({
				type: GET_NOTES,
				payload: data.result,
			});
		} catch (error) {
			console.log(error);
			return dispatch({
				type: GET_NOTES,
				payload: [],
			});
		}
	};
}

export function setNote(id) {
	return { type: SET_NOTE, payload: id };
}

export function getArchivedNotes(userId) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`${API_URL}/notes?archived=true&userId=${userId}`
			);
			const archivedNotes = data.result;
			return dispatch({
				type: GET_ARCHIVED_NOTES,
				payload: archivedNotes,
			});
		} catch (error) {
			console.log(error);
			return dispatch({
				type: GET_ARCHIVED_NOTES,
				payload: [],
			});
		}
	};
}

// export function getFilteredNotes(category) {
// 	return { type: FILTER_BY_CATEGORY, payload: category };
// }

export function getCategories(userId) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`${API_URL}/categories?userId=${userId}`
			);
			return dispatch({
				type: GET_CATEGORIES,
				payload: data.result,
			});
		} catch (error) {
			console.log(error);
			return dispatch({
				type: GET_CATEGORIES,
				payload: [],
			});
		}
	};
}

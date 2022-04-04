import axios from 'axios';

const headers = {
	Group: 161,
	Autorizacion: tokenFromLocalStorage(),
};

export const privatePostRequest = async (route, postData) => {
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/${route}`,
			postData,
			headers
		);
		return data;
	} catch (error) {
		return error;
	}
};

export const privatePutRequest = async ({ url, putData }) => {
	try {
		const res = await axios.put(
			`${process.env.REACT_APP_BASE_URL}/${url}`,
			putData,
			headers
		);
		return res;
	} catch (err) {
		console.log(err);
	}
};

export const privateDeleteRequest = async ({ url }) => {
	try {
		const res = await axios.delete(
			`${process.env.REACT_APP_BASE_URL}/${url}`,
			headers
		);
		console.log(res);
		return res;
	} catch (err) {
		console.log(err);
	}
};

/**
 * Function to generate a POST request
 * @param {string} route  Endpoint's route. Example: "/testimonials"
 * @param {Object} patchData Object with the post data
 * @returns {Promise}
 */
export async function privatePatchRequest(route, patchData) {
	const headers = { ...tokenFromLocalStorage() };
	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_BASE_URL}/${route}`,
			patchData,
			headers
		);
		return data;
	} catch (error) {
		return error;
	}
}

const getDataMethodPrivate = async (sector, id = null) => {
	if (sector !== 'auth') {
		try {
			const result = await axios.get(
				id
					? `${process.env.REACT_APP_BASE_URL}/${sector}/${id}`
					: `${process.env.REACT_APP_BASE_URL}/${sector}`,
				headers
			);
			console.log(result);
			return result;
		} catch (error) {
			console.error(error);
		}
	} else {
		try {
			const result = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/auth/me`,
				{
					headers,
				}
			);
			console.log(result);
			return result;
		} catch (error) {
			console.error(error);
		}
	}
};

export default getDataMethodPrivate;

function tokenFromLocalStorage() {
	const token = window.localStorage.getItem('token');
	if (!token || token === 'undefined') {
		console.log('No token in local storage');
		return null;
	}
	return `Bearer ${token}`;
}

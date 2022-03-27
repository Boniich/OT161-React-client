import axios from 'axios';
const BASE_URL = 'https://ongapi.alkemy.org/api';

/**
 * Function to generate a POST request
 * @param {string} route  Endpoint's route. Example: "/testimonials"
 * @param {Object} patchData Object with the post data
 * @returns {Promise}
 */
async function privatePatchRequest(route, patchData) {
	const headers = { ...tokenFromLocalStorage() };
	try {
		const { data } = await axios.patch(
			`${BASE_URL}${route}`,
			patchData,
			headers
		);
		return data;
	} catch (error) {
		return error;
	}
}

function tokenFromLocalStorage() {
	const noTokenValue = {
		undefined: undefined,
		null: null,
	};
	const token = window.localStorage.getItem('token');
	if (!token || !noTokenValue[token]) {
		console.log('No token in local storage');
		return null;
	}
	return {
		Authorization: `Bearer ${token}`,
	};
}

export { privatePatchRequest };

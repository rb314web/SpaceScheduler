const BASE_URL = process.env.REACT_APP_API_URL;
// const BASE_URL = 'https://lldev.thespacedevs.com/2.2.0';

const __apiCall = async (path, method, body) => {
	let response, data, error;
	try {
		response = await fetch(BASE_URL + path, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		data = await response.json();
	} catch (ex) {
		error = 'Api returns error status code: ' + response.status;
	}

	return [data, error];
};

const __apiGetCall = async (path) => {
    return await __apiCall(path, 'GET');
}

const getLastLaunch = async () => {
	return await __apiGetCall('/launch/previous?limit=1');
};

const getNextLaunch = async () => {
	return await __apiGetCall('/launch/upcoming/?limit=1');
};
const getHistoryLaunch = async (limit) => {
	return await __apiGetCall(`/launch/?limit=${limit}`);
};

export { getLastLaunch, getNextLaunch, getHistoryLaunch };

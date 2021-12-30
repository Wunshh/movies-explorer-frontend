import { MOVIES_URL } from './utils';

const checkResponse = async (res) => {
    if (res.ok) {
        return res.json();
    }

    const { message } = await res.json();
    const err = new Error(message);
    throw err;
}

export const getInitialMovies = () => {
    return fetch(`${MOVIES_URL}/beatfilm-movies`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
    .then(checkResponse)
}
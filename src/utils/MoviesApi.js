const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

const checkResponse = async (res) => {
    if (res.ok) {
        return res.json();
    }

    const { message } = await res.json();
    const err = new Error(message);
    throw err;
}

export const getInitialMovies = () => {
    return fetch(`${BASE_URL}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
    .then(checkResponse)
}
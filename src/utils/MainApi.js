
import { BASE_URL, MOVIES_URL } from './utils';

const checkResponse = async(res) => {
  if (res.ok) {
    return res.json();
  }
  
  const { message } = await res.json();
  const err = new Error(message);
  throw err;
}

export const register = (password, email, name) => { 
  return fetch(`${BASE_URL}/signup`, { 
    method: 'POST', 
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({password, email, name}) 
  }) 
  .then(checkResponse)
} 

export const authorize = (password, email) => { 
  return fetch(`${BASE_URL}/signin`, { 
    method: 'POST', 
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json',
    }, 
    body: JSON.stringify({password, email}) 
  }) 
  .then(checkResponse);
} 

export const getContent = (token) => { 
  return fetch(`${BASE_URL}/users/me`, { 
    method: 'GET', 
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`, 
    },
  }) 
  .then(checkResponse)
  .then(data => data); 
} 

export const getUserInfoFromServer = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET', 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
  },
  })
  .then(checkResponse);
} 

export const updateUserData = (item) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: item.name,
      email: item.email
    })
  })
  .then(checkResponse);
}

export const postMovies = (item) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      country: item.country || ' ',
      director: item.director || ' ',
      duration: item.duration || ' ',
      year: item.year || ' ',
      description: item.description || ' ',
      image: MOVIES_URL + item.image.url || ' ',
      trailer: item.trailerLink || ' ',
      thumbnail: MOVIES_URL + item.image.formats.thumbnail.url || ' ',
      movieId: item.id || ' ',
      nameRU: item.nameRU || ' ',
      nameEN: item.nameEN || ' '
    })
  })
  .then(checkResponse);
}

export const getInitialMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
  })
  .then(checkResponse);
}

export const handleDeleteMovie = (item) => {
  return fetch(`${BASE_URL}/movies/${item}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },
})
.then(checkResponse);
}
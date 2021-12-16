// const BASE_URL = "https://api.last.nomoredomains.work";
const BASE_URL = "http://localhost:3000";

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
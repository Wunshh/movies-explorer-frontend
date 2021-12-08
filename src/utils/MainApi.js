// export const BASE_URL = "https://api.last.nomoredomains.work";
const BASE_URL = "http://localhost:3000";

export const register = (password, email, name) => { 
  return fetch(`${BASE_URL}/signup`, { 
    method: 'POST', 
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({password, email, name}) 
  }) 
  .then((res) => { 
    if (res.ok) { 
      return res.json(); 
    } 
    return Promise.reject(`Ошибка: ${res.status}`); 
  }) 
  .then((res) => { 
    return res; 
  }); 

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

  .then((res) => { 
    if (res.ok) { 
      return res.json(); 
    } 
    return Promise.reject(`Ошибка: ${res.status}`); 
  }); 

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
  .then((res) => { 
    if (res.ok) { 
      return res.json(); 
    } 
    return Promise.reject(`Ошибка: ${res.status}`); 
  }) 
  .then(data => data); 
} 
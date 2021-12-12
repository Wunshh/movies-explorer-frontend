// class MoviesApi {
//     constructor(config) {
//         this._url = config.url;
//         this._headers = config.headers;
//     }
  
//     _checkResponse(res) {
//       if (res.ok) {
//           return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     }
  
//     getInitialFilms() {
//         return fetch(this._url, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         .then(this._checkResponse)
//     }
// }
    
// const config = {
//     url: "https://api.nomoreparties.co/beatfilm-movies",
// };

// const moviesApi = new MoviesApi(config);

// export default moviesApi;
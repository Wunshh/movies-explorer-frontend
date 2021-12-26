import {useState, useEffect} from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import * as authUser from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [moviesError, setMoviesError] = useState({ text: ''});
  const [savedMoviesError, setSavedMoviesError] = useState({ text: ''});
  const [foundMovies, setFoundMovies] = useState([]);
  const [changeProfileError, setchangeProfileError] = useState(false);
  const [changeProfileSuccess, setChangeProfileSuccess] = useState(false);
  const [shortMovies, setShortMovies] = useState(false);
  const [isMovieSaved, setIsMovieSaved]= useState([]);
  const [savedMoviesUpdate, setSavedMoviesUpdate] = useState([]);
  const [isPreloader, setPreloader] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  //получение данных пользователя и всех фильмов
  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        authUser.getUserInfoFromServer(), 
        moviesApi.getInitialMovies(), 
      ])
      .then(([dataUser, dataMovies]) => {
        setCurrentUser(dataUser);
        setMovies(dataMovies);
        localStorage.setItem('allMovies', JSON.stringify(dataMovies));
        getSavedMovies();
      })
      .catch((err) => {
        localStorage.removeItem('allMovies');
        setMoviesError({text: 'Во время запроса произошла ошибка. ' 
        + 'Возможно, проблема с соединением или сервер недоступен. ' 
        + 'Подождите немного и попробуйте ещё раз'});
        console.log(err);
      });
    }
  }, [loggedIn]);

 //проверка токена
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authUser.getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          if (localStorage.getItem('foundMovies') || localStorage.getItem('savedMovies')) {
            const foundMovies = localStorage.getItem('foundMovies');
            setFoundMovies(JSON.parse(foundMovies));
            const savedMovies = localStorage.getItem('savedMovies');
            setIsMovieSaved(JSON.parse(savedMovies));
          }
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('jwt');
        history.push('/');
      });
    }
  }, [history]);


  //регитсрация
  const onRegister = ({ password, email, name }) => {
    return authUser.register( password, email, name )
    .then((res) => {
      if(res) {
        setMessage("");
        onLogin({password, email});
      } 
    })
    .catch((err) => {
      setMessage(err.message);
    });
  };

  //авторизация
  const onLogin = ({ password, email }) => { 
  return authUser.authorize( password, email ) 
  .then((data) => {  
    if (data.token){ 
      setMessage("");
      setLoggedIn(true); 
      localStorage.setItem('jwt', data.token); 
      history.push('/movies'); 
    }  
  }) 
  .catch((err) => { 
    setMessage(err.message);
  });
  };

  //выход из приложения
  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    localStorage.removeItem('allMovies');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('foundSavedMovies');
    setFoundMovies([]);
    setIsMovieSaved([]);
  };

  //изменение данных пользователя
  function handleUpdateUser(item) {
    authUser.updateUserData(item)
    .then(res => {
      setCurrentUser(res);
      setChangeProfileSuccess(true);
      setTimeout(() => {
        setChangeProfileSuccess(false)
      }, 3000);
    })
    .catch((err) => {
      console.log(err);
      setchangeProfileError(true);
      setTimeout(() => {
        setchangeProfileError(false)
      }, 3000);
    });
  }

  //получение сохраненных фильмов 
  function getSavedMovies() {
    authUser.getInitialMovies()
    .then((res) => {
      setIsMovieSaved(res);
      localStorage.setItem('savedMovies', JSON.stringify(res));
      setSavedMoviesUpdate(res);
    })
    .catch((err) => {
      localStorage.removeItem('savedMovies');
      setSavedMoviesError({text: 'Во время запроса произошла ошибка. ' 
      + 'Возможно, проблема с соединением или сервер недоступен. ' 
      + 'Подождите немного и попробуйте ещё раз'});
    })
  }

  //фильтр для короткометражек 
  function handleSwitchCheckbox() {
    setShortMovies(true);
    if (shortMovies) {
      setShortMovies(false);
    }
  }

  //фильтр по всем фильмам
  function filterForMovies({movieName}) {
    debugger;
    handleOnPreloader();
    if (!isPreloader) {
      if (shortMovies) {
        const foundShortMovies = movies.filter((movie) => {
          return movie.duration <= 40 && movie.nameRU.toLowerCase().includes(movieName.toLowerCase());
        });
        localStorage.setItem('foundMovies', JSON.stringify(foundShortMovies));
        setFoundMovies(foundShortMovies);
        if (foundShortMovies.length === 0) {
          setMoviesError({text: 'Ничего не найдено'});
          setTimeout(() => {
            setMoviesError({ text: ''});
          }, 3000);
        }
      } else {
        const foundMovies = movies.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(movieName.toLowerCase());
        });
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
        setFoundMovies(foundMovies);
        setMoviesError({ text: ''});

        if (foundMovies.length === 0) {
          setMoviesError({text: 'Ничего не найдено'});
          setTimeout(() => {
            setMoviesError({ text: ''});
          }, 3000);
        }
      }
    }
  }

  //фильтр по сохраненным фильмам  
  function filterForSavedMovies ({movieName}) {
    const arrayOfSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (shortMovies) {
      const foundShorSavedtMovies = arrayOfSavedMovies.filter((movie) => {
        return movie.duration <= 40 && movie.nameRU.toLowerCase().includes(movieName.toLowerCase());
      });

      localStorage.setItem('foundSavedMovies', JSON.stringify(foundShorSavedtMovies));
      setIsMovieSaved(foundShorSavedtMovies);

      if (foundShorSavedtMovies.length === 0) {
        setSavedMoviesError({text: 'Ничего не найдено'});
        setTimeout(() => {
          setSavedMoviesError({ text: ''});
        }, 3000);
      }
    } else {
      const founSavedMovies = arrayOfSavedMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(movieName.toLowerCase());
      });
      localStorage.setItem('foundSavedMovies', JSON.stringify(founSavedMovies));
      setIsMovieSaved(founSavedMovies);

      if (founSavedMovies.length === 0) {
        setSavedMoviesError({text: 'Ничего не найдено'});
        setTimeout(() => {
          setSavedMoviesError({ text: ''});
        }, 3000);
      }
    }
  }

  //сохранение фильма
  function handleSaveMovie(item) {
    const like = isMovieSaved.find((movie) => movie.movieId === item.id);
    if (!like) {
      authUser.postMovies(item)
      .then((newMovie) => {
        setIsMovieSaved([newMovie, ...isMovieSaved]);
        getSavedMovies();
        setSavedMoviesUpdate(isMovieSaved);
      })
      .catch((err) => {
        console.log(err);
      }); 
    }
    else {
      console.log('Фильм уже сохранен');
    }
  }

  //удаление фильма находясь в "/movies"
  function handleDeleteMovie(item) {
    const selectedMovieDelete = isMovieSaved.find((movie) => movie.movieId === item.id);
    authUser.handleDeleteMovie(selectedMovieDelete._id) 
    .then(() => {
      setIsMovieSaved(isMovieSaved.filter((item) => item.id !== selectedMovieDelete._id));
      getSavedMovies();
      setSavedMoviesUpdate(isMovieSaved);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //удаление фильма находясь в "/saved-movies"
  function handleDeleteSavedMovie(item) {
    authUser.handleDeleteMovie(item._id) 
    .then(() => {
      setIsMovieSaved(isMovieSaved.filter((m) => m._id !== item._id));
      getSavedMovies();
      setSavedMoviesUpdate(isMovieSaved);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleOnPreloader() {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
    }, 1000);
  }

  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="App page">

        <Switch>
          <Route exact path="/">
            <Main 
              loggedIn={loggedIn} 
            /> 
          </Route>

          <Route exact path="/signup"> 
            <Register 
              onRegister={onRegister} 
              message={message}
            />
          </Route>

          <Route exact path="/signin">
            <Login 
              onLogin={onLogin}
              message={message}
            />
          </Route> 

          <ProtectedRoute 
            path="/movies" 
            component={Movies}
            loggedIn={loggedIn}
            moviesError={moviesError} 
            isSerch={isPreloader}
            onMovies={movies}
            onSaveMovie={handleSaveMovie}
            onMovieDelite={handleDeleteMovie}
            onFilter={filterForMovies}
            onShortMovies={shortMovies}
            onHandleSwitchCheckbox={handleSwitchCheckbox}
            moviesCards={foundMovies}
            onSavedMoviesUpdate={savedMoviesUpdate}
          />

          <ProtectedRoute 
            path="/saved-movies" 
            component={SavedMovies}
            loggedIn={loggedIn} 
            moviesCards={isMovieSaved}
            onFilter={filterForSavedMovies}
            onShortMovies={shortMovies}
            onHandleSwitchCheckbox={handleSwitchCheckbox}
            onMovieDelite={handleDeleteSavedMovie}
            moviesError={savedMoviesError} 
          />

          <ProtectedRoute 
            path="/profile" 
            component={Profile} 
            loggedIn={loggedIn} 
            onSignOut={onSignOut}
            onUpdateUser={handleUpdateUser}
            changeProfileError={changeProfileError}
            changeProfileSuccess={changeProfileSuccess}
          />

          <Route path="*">
            <PageNotFound />
          </Route>

        </Switch>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

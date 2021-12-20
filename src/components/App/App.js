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
  const [moviesError, setMoviesError] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  const [changeProfileError, setchangeProfileError] = useState(false);
  const [changeProfileSuccess, setChangeProfileSuccess] = useState(false);
  const [shortMovies, setShortMovies] = useState(false);
  // const [isPreloader, setPreloader] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([authUser.getUserInfoFromServer(), moviesApi.getInitialMovies()])
      .then(([dataUser, dataMovies]) => {
        setCurrentUser(dataUser);
        setMovies(dataMovies);
        localStorage.setItem('allMovies', JSON.stringify(dataMovies));
      })
      .catch((err) => {
        localStorage.removeItem('allMovies');
        setMoviesError('Во время запроса произошла ошибка. ' 
        + 'Возможно, проблема с соединением или сервер недоступен. ' 
        + 'Подождите немного и попробуйте ещё раз');
        console.log(err);
      });
    }
  }, [loggedIn]);


  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authUser.getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          if (localStorage.getItem('foundMovies')) {
            const foundMovies = localStorage.getItem('foundMovies');
            setFoundMovies(JSON.parse(foundMovies));
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

  function handleSwitchCheckbox() {
    setShortMovies(true);
    if (shortMovies) {
      setShortMovies(false);
    }
  }

  function filterForMovies(keyword) {
    if (shortMovies) {
      const foundShortMovies = movies.filter((movie) => {
        return movie.duration <= 40 && movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
      });
      localStorage.setItem('foundMovies', JSON.stringify(foundShortMovies));
      setFoundMovies(foundShortMovies);
    } else {
      const foundMovies = movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
      });
      localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
      setFoundMovies(foundMovies);
    }
  }
  
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

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    localStorage.removeItem('allMovies');
    localStorage.removeItem('foundMovies');
    setFoundMovies([]);
  };

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
            // isOpen={isPreloader}
            onMovies={movies}
            onFilter={filterForMovies}
            onShortMovies={shortMovies}
            onHandleSwitchCheckbox={handleSwitchCheckbox}
            moviesCards={foundMovies}
          />

          <ProtectedRoute 
            path="/saved-movies" 
            component={SavedMovies}
            loggedIn={loggedIn} 
            onFilter={filterForMovies}
            onShortMovies={shortMovies}
            onHandleSwitchCheckbox={handleSwitchCheckbox}
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

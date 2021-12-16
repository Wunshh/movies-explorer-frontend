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
  const history = useHistory();
  const [moviesError, setMoviesError] = useState("");
  const [changeProfileError, setchangeProfileError] = useState(false);
  const [changeProfileSuccess, setChangeProfileSuccess] = useState(false);
  // const [isPreloader, setPreloader] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (loggedIn) {
      Promise.all([authUser.getUserInfoFromServer(), moviesApi.getInitialMovies()])
      .then(([dataUser, dataMovies]) => {
        setCurrentUser(dataUser);
        setMovies(dataMovies);
        localStorage.setItem('movies', JSON.stringify(dataMovies));
      })
      .catch((err) => {
        localStorage.removeItem('movies');
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
  }

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
    }) 
  }

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    localStorage.removeItem('movies');
  }

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
          />

          <ProtectedRoute 
            path="/saved-movies" 
            component={SavedMovies}
            loggedIn={loggedIn} 
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

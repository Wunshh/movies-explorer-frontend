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
// import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; 


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  // const [films, setFilms] = useState([]);
  const history = useHistory();
  const [isPreloader, setPreloader] = useState(false);

  useEffect(() => {
    if (loggedIn) {
    authUser.getUserInfoFromServer()
    .then((dataUser) => {
      setCurrentUser(dataUser);
    })
    .catch((err) => {
        console.log(err);
    })
    // .finally(() => {

    // });
    }
}, [loggedIn]);

  function handleUpdateUser(item) {
    authUser.updateUserData(item)
    .then(res => {
        setCurrentUser(res);
    })
    .catch((err) => {
        console.log(err);
    });
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authUser.getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [history]);

  const onRegister = ({ password, email, name }) => {
    return authUser.register( password, email, name )
    .then((res) => {
      if(res) {
        return res;
      } 
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setPreloader(true)
    });
  }

  const onLogin = ({ password, email }) => { 
    return authUser.authorize( password, email ) 
    .then((data) => { 
      if (data.token){ 
          setLoggedIn(true); 
          localStorage.setItem('jwt', data.token); 
          history.push('/'); 
      }  
    }) 
    .catch((err) => { 
      console.log(err) 
    }) 
  }

  const onSignOut = () => {
      localStorage.removeItem('jwt');
      setLoggedIn(false);
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
            <Register onRegister={onRegister} />
          </Route>

          <Route exact path="/signin">
            <Login onLogin={onLogin} />
          </Route> 

          <ProtectedRoute 
            path="/movies" 
            component={Movies}
            loggedIn={loggedIn} 
            isOpen={isPreloader}
            // onFilms={films}
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

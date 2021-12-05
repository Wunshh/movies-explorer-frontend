import {useState} from 'react';
import { Routes , Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';


function App() {
  // при добавлении функциональности добавить setLoggedIn
  // для изменения header заменить false на true
  const [loggedIn] = useState(true);


  return (
    <div className="App page">
      <Routes>

        <Route path="/" element={ 
          <Main loggedIn={loggedIn} /> 
        }/>

        <Route path="/signup" element={ <Register />} />

        <Route path="/signin" element={ <Login /> } />

        <Route path="/movies" element={ 
          <Movies loggedIn={loggedIn}/> 
        }/>

        <Route path="saved-movies" element={
          <SavedMovies loggedIn={loggedIn} />
        }/>

        <Route path="/profile" element={
          <Profile loggedIn={loggedIn}/>
        }/>

        <Route path="*" element={
          <PageNotFound />
        }/>
        
      </Routes>
    </div>
  );
}

export default App;

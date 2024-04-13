import React, { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { CreateAccount } from './login/createAccount';
import { Stats } from './stats/stats';
import { Calendar } from './calendar/calendar';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Exercises } from './exercises/exercises';
import { Modal } from 'react-bootstrap';

export default function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = useState(currentAuthState);
  const [showExercisesModal, setShowExercisesModal] = useState(false); // State to control modal visibility

  const openExercisesModal = () => {
    setShowExercisesModal(true);
  };

  const closeExercisesModal = () => {
    setShowExercisesModal(false);
  };

  return (
    <BrowserRouter>
      <div className='body'>
        <header>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
              <a className='navbar-brand' href='/'>
                <img src='./image_123650291.JPG' width='30' className='d-inline-block align-text-top' alt='Muscle Genius Logo' />
                Muscle Genius
              </a>
              <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
              </button>
              <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                <div className='navbar-nav'>
                  <NavLink className='nav-link' to='/'>
                    Home
                  </NavLink>
                  {authState === AuthState.Unauthenticated && (
                    <NavLink className='nav-link' to='/createAccount'>
                      Create Account
                    </NavLink>
                  )}
                  {authState === AuthState.Authenticated && (
                    <NavLink className='nav-link' to='/calendar'>
                      Calendar
                    </NavLink>
                  )}
                  {authState === AuthState.Authenticated && (
                    <NavLink className='nav-link' to='/stats'>
                      Stats
                    </NavLink>
                  )}
                  {authState === AuthState.Authenticated && (
                    <NavLink className='nav-link' onClick={openExercisesModal}>
                      Exercises
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>
        <hr className="black-line top-line" />
        <Routes>
          <Route 
            path='/'
            element={<Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }} 
          />} />
          <Route 
            path='/createAccount'
            element={<CreateAccount
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }} 
          />} />
          <Route path='/calendar' element={<Calendar 
            userName={userName}
          />} />
          <Route path='/stats' element={<Stats
            userName={userName} 
          />} />
          <Route path='/exercises' element={<Exercises />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <hr className="black-line bottom-line" />
        <footer>
            <span class="author">Garrett Johnson</span>
            <a href="https://github.com/garretttolmanj/startup">GitHub</a>
        </footer>



        <Exercises
          show={showExercisesModal}
          onHide={closeExercisesModal} // Pass a function reference
          userName={userName}
        />

      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid'>404: Return to sender. Address unknown.</main>;
}

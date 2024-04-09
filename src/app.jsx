import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { createAccount } from './createAccount/createAccount';
import { Friends } from './friends/friends';
import { friendView } from './friendView/friendView';
import { Calendar } from './calendar/calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
      <BrowserRouter>
        <div className='body'>
          <header>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
              <div className='container-fluid'>
                <a className='navbar-brand' href='index.html'>
                  <img src='image_123650291.JPG' width='30' className='d-inline-block align-text-top' alt='Muscle Genius Logo' />
                  Muscle Genius
                </a>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                  <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                  <div className='navbar-nav'>
                    <a className='nav-link active' aria-current='page' href='index.html'>Home</a>
                    <NavLink className='nav-link' to=''>
                      Login
                    </NavLink>
                    <NavLink className='nav-link' to='createAccount'>
                      Create Account
                    </NavLink>
                    <NavLink className='nav-link' to='calendar'>
                      Calendar
                    </NavLink>
                    <NavLink className='nav-link' to='friends'>
                      Friends
                    </NavLink>
                    <NavLink className='nav-link' to='friendView'>
                      Friend View
                    </NavLink>
                  </div>
                </div>
              </div>
            </nav>
          </header>
    
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/createView' element={<createAccount />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/friends' element={<Friends />} />
            <Route path='/friendView' element={<friendView />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

          <footer className='bg-dark text-white-50'>
            <div className='container-fluid'>
              <span className='text-reset'>Author Name(s)</span>
              <a className='text-reset' href='https://github.com/webprogramming260/simon-react'>
                Source
              </a>
            </div>
          </footer>
        </div>
        </BrowserRouter>
    );
    
    function NotFound() {
      return <main className='container-fluid'>404: Return to sender. Address unknown.</main>;
    }
  }
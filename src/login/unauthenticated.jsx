import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);
    const navigate = useNavigate();
    
    async function loginUser() {
        const response = await fetch('/api/auth/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ username: userName, password: password })
        });
        console.log(response);
        if (response.ok) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
            
        } else {
            window.alert('Unrecognized Username or Password');        
        }
    }
    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <h1>unauthenticated</h1>
            <div className="bd">
              <div className="container-fluid d-flex justify-content-center align-items-center">
                <form id="loginForm" className="px-4 py-3">
                  <div className="mb-3">
                    <label htmlFor="Username" className="form-label">Username</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="Username"
                        placeholder="Username"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="Password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button variant='primary' className='d-flex justify-content' onClick={() => loginUser()}>
                    Login
                  </Button>
                  <Button variant='secondary' className='createAccount' onClick={() => navigate('/createAccount')}>
                    Create Account
                  </Button>
                </form>
              </div>
            </div>

        </div>
    )
}

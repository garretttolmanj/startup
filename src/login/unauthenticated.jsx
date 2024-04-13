import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './login.css';

export function Unauthenticated(props) {
    const [userName, setUserName] = useState(props.userName);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [quoteContent, setQuoteContent] = useState('');
    const [quoteAuthor, setQuoteAuthor] = useState('');

    async function loginUser() {
        const response = await fetch('/api/auth/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ username: userName, password: password })
        });
        if (response.ok) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            window.alert('Unrecognized Username or Password');        
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            loginUser();
        }
    }

    async function getQuote() {
        try {
            // Fetch a random quote from the Quotable API
            const response = await fetch('https://api.quotable.io/quotes/random?tags=athletics|competition|health|inspirational|motivational|pain|perseverance|sports|success|war|work');
            if (response.ok) {
                const data = await response.json();
                setQuoteContent(data[0].content);
                setQuoteAuthor(data[0].author);
            } else {
                console.error('Failed to fetch quote:', response.status);
                setQuoteContent("YEAH BUDDY!!!!!");
                setQuoteAuthor("Ronnie Coleman");
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
            setQuoteContent("YEAH BUDDY!!!!!");
            setQuoteAuthor("Ronnie Coleman");
        }
    }

    useEffect(() => {
        getQuote(); // Fetch a quote when the component mounts
    }, []); // Empty dependency array means this effect runs only once, like componentDidMount

    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <h1>
                Muscle Genius <span><img src='src/image_123650291.JPG' width="80" alt="logo" /></span>
            </h1>
            <div className="bd">
                <div className="container-fluid d-flex justify-content-center align-items-center createAccountForm">
                    <form id="loginForm" className="px-4 py-3">
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label">Username</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="Username"
                                placeholder="Username"
                                onChange={(e) => setUserName(e.target.value)}
                                onKeyPress={handleKeyPress}
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
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        <div className='container-fluid d-flex loginButtons'>
                            <Button variant='primary' className='d-flex justify-content' onClick={() => loginUser()}>
                                Login
                            </Button>
                            <Button variant='secondary' className='createAccount' onClick={() => navigate('/createAccount')}>
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <blockquote className="blockquote">
                        <p>{quoteContent}</p>
                    </blockquote>
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <figcaption className="blockquote-footer">{quoteAuthor}</figcaption>
                </div>
            </div>
        </div>
    );
}

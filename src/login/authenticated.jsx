import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './login.css';

export function Authenticated(props) {
    const [quoteContent, setQuoteContent] = useState('');
    const [quoteAuthor, setQuoteAuthor] = useState('');
    const navigate = useNavigate();

    async function logout() {
        try {
            const response = await fetch(`/api/auth/logout`, {
                method: 'delete',
            });
            if (response.ok) {
                localStorage.removeItem('userName');
                props.onLogout();
            } else {
                console.error('Logout failed:', response.status);
            }
        } catch (error) {
            console.error('Logout failed:', error);
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
        <>
            <div className="container">
                <h1>
                    Muscle Genius <span><img src='src/image_123650291.JPG' width="80" alt="logo" /></span>
                </h1>
                <h2>{props.userName}</h2>
                <Button variant='primary' onClick={() => navigate('/calendar')}>
                    Go to Calendar
                </Button>
                <Button variant='secondary' className='logout' onClick={() => logout()}>
                    Logout
                </Button>
                <div className="blockquote-container">
                    <blockquote className="blockquote">
                        <p>{quoteContent}</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">{quoteAuthor}</figcaption>
                </div>
            </div>
        </>
    )    
}

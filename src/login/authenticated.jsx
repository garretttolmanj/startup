import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export function Authenticated(props) {
    const navigate = useNavigate();
    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
            .catch(() => {
                // Logout failed. Assuming offline
            })
            .finally(() => {
                localStorage.removeItem('userName');
                props.onLogout();
            })
    }

    return (
        <div>
            <h2>Authenticated</h2>
            <div>{props.userName}</div>
            <Button variant='primary' onClick={() => navigate('/calendar')}>
                Go to Calendar
            </Button>
            <Button variant='secondary' onClick={() => logout()}>
                Logout
            </Button>
        </div>
    )
}
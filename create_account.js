async function register() {
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;
    const password2 = document.getElementById('confirmPassword').value;
    
    if (password !== password2) {
        document.getElementById('Password').value = '';
        document.getElementById('confirmPassword').value = '';
        window.alert("Passwords don't match!");
        return;
    }
    if (username === '' || password === '' || password2 === '') {
        window.alert('Username or Password cannot be empty!');
    }

    const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json()

    if (response.ok) {
        document.cookie = `username=${username}; path=/`;
        window.location.href = "calendar.html";
    } else {
        // Handle error messages
        window.alert("Failed to register: " + data.message);
        return;
    }
}


document.getElementById('confirmPassword').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        register();
    }
});

document.getElementById('createAccountBtn').addEventListener('click', function() {
    register();
});
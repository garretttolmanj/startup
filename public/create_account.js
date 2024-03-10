async function register() {
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;
    const password2 = document.getElementById('confirmPassword').value;
    
    if (password !== password2) {
        document.getElementById('Password').value = '';
        document.getElementById('confirmPassword').value = '';
        window.alert("Passwords don't match!");
    }

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    if (response.ok) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        window.location.href = "calendar.html";
    } else {
        window.alert('Username has been taken! Please choose another');
    }
}
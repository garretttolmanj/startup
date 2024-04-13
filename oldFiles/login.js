async function login() {
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;
    if (username === '' || password === '') {
        window.alert('Username or password cannot be empty');
        return;
    }
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ username, password })
    });
    if (response.ok) {
        // Set the username in a cookie
        document.cookie = `username=${username}; path=/`;
        window.location.href = "calendar.html";
    } else {
        window.alert('Username and Password not recognized')
    }
}



document.getElementById('Username').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        login();
    }
});
document.getElementById('Password').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        login();
    }
});

document.getElementById('signinBtn').addEventListener('click', function() {
    login();
});


async function getquote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch('https://api.quotable.io/quotes/random?tags=athletics|competition|health|inspirational|motivational|pain|perseverance|sports|success|war|work');
    const data = await response.json();
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    if (response.ok) {
        quote.innerText = data[0].content;
        author.innerText = data[0].author;
    } else {
        quote.innerText = "YEAH BUDDY!!!!!"
        author.innerText = "Ronnie Coleman";
    }
  }

getquote();
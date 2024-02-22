function login() {
    const nameEl = document.getElementById('Username');
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "play.html";
  }
const form = document.getElementById("login-register-form");

window.localStorage.clear();
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");

  if (event.submitter.id === "login-button") {
    fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.statusCode !== 400) {
          window.localStorage.setItem("user", JSON.stringify(data));
          debugger
          window.localStorage.setItem("token",JSON.stringify( data.token));
          window.location.href = '/success';
        } else {
          window.location.href = '/error';
          console.error("Error " + data.status + ": " + data.statusText);
        }
      });
  } else if (event.submitter.id === "register-button") {
    fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        if (response.ok) {
          alert("User successfully registered! Now you can login!");
        } else {
          console.error("Error " + response.status + ": " + response.statusText);
        }
      })
      .catch(error => {
        console.error("Error: " + error);
      });
  }
});
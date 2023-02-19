const user = JSON.parse(window.localStorage.getItem("user"));
const token = JSON.parse(window.localStorage.getItem("token"));
const container = document.querySelector("#container");

if (user) {
  container.innerHTML = `Вхід успішний. Ласкаво просимо ${user.email}. Ваша роль – ${user.role}`;
  if (user.role === "ADMIN") {
    container.innerHTML = container.innerHTML + `<button onclick="getAllUsers()">Get all users</button>`;
  }
} else {
  window.location.href = "/error";
}

function getAllUsers() {
  fetch("http://localhost:3001/users", {
    headers: new Headers({
      "Authorization": "Bearer " + token
    })
  }).then(res => res.json()).then(users => {
    const userList = document.getElementById("user-list");

    for (const user of users) {
      const li = document.createElement("li");
      const email = document.createElement("span");
      email.textContent = user.email;
      li.appendChild(email);
      li.appendChild(document.createTextNode(" - "));
      const role = document.createElement("span");
      role.textContent = user.role;
      li.appendChild(role);
      userList.appendChild(li);
    }
  });
}

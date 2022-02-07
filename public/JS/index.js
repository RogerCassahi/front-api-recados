const username = document.getElementById("usernameLogin");
const password = document.getElementById("passwordLogin");
const buttonLogin = document.getElementById("loginButton");

const route = "https://api-recado.herokuapp.com";

function fazerLogin() {
  if (username.value == "" || password.value == "")
    return alert("Por favor, insira suas informações");
  axios
    .post(`${route}/login`, {
      username: username.value,
      password: password.value,
    })
    .then((response) => {
      if (response.data == "error-username") {
        alert("Este username não foi encontrado.");
        return;
      }

      localStorage.setItem("idLogado", response.data);

      window.location.href = "./recados.html";
    })
    .catch(error => {
      alert("O login está incorreto");
      return;
    });
}

buttonLogin.addEventListener("click", fazerLogin);

const nomeCadastro = document.getElementById("cadastroUsername");
const cadastroSenha = document.getElementById("cadastroSenha");
const confirmacaoSenha = document.getElementById("repeatSenha");
const btnCriarConta = document.getElementById("btn-CriarConta");

btnCriarConta.addEventListener("click", cadastroNovoUsuario);

const route = "https://api-recado.herokuapp.com";

function cadastroNovoUsuario() {
  if (
    nomeCadastro.value == "" ||
    cadastroSenha.value == "" ||
    confirmacaoSenha.value == ""
  )
    return alert("Por favor, complete os campos!");
  if (cadastroSenha.value != confirmacaoSenha.value)
    return alert("A confirmação de sua senha está incorreta");
  axios
    .post(`${route}/cadastro`, {
      username: nomeCadastro.value,
      password: cadastroSenha.value,
      confirmPassword: confirmacaoSenha.value,
    })
    .then(response => {
      alert("Conta criada!");
      window.location.href = "./index.html";
    })
    .catch((error) => {
      return alert(
        "Este username já esta sendo utilizado. Por favor, escolha outro!"
      );
    });
}

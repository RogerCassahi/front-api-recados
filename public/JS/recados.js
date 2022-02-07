let detalhamento = document.getElementById("detalhamento");
let descricao = document.getElementById("descricao");
const tbody = document.querySelector("tbody");
const btnSalvarRecado = document.getElementById("btn-salvarRecado");
let descricaoInputEditado = document.getElementById("descricaoUpdate");
let detalheInputEditado = document.getElementById("detalhamentoUpdate");
let contaLogada = localStorage.getItem("idLogado");
const route = "https://api-recado.herokuapp.com";


async function criarRecado() {
  if (descricao.value != "" && detalhamento.value != "") {
    try {
      await axios.post(`${route}/message`, {
        descricao: descricao.value,
        detalhamento: detalhamento.value,
        user: contaLogada,
      });
    } catch (error) {
      console.log(error);
    }
    location.reload();
  }
}

btnSalvarRecado.addEventListener("click", () => {
  criarRecado();
});

async function carregarMensagens() {
  await axios
    .get(`${route}/message/${contaLogada}`)
    .then((response) => {
      response.data.map((recado, i) => {
        const tr = document.createElement("tr");
        let recadoCriado = `
          <th>${i}</th>
          <td>${recado.descricao}</td>
          <td>${recado.detalhamento}</td>
          <td>
          <button type="button" id="deletar" class="btn btn-danger" onclick="deletar(${i})">Excluir</button>
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="editar(${i})">Editar</button>
          </td>
          `;
        tr.innerHTML = recadoCriado;
        tbody.appendChild(tr);
      });
    })
    .catch((err) => {
      // alert('Não possui recados')
    });
}

const concluir = document.getElementById("concluir");

let idRecado = 0;

function editar(indice) {
  axios
    .get(`${route}/message/${contaLogada}`, {
      uid: contaLogada,
    })
    .then((response) => {
      descricaoInputEditado.value = response.data[indice].descricao;
      detalheInputEditado.value = response.data[indice].detalhamento;
      idRecado = response.data[indice].uid;
    });
}
async function recadoEditado() {
  let descricaoValue = descricaoInputEditado.value;
  let detalhamentoValue = detalheInputEditado.value;
  if (descricaoValue != "" && detalhamentoValue != "") {
    await axios.put(`${route}/message`, {
      descricao: descricaoValue,
      detalhamento: detalhamentoValue,
      uid: idRecado,
    });
    location.reload();
  } else {
    alert("Complete os campos!");
  }
}

async function deletar(indice) {
  await axios
    .get(`${route}/message/${contaLogada}`, {
      uid: contaLogada,
    })
    .then(async (response) => {
      let uidMessage = response.data[indice].uid;
      await axios.delete(`${route}/message/${uidMessage}`);
    });
  location.reload();
}

function verificarSeUsuarioEstaLogado() {
  if (contaLogada == "" || contaLogada == null) {
    alert("Login não encontrado");
    window.location.href = "./cadastro.html";
  }
}

carregarMensagens();
verificarSeUsuarioEstaLogado();

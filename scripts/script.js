//verifica se o usuário esta logado ou nao
var isLoggedIn = false;

document.addEventListener("DOMContentLoaded", function () {
  auth();
  checkLoginAndRedirect();
});

//recebe os dados dos formulários
document.getElementById("submit").addEventListener("click", async function (e) {
  e.preventDefault();

  if (this.getAttribute("form-type") === "login") {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
      email: email,
      password: await hashPassword(password),
    };

    await logar(data);
  } else if (this.getAttribute("form-type") === "signup") {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
      nome: nome,
      email: email,
      password: await hashPassword(password),
    };

    await cadastrar(data);

    const btn = document.getElementById('submit');
    btn.setAttribute("disabled", "disabled");
  } else if (this.getAttribute("form-type") === "candidatos") {
    const nome = document.getElementById("nome_candidato").value;
    const numero = document.getElementById("num_candidato").value;
  
    const data = {
      nome_candidato: nome,
      num_candidato: numero,
    };

    await cadastrarCandidato(data);
  } else if (this.getAttribute("form-type") === "vote") {
    const user = JSON.parse(localStorage.getItem("user"));
    const num_candidato = document.getElementById("num_candidato").value;

    const data = {
      email: user.data.email,
      num_candidato: num_candidato,
    };

    await votar(data);
  }

  document.getElementById("formulario").reset();
});

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  return crypto.subtle.digest("SHA-256", data).then((buffer) => {
    let hashArray = Array.from(new Uint8Array(buffer));
    let hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  });
}

async function votar(data) {
  const url = "http://localhost:5000/votos.php";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    if (response.status === 409 || response.status === 400) {
      if (responseData.error == "Not found entity with num_candidato"){
        document.getElementById("error-vote2").style.display = "block";
        document.getElementById("error-vote").style.display = "none";
      } else {
        document.getElementById("error-vote2").style.display = "block";
        document.getElementById("error-vote").style.display = "none";
      }
      document.getElementById("msg-vote").style.display = "none";
    } else if (response.status === 200) {
      document.getElementById("error-vote2").style.display = "none";
      document.getElementById("msg-vote").style.display = "block";
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function apurarVotos() {
  const url = "http://localhost:5000/votos.php";

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

   // renderizar os dados na tela em formato de tabela

    if (response.status === 200) {
      const table = document.getElementById("table");

      // Limpar a tabela antes de renderizar os dados
      table.innerHTML = "";

      const tableHead = document.createElement("thead");
      const tableBody = document.createElement("tbody");

      const rowHead = document.createElement("tr");
      const cellNome = document.createElement("th");
      const cellNumero = document.createElement("th");
      const cellVotos = document.createElement("th");

      cellNome.textContent = "Nome";
      cellNumero.textContent = "Número";
      cellVotos.textContent = "Votos";

      rowHead.appendChild(cellNome);
      rowHead.appendChild(cellNumero);
      rowHead.appendChild(cellVotos);

      tableHead.appendChild(rowHead);

      responseData.data.forEach((candidato) => {
        const row = document.createElement("tr");
        const cellNome = document.createElement("td");
        const cellNumero = document.createElement("td");
        const cellVotos = document.createElement("td");

        cellNome.textContent = candidato.nome_candidato;
        cellNumero.textContent = candidato.num_candidato;
        cellVotos.textContent = candidato.votos;

        row.appendChild(cellNome);
        row.appendChild(cellNumero);
        row.appendChild(cellVotos);

        tableBody.appendChild(row);
      });

      table.appendChild(tableHead);
      table.appendChild(tableBody);
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function cadastrarCandidato(data) {
  const url = "http://localhost:5000/candidatos.php";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    if (response.status === 409 || response.status === 400) {
      document.getElementById("error-cad").style.display = "block";
      document.getElementById("msg-cad").style.display = "none";
    } else if (response.status === 200) {
      document.getElementById("error-cad").style.display = "none";
      document.getElementById("msg-cad").style.display = "block";
    } 
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function cadastrar(data) {
  const url = "http://localhost:5000/user.php";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    const login = {
      email: data.email,
      password: data.password,
    };

    if (response.status === 409) {
      document.getElementById("error-login").style.display = "block";
    } else if (response.status === 200) {
      logar(login);
    } else {
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function logar(data) {
  const url = "http://localhost:5000/auth.php";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    if (responseData.success !== false) {
      document.getElementById("error-login").style.display = "none";

      localStorage.setItem("user", JSON.stringify(responseData));
      isLoggedIn = true;
      isLogged(responseData);
      checkLoginAndRedirect();
    } else {
      document.getElementById("error-login").style.display = "block";
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}

function auth() {
  const usuario = JSON.parse(localStorage.getItem("user"));

  if (usuario) {
    isLoggedIn = true;
    isLogged(usuario);
  }
}

function isLogged(data) {
  if (isLoggedIn) {
    const loggedInDiv = document.getElementById("logged-in-div");

    loggedInDiv.style.display = "flex";

    const image = document.createElement("img");
    image.alt = "user_pfp";

    image.src = "../public/user-circle-2.svg";

    image.style.width = "40px";
    image.style.height = "40px";

    const divContainer = document.createElement("div");

    const greetingParagraph = document.createElement("h6");
    greetingParagraph.textContent = "Olá " + data.data.nome_estudante + "!";

    const heading1 = document.createElement("p");
    heading1.textContent = "Clique aqui para Sair";

    heading1.onclick = function () {
      localStorage.removeItem('user');
      window.location.reload();
    };

    divContainer.appendChild(greetingParagraph);
    divContainer.appendChild(heading1);

    loggedInDiv.appendChild(image);
    loggedInDiv.appendChild(divContainer);

    //window.location.href = "../pages/home.html";
  } else {
    loggedInDiv.style.display = "none";
  }
}

function checkLoginAndRedirect() {
  const currentRoute = window.location.pathname;

  if (isLoggedIn) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.data && user.data.nome_estudante === 'Admin') {
      if (currentRoute !== '/pages/admin.html') {
        window.location.href = '/pages/admin.html';
      }
    } else {
      if (currentRoute !== '/pages/vote.html') {
        window.location.href = '/pages/vote.html';
      }
    }
  } else {
    if (currentRoute !== '/index.html' && currentRoute !== '/pages/signup.html' && currentRoute !== '/') {
      window.location.href = '/index.html';
    }
  }
}

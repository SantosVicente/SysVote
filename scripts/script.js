//verifica se o usuário esta logado ou nao
var isLoggedIn = false;

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM carregado");
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
      password: password,
    };

    await logar(data);
  } else if (this.getAttribute("form-type") === "signup") {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
      nome: nome,
      email: email,
      password: password,
    };

    await cadastrar(data);
  }
  
  document.getElementById("formulario").reset();
});

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

    if (responseData.sucess !== false) {
      document.getElementById("error-login").style.display = "none";

      console.log(responseData);
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

  console.log(usuario);

  if (usuario) {
    isLoggedIn = true;
    isLogged(usuario);
  }
}

function isLogged(data) {
  if (isLoggedIn) {
    const loggedInDiv = document.getElementById("logged-in-div");

    loggedInDiv.style.display = "flex";

    console.log("data", loggedInDiv);
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
  console.log("currentRoute", currentRoute);

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

//função para realizar hash da senha
function hashPassword(password) {
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

//exemplo de uso
const data = {
  email: document.getElementById("email").value,
  password: hashPassword(document.getElementById("password").value),
};

// armazenar token no localstorage
localStorage.setItem("token", token);

//decodeToken(token)
function decodeToken(token) {
  fetch("caminho-para-sua-api/auth.php", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.valid) {
        // O token é válido e as informações do usuário estão em data
        const user = {
          nome: data.nome,
          email: data.email,
        };

        console.log("Informações do usuário:", user);
        return user;
      } else {
        // O token não é válido
        console.error("Token JWT inválido ou expirado");
        return false;
      }
    })
    .catch((error) => {
      // Lidar com erros na solicitação
    });
}

// verificar se o token expirou
function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false; // Token não está presente no localStorage
  }

  const decodedToken = decodeToken(token); // Implemente uma função para decodificar o token

  if (!decodedToken) {
    return false; // Token não pôde ser decodificado
  }

  return true; // Token válido
}

// verificar se o token é válido e caso nao seja, enviar para o login e remover o token do localstorage
if (!isTokenValid()) {
  window.location.href = "/login.html";
  localStorage.removeItem("token");
} else {
  // Token válido, continuar com a aplicação de login
}

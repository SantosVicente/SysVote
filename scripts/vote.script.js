async function getCandidatos() {
  const user = JSON.parse(localStorage.getItem("user"));

  const url = "http://localhost:5000/validarVoto.php";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: user.data.email }),
  };

  let verify;

  await fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      verify = data.success;
    })
    .catch((error) => console.error("Erro ao buscar candidatos: " + error));

  if (verify) {
    const url = "http://localhost:5000/candidatos.php";

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const candidatosSelect = document.getElementById("num_candidato");

        // Iterar sobre os dados e criar opções para cada candidato
        data.data.forEach((candidato) => {
          const option = document.createElement("option");
          option.value = candidato.num_candidato; // Use o número do candidato como valor
          option.textContent = `${candidato.nome_candidato} - ${candidato.num_candidato}`;
          candidatosSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Erro ao buscar candidatos: " + error));
  } else {
    const error = document.getElementById("error-vote");
    error.style.display = "block";
  }
}

getCandidatos();

const checkForm = {
  titulo: false,
  descricao: false,
  disciplina: true,
  dificuldade: false,
  opcoes: {
    a: false, b: false, c: false, d: false, e: false
  },
  opcaocorreta: false,
};

const questao = {
  titulo: 'Titulo 1',
  descricao: '',
  disciplina: '',
  dificuldade: '',
  opcoes: {
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
  },
  opcaocorreta: '',
};

console.log('Script Javascript');
document.getElementById('titulo').addEventListener('input', function (e) {
  const titulo = e.target.value;
  if (titulo.length < 1 || titulo.length > 105) {
    console.log('Título da questão deve ter entre 1 e 100 caracteres');
    document.getElementById('erro-titulo').style.display = 'block';
    checkForm.titulo = false;
  } else {
    document.getElementById('erro-titulo').style.display = 'none';
    questao.titulo = titulo;
    checkForm.titulo = true;
  }
  console.log(questao);
});

document.getElementById('descricao').addEventListener('input', function (e) {
  const descricao = e.target.value.trim();
  if (descricao.length < 1 || descricao.length > 1024) {
    console.log('Descrição da questão deve ter entre 1 e 1024 caracteres');
    document.getElementById('erro-descricao').style.display = 'block';
    checkForm.descricao = false;
  } else {
    document.getElementById('erro-descricao').style.display = 'none';
    questao.descricao = descricao;
    checkForm.descricao = true;
  }
  console.log(questao);
});

document.getElementById('disciplina').addEventListener('click', function (e) {
  const disciplina = e.target.value;
  questao.disciplina = disciplina;
  checkForm.disciplina = true;
  console.log(questao);
});

let dificuldadeInputs = document.querySelectorAll('input[name="dificuldade"]');

for (let i = 0; i < dificuldadeInputs.length; i++) {
  dificuldadeInputs[i].addEventListener('change', function (e) {
    const dificuldade = e.target.value;
    // let val = this.value; // this == the clicked radio,
    console.log(dificuldade);
    questao.dificuldade = dificuldade;
    checkForm.dificuldade = true;
  });
}

document.getElementById('opcaoa').addEventListener('input', function (e) {
  const opcaoa = e.target.value.trim();
  if (opcaoa.length < 1 || opcaoa.length > 1024) {
    console.log('Descrição da questão deve ter entre 1 e 1024 caracteres');
    document.getElementById('erro-opcao').style.display = 'block';
    checkForm.opcaoa = false;
  } else {
    document.getElementById('erro-opcao').style.display = 'none';
    questao.opcoes.a = opcaoa;
    checkForm.opcoes.a = true;
  }
  console.log(questao);
});

document.getElementById('opcaob').addEventListener('input', function (e) {
  const opcaob = e.target.value.trim();
  if (opcaob.length < 1 || opcaob.length > 100) {
    console.log('Descrição da questão deve ter entre 1 e 100 caracteres');
    document.getElementById('erro-opcao').style.display = 'block';
    checkForm.opcaob = false;
  } else {
    document.getElementById('erro-opcao').style.display = 'none';
    questao.opcoes.b = opcaob;
    checkForm.opcoes.b = true;
  }
  console.log(questao);
});

document.getElementById('opcaoc').addEventListener('input', function (e) {
  const opcaoc = e.target.value.trim();
  if (opcaoc.length < 1 || opcaoc.length > 100) {
    console.log('Descrição da questão deve ter entre 1 e 100 caracteres');
    document.getElementById('erro-opcao').style.display = 'block';
    checkForm.opcaoc = false;
  } else {
    document.getElementById('erro-opcao').style.display = 'none';
    questao.opcoes.c = opcaoc;
    checkForm.opcoes.c = true;
  }
  console.log(questao);
});

document.getElementById('opcaod').addEventListener('input', function (e) {
  const opcaod = e.target.value.trim();
  if (opcaod.length < 1 || opcaod.length > 100) {
    console.log('Descrição da questão deve ter entre 1 e 100 caracteres');
    document.getElementById('erro-opcao').style.display = 'block';
    checkForm.opcaod = false;
  } else {
    document.getElementById('erro-opcao').style.display = 'none';
    questao.opcoes.d = opcaod;
    checkForm.opcoes.d = true;
  }
  console.log(questao);
});

document.getElementById('opcaoe').addEventListener('input', function (e) {
  const opcaoe = e.target.value.trim();
  if (opcaoe.length < 1 || opcaoe.length > 100) {
    console.log('Descrição da questão deve ter entre 1 e 100 caracteres');
    document.getElementById('erro-opcao').style.display = 'block';
    checkForm.opcaoe = false;
  } else {
    document.getElementById('erro-opcao').style.display = 'none';
    questao.opcoes.e = opcaoe;
    checkForm.opcoes.e = true;
  }
  console.log(questao);
});

let opcaoCorretaInputs = document.querySelectorAll('input[name="opcaocorreta"]');

for (let i = 0; i < opcaoCorretaInputs.length; i++) {
  opcaoCorretaInputs[i].addEventListener('change', function (e) {
    const opcaoCorreta = e.target.value;
    // let val = this.value; // this == the clicked radio,
    console.log(opcaoCorreta);
    questao.opcaocorreta = opcaoCorreta;
    checkForm.opcaoCorreta = true;
  });
}

function validaTitulo(titulo) {
  if (titulo.length < 1 || titulo.length > 100) {
    console.log('Título da questão deve ter entre 1 e 100 caracteres');
    document.getElementById('erro-titulo').style.display = 'block';
  } else {
    document.getElementById('erro-titulo').style.display = 'none';
  }
}

async function cadastraQuestao(event) {
  event.preventDefault();
  // question.title = document.getElementById('titulo-questao').value;
  const url = 'http://localhost:5000/php/gravaquestao.php';
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(questao), // body data type must match "Content-Type" header
  });
  console.log(response);
}

function get() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  };

  fetch("http://localhost:5000/php/consultaquestoes.php", requestOptions)
  .then(res => {
    return res.json()
  })
  .then((data) => {
    console.log(data);
    exibeQuestoes(data);
  })
  .catch((error) => {
    console.log(error);
  })
}

function exibeQuestoes(data) {
  const divQuestoes = document.getElementById("questoes");

  data.map((index) => {
    const id = document.createElement("p");
    const titulo = document.createElement("p");
    const descricao = document.createElement("p");
    const dificuldade = document.createElement("p");
    const disciplina = document.createElement("p");

    const containerQuestions = document.createElement("div");

    id.textContent = "Questão " + index.id;
    titulo.textContent = "Título: " + index.titulo;
    descricao.textContent = "Descrição: " + index.descricao;
    dificuldade.textContent = "Dificuldade: " + index.dificuldade;
    disciplina.textContent = "Disciplina: " + index.disciplina;

    containerQuestions.appendChild(id);
    containerQuestions.appendChild(titulo);
    containerQuestions.appendChild(descricao);
    containerQuestions.appendChild(dificuldade);
    containerQuestions.appendChild(disciplina);

    containerQuestions.id = "custom-question"

    divQuestoes.appendChild(containerQuestions);
  })

}
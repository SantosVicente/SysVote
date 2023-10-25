const checkForm = {
  nome: false,
  email: false,
  password: false,
};

document.getElementById('nome').addEventListener('input', function(e) {
  const nome = e.target.value;
  if(nome.length < 5) {
    document.getElementById('error-nome').style.display = 'block';
    checkForm.nome = false;
  } else {
    document.getElementById('error-nome').style.display = 'none';
    checkForm.nome = true;
  }
  document.getElementById("error-login").style.display = "none";
  checkTrue();
})

document.getElementById('email').addEventListener('input', function(e) {
  const email = e.target.value;
  if(email.length < 5 || !((email.includes("@")) && email.includes("."))) {
    document.getElementById('error-email').style.display = 'block';
    checkForm.email = false;
  } else {
    document.getElementById('error-email').style.display = 'none';
    checkForm.email = true;
  }
  document.getElementById("error-login").style.display = "none";
  checkTrue();
})

document.getElementById('password').addEventListener('input', function(e) {
  const pass = e.target.value;

  if(pass.length < 8) {
    document.getElementById('error-password').style.display = 'block';
    checkForm.password = false;
  } else {
    document.getElementById('error-password').style.display = 'none';
    checkForm.password = true;
  }
  document.getElementById("error-login").style.display = "none";
  checkTrue();
})

function checkTrue() {
  const btn = document.getElementById('submit');
  if(checkForm.email === true && checkForm.password === true && checkForm.nome === true){
    btn.removeAttribute("disabled");
  }else{
    btn.setAttribute("disabled", "disabled");
  }
}

function observeForm() {
  const errorLogin = document.getElementById("error-login");
  const btn = document.getElementById('submit');

  setInterval(function() {
    if (errorLogin.style.display === "block") {
      checkForm.nome = false;
      checkForm.email = false;
      checkForm.password = false;
      btn.setAttribute("disabled", "disabled");
    }
  }, 500);
}
observeForm();
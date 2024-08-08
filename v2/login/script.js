const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");

// Valor padrão para a UTM "saldo"
const saldo = "saldo=300";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkForm();
});

email.addEventListener("blur", () => {
  checkInputEmail();
});

username.addEventListener("blur", () => {
  checkInputUsername();
});

function checkInputUsername() {
  const usernameValue = username.value;

  if (usernameValue === "") {
    errorInput(username, "Enter a username");
  } else {
    const formItem = username.parentElement;
    formItem.className = "form-content";
  }
}

function checkInputEmail() {
  const emailValue = email.value;

  if (emailValue === "") {
    errorInput(email, "Enter the email you used to register");
  } else {
    const formItem = email.parentElement;
    formItem.className = "form-content";
  }
}

function checkForm() {
  checkInputUsername();
  checkInputEmail();

  const formItems = form.querySelectorAll(".form-content");

  const isValid = [...formItems].every((item) => {
    return item.className === "form-content";
  });

  if (isValid) {
    // Cadastro com sucesso, agora vamos gerar as UTMs personalizadas e redirecionar com os valores
    const usernameValue = username.value;
    const emailValue = email.value;

    // Construa a URL com as UTMs personalizadas e a UTM "saldo"
    const path = "../app/index.html";
    const utm = `${saldo}&username=${encodeURIComponent(
      usernameValue
    )}&email=${encodeURIComponent(emailValue)}`;
    window.location.href = `${path}?${utm}`;
  }
}

function errorInput(input, message) {
  const formItem = input.parentElement;
  const textMessage = formItem.querySelector("a");

  textMessage.innerText = message;

  formItem.className = "form-content error";
}

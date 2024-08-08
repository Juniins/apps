$(document).ready(function () {
  // Recupera os valores da URL
  var urlParams = new URLSearchParams(window.location.search);
  var user_name = urlParams.get("username");
  var user_email = urlParams.get("email");
  var user_balance = urlParams.get("saldo");

  // Verifica se os valores foram recuperados corretamente
  console.log("Username: " + user_name);
  console.log("Email: " + user_email);
  console.log("Saldo: " + user_balance);

  // Exibe os valores nos IDs específicos
  $("#username").text(user_name);
  $("#username2").text(user_name);
  $("#email").text(user_email);
  $("#saldo").text(user_balance);

  // Define o valor do campo de entrada com a ID "username" igual a user_name
  $("#username").val(user_name);

  // Desativa o envio padrão do formulário
  $("#disable").submit(function (event) {
    event.preventDefault();
  });
});

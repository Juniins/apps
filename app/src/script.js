// Js Notifications
const likeButtons = document.querySelectorAll(".lookrate");

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {});
});

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";

  const checkIcon = document.getElementById("checkIcon").cloneNode(true);
  checkIcon.style.display = "block";
  notification.appendChild(checkIcon);

  const text = document.createElement("div");
  text.className = "notification-message";
  text.textContent = message;
  notification.appendChild(text);

  const notifications = document.querySelectorAll(".notification");
  notifications.forEach((n) => {
    n.style.transition = "transform 1s cubic-bezier(0.21, 1.02, 0.73, 1)";
  });

  let verticalOffset = 0;
  notifications.forEach((n) => {
    n.style.transform = `translate3d(0, ${verticalOffset}px, 0)`;
    verticalOffset += n.offsetHeight + 8;
  });

  const container = document.getElementById("notificationContainer");
  container.insertBefore(notification, container.firstChild);

  notification.style.transform = `translate3d(0, ${verticalOffset}px, 0)`;
  notification.style.animation =
    "slideIn 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards";

  notification.addEventListener("click", () => {
    notification.style.animation =
      "slideOut 0.5s cubic-bezier(0.15, 0.69, 0.33, 1.75) 0s 1 normal forwards";

    notification.addEventListener("animationend", () => {
      notification.remove();
    });
  });

  setTimeout(() => {
    notification.style.animation =
      "slideOut 0.5s cubic-bezier(0.15, 0.69, 0.33, 1.75) 0s 1 normal forwards";

    notification.addEventListener("animationend", () => {
      notification.remove();
    });
  }, 2000);

  setTimeout(() => {
    checkIcon.style.transform = "scale(1)";
  }, 10);
}

// LÓGICA DO SALDO
document.addEventListener("DOMContentLoaded", function () {
  const likeButtons = document.querySelectorAll(".lookrate");

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("clicked")) {
        return;
      }

      if (checarLimiteDiario()) {
        // Exibir popup personalizado se o limite for excedido
        Swal.fire({
          icon: "warning",
          title: "Attention",
          text: "You've reached your daily limit. Feel free to come back tomorrow for more!",
        });
      } else {
        button.classList.add("clicked");

        const addedAmount = updateBalance();
        showNotification(
          `Thanks for reviewing! Your commission: $ ${addedAmount.toFixed(2)}`
        );
        atualizarContadorDiario();
      }
    });
  });

  function updateBalance() {
    const amount = 0.1 + Math.random();

    const balanceElement = document.querySelector(".saldo b");
    const balanceText = balanceElement.textContent;
    const currentBalance = parseFloat(balanceText.replace("$", ""));
    const maxAllowedBalance = 3000.0;
    const newBalance = currentBalance + amount;

    const addedAmount = newBalance - currentBalance;

    if (newBalance > maxAllowedBalance) {
      animateValue(balanceElement, currentBalance, maxAllowedBalance, 200);
    } else {
      animateValue(balanceElement, currentBalance, newBalance, 200);
    }

    updateSaldoInURL(newBalance);

    return addedAmount;
  }

  function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = new Date().getTime();
    const endTime = startTime + duration;

    function updateValue() {
      const currentTime = new Date().getTime();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newValue = start + range * progress;
      element.textContent = "$" + newValue.toFixed(2);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    }

    updateValue();
  }

  function updateSaldoInURL(saldo) {
    const currentURL = new URL(window.location.href);
    currentURL.searchParams.set("saldo", saldo);
    window.history.replaceState({}, document.title, currentURL);
  }
});

// PRECISA COLOCAR O VALOR QUE DESEJA COLOCAR DE LIMITE X4
function checarLimiteDiario() {
  const dataAtual = new Date().toLocaleDateString();
  const contadorDiario = parseInt(localStorage.getItem(dataAtual)) || 0;
  const limiteDiario = 100;

  return contadorDiario >= limiteDiario;
}

function atualizarContadorDiario() {
  const dataAtual = new Date().toLocaleDateString();
  let contadorDiario = parseInt(localStorage.getItem(dataAtual)) || 0;
  contadorDiario++;
  localStorage.setItem(dataAtual, contadorDiario.toString());
}

document.addEventListener("DOMContentLoaded", function () {
  const balanceElement = document.querySelector(".saldo b");
  const maxAllowedBalance = 3000.0;

  const currentBalanceText = balanceElement.textContent;
  const currentBalance = parseFloat(currentBalanceText.replace("$", ""));

  const urlParams = new URLSearchParams(window.location.search);
  const user_balance = parseFloat(urlParams.get("saldo"));

  if (!isNaN(user_balance)) {
    const newBalance = currentBalance + user_balance;

    if (newBalance <= maxAllowedBalance) {
      balanceElement.textContent = "$" + newBalance.toFixed(2);
      updateProgressBar();
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  function disableButtonsAndShowOverlay() {
    const buttons = document.querySelectorAll(".btn-voto");
    buttons.forEach((button) => {
      button.disabled = true;
    });
    const overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    overlay.removeEventListener("click", disableButtonsAndShowOverlay);
  }

  const overlay = document.getElementById("overlay");
  overlay.addEventListener("click", disableButtonsAndShowOverlay);
});

// FUNÇÕES PARA MUDAR O CSS E SÓ CLICAR UMA VEZ
document.addEventListener("DOMContentLoaded", function () {
  for (let i = 1; i <= 24; i++) {
    const btnL = document.getElementById("btn" + i + "-l");
    const btnD = document.getElementById("btn" + i + "-d");

    btnL.addEventListener("click", function () {
      if (!btnL.classList.contains("n-w") && !checarLimiteDiario()) {
        btnD.classList.add("n-w");
        atualizarContadorDiario(); // Atualiza o contador diário ao clicar no botão
      }
    });

    btnD.addEventListener("click", function () {
      if (!btnD.classList.contains("n-w") && !checarLimiteDiario()) {
        btnL.classList.add("n-w");
        atualizarContadorDiario(); // Atualiza o contador diário ao clicar no botão
      }
    });
  }
});

function recarregarPagina() {
  // Rola até a seção com ID "page"
  document.getElementById("page").scrollIntoView;

  // Aguarda 400ms antes de recarregar a página
  setTimeout(function () {
    window.location.reload();
  }, 900);
}

document.addEventListener("DOMContentLoaded", function () {
  // Encontre o elemento com o ID "lookrate"
  const lookRateButton = document.getElementById("look1");

  // Adicione um ouvinte de evento de clique a ele
  lookRateButton.addEventListener("click", function () {
    // Encontre os elementos com as classes "n-1," "n-2," "n-3," "n-4" e "n-5"
    const elementsToChange = document.querySelectorAll(
      ".n-1, .n-2, .n-3, .n-4, .n-5"
    );
  });
});

// Atualizar saldo
document.addEventListener("DOMContentLoaded", function () {
  const balanceElement = document.querySelector(".saldo b");
  const progressElement = document.querySelector(".progress-bar");
  const maxAllowedBalance = 3000.0;

  // Adicione um evento de clique ao botão
  const updateButton = document.querySelector(".lookrate"); // Substitua "seu-botao-id" pelo ID do seu botão
  updateButton.addEventListener("click", function () {
    // Obtenha o valor atual do saldo e converta em percentual
    const balanceText = balanceElement.textContent;
    const currentBalance = parseFloat(balanceText.replace("$", ""));
    const percentage = (currentBalance / maxAllowedBalance) * 100;

    // Atualize a barra de progresso
    progressElement.style.width = percentage + "%";
  });
});

// Defina a função que atualiza a barra de progresso
function updateProgressBar() {
  const balanceElement = document.querySelector(".saldo b");
  const progressElement = document.querySelector(".progress-bar");
  const maxAllowedBalance = 3000.0;

  // Obtenha o valor atual do saldo
  const balanceText = balanceElement.textContent;
  const currentBalance = parseFloat(balanceText.replace("$", ""));
  const percentage = (currentBalance / maxAllowedBalance) * 100;

  // Atualize a barra de progresso
  progressElement.style.width = percentage + "%";
}

// Chame a função para configurar a barra de progresso inicialmente
updateProgressBar();

// Limite de curtidas

document.getElementById("fetch-button").addEventListener("click", fetchData);

// Inicia la actualización automática cada 10 segundos
setInterval(fetchData, 10000);

async function fetchData() {
  renderLoadingState();
  try {
    const response = await fetch("http://localhost:5050/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    renderData(data);
  } catch (error) {
    console.error(error);
    renderErrorState();
  }
}

function renderErrorState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 

  if (data.players.length >= 2) {
    // Obtener los dos últimos jugadores
    const lastPlayer = data.players[data.players.length - 1];
    const secondLastPlayer = data.players[data.players.length - 2];
    
    // Calcular el ganador
    const result = determineWinner(lastPlayer, secondLastPlayer);
    
    // Mostrar la partida y el ganador
    const matchResultDiv = document.createElement("div");
    matchResultDiv.className = "match-result";
    matchResultDiv.innerHTML = `
      <p>Última partida:</p>
      <p>${secondLastPlayer.name} (${secondLastPlayer.choice}) vs ${lastPlayer.name} (${lastPlayer.choice})</p>
      <p>Ganador: ${result}</p>
    `;
    container.appendChild(matchResultDiv);
  }

  // Mostrar el historial de todas las partidas
  const historyDiv = document.createElement("div");
  historyDiv.className = "history";
  historyDiv.innerHTML = "<h3>Historial de partidas:</h3>";
  data.players.forEach((player, index) => {
    if (index % 2 === 1) {
      const matchDiv = document.createElement("div");
      const opponent = data.players[index - 1];
      const winner = determineWinner(player, opponent);
      matchDiv.innerHTML = `
        <p>${opponent.name} (${opponent.choice}) vs ${player.name} (${player.choice}) - Ganador: ${winner}</p>
      `;
      historyDiv.appendChild(matchDiv);
    }
  });
  container.appendChild(historyDiv);
}

// Función para determinar el ganador
function determineWinner(player1, player2) {
  if (player1.choice === player2.choice) {
    return "Empate";
  }
  if (
    (player1.choice === "rock" && player2.choice === "scissors") ||
    (player1.choice === "scissors" && player2.choice === "paper") ||
    (player1.choice === "paper" && player2.choice === "rock")
  ) {
    return player1.name;
  } else {
    return player2.name;
  }
}

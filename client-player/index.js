document.getElementById("fetch-button").addEventListener("click", createUser);

async function createUser() {
  renderLoadingState();
  try {
    const playerName = document.getElementById("player-name").value;
    const playerChoice = document.getElementById("player-choice").value;

    if (!playerName || !playerChoice) {
      alert("Por favor, ingrese su nombre y seleccione una opción.");
      renderErrorState("Nombre o elección no válidos.");
      return;
    }

    const player = {
      name: playerName,
      choice: playerChoice,
    };

    const response = await fetch("http://localhost:5050/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    renderData(`Player ${playerName} ha elegido ${playerChoice}`);
  } catch (error) {
    renderErrorState();
  }
}

function renderErrorState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = "Player created";
  container.appendChild(div);
}

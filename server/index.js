const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = {
  players: [],
};

// Ruta GET para obtener todos los jugadores
app.get("/users", (request, response) => {
  response.send(db);
});

// Ruta POST para agregar un nuevo jugador
app.post("/player", (request, response) => {
  const { body } = request;
  const { name, choice } = body;

  // Validación simple del cuerpo de la solicitud
  if (!name || !choice) {
    return response.status(400).send({ error: "Name and choice are required" });
  }

  // Validación de la elección
  const validChoices = ["rock", "paper", "scissors"];
  if (!validChoices.includes(choice)) {
    return response.status(400).send({ error: "Invalid choice" });
  }

  // Agregar el jugador a la base de datos simulada
  db.players.push(body);

  // Responder con el objeto creado y un código 201
  response.status(201).send(body);
});

// Iniciar el servidor
app.listen(5050, () => {
  console.log(`Server is running on http://localhost:5050`);
});

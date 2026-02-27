const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/utilisateur.routes");
const contenuRoutes = require("./routes/contenu.routes");
require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(contenuRoutes);

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Démarré sur http://localhost:${PORT}`);
});

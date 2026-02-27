const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/contenu", async (req, res) => {
  const {
    id_utilisateur,
    nom_entreprise,
    adresse_entreprise,
    ville_entreprise,
    recruteur,
    nom_poste,
    competence,
  } = req.body;

  db.run(
    "INSERT INTO Contenu(id_utilisateur, nom_entreprise, adresse_entreprise, ville_entreprise, recruteur, nom_poste, competence) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id_utilisateur,
      nom_entreprise,
      adresse_entreprise,
      ville_entreprise,
      recruteur,
      nom_poste,
      competence,
    ],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Contenu créé" });
    },
  );
});

module.exports = router;

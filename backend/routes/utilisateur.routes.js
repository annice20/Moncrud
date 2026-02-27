const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");

router.post("/inscription", async (req, res) => {
  const { nom, prenom, adresse, tel, ville, pays, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO Utilisateur(nom, prenom, adresse, tel, ville, pays, email, password) values(?, ?, ?, ?, ?, ?, ?, ?)",
    [nom, prenom, adresse, tel, ville, pays, email, hash],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Utilisateur créé" });
    },
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get(
    "SELECT * FROM Utilisateur WHERE email = ?",
    [email],
    async (err, user) => {
      if (!user)
        return res.status(400).json({ message: "Utilisateur introuvable" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return res.status(400).json({ message: "Mot de passe incorrect" });

      const token = jwt.sign({ id: user.id_utilisateur }, "SECRET_KEY");
      res.json({ token });
    },
  );
});

module.exports = router;

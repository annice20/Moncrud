const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS Utilisateur(
            id_utilisateur INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT,
            prenom TEXT,
            adresse TEXT,
            tel TEXT,
            ville TEXT,
            pays TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    `);

  db.run(`
        CREATE TABLE IF NOT EXISTS Contenu(
            id_contenu INTEGER PRIMARY KEY AUTOINCREMENT,
            id_utilisateur INTEGER,
            nom_entreprise TEXT,
            adresse_entreprise TEXT,
            ville_entreprise TEXT,
            recruteur TEXT,
            nom_poste TEXT,
            competence TEXT,
            date_redaction DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur (id_utilisateur) 
                ON DELETE CASCADE 
                ON UPDATE NO ACTION
        )
    `);
});

module.exports = db;

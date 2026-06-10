import express from "express";
import cors from "cors";
import { db } from "./db.js";
import dotenv from "dotenv";
//importer swaggerDocs et swaggerui de config/swagger.js
import { swaggerDocs, swaggerUi } from "./config/swagger.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Route d’accueil
//documentation swagger pour la route d.accueil en openapi 3.0
/**
 * @openapi
 * /:
 *   get:
 *    summary: Route d’accueil
 *    description: Route d’accueil de l’API
 *    responses:
 *      200:
 *        description: Succès
 */
app.get("/", (req, res) => {
  res.send("Bienvenue sur l’API Express + MySQL !");
});

// ✅ Exemple : récupérer tous les utilisateurs
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// ✅ Exemple : ajouter un utilisateur
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Utilisateur ajouté avec succès !" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur en ligne sur le port ${PORT}`));

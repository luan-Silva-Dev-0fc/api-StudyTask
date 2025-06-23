const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./src/config/database");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 4028;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Pasta 'uploads' criada com sucesso!");
} else {
  console.log("A pasta 'uploads' já existe.");
}

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados conectado e sincronizado!");
  })
  .catch((err) => console.log("Erro ao conectar com o banco de dados:", err));

const arquivoPortuguesRoutes = require("./src/routes/arquivoPortuguesRoutes");
const curtidaRoutes = require("./src/routes/curtidaRoutes");

app.use("/api/arquivo-portugues", arquivoPortuguesRoutes);
app.use("/api/curtida-portugues", curtidaRoutes);

app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});

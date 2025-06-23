const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(" Pasta 'uploads' criada com sucesso!");
}

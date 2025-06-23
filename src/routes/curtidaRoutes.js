// src/routes/curtidaRoutes.js
const express = require("express");
const router = express.Router();
const Curtida = require("../models/CurtidaPortuguês");

router.post("/", async (req, res) => {
  try {
    const { arquivoPortuguesId, usuarioId } = req.body;

    if (!arquivoPortuguesId || !usuarioId) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const novaCurtida = await Curtida.create({ arquivoPortuguesId, usuarioId });
    res.status(201).json(novaCurtida);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar a curtida" });
  }
});

router.get("/", async (req, res) => {
  try {
    const curtidas = await Curtida.findAll();
    res.status(200).json(curtidas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar as curtidas" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const curtida = await Curtida.findByPk(id);

    if (!curtida) {
      return res.status(404).json({ error: "Curtida não encontrada" });
    }

    await curtida.destroy();
    res.status(200).json({ message: "Curtida deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar a curtida" });
  }
});

module.exports = router;

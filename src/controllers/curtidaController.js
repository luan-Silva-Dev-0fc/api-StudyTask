const { CurtidaPortuguês } = require('../models');

const registrarCurtida = async (req, res) => {
  try {
    const { usuarioId, arquivoPortuguesId } = req.body;

    const curtidaExistente = await CurtidaPortuguês.findOne({
      where: {
        usuarioId,
        arquivoPortuguesId,
      },
    });

    if (curtidaExistente) {
      return res.status(400).json({ error: "Você já curtiu essa publicação." });
    }

    const novaCurtida = await CurtidaPortuguês.create({
      usuarioId,
      arquivoPortuguesId,
    });

    res.status(201).json(novaCurtida);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarCurtidas = async (req, res) => {
  try {
    const curtidas = await CurtidaPortuguês.findAll();
    res.status(200).json(curtidas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletarCurtida = async (req, res) => {
  try {
    const { id } = req.params;
    const curtida = await CurtidaPortuguês.findByPk(id);

    if (!curtida) {
      return res.status(404).json({ error: "Curtida não encontrada" });
    }

    await curtida.destroy();
    res.status(200).json({ message: "Curtida deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registrarCurtida,
  listarCurtidas,
  deletarCurtida,
};

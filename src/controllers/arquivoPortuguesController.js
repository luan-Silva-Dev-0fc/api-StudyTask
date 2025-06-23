const fs = require("fs");
const path = require("path");
const { ArquivoPortugues, CurtidaPortuguês } = require("../models");

const criarArquivo = async (req, res) => {
  try {
    let caminhoFinal;

    if (req.file) {
      caminhoFinal = req.file.path.replace(/\\/g, "/");
    } else if (req.body.url) {
      caminhoFinal = req.body.url;
    } else {
      return res.status(400).json({ error: "Nenhuma foto ou vídeo foi enviado" });
    }

    const novoArquivo = await ArquivoPortugues.create({
      titulo: req.body.titulo || "Sem título",
      tipo: req.body.tipo || "foto",
      arquivo: caminhoFinal,
      categoria: "PortuguêsPortuguês"
    });

    res.status(201).json(novoArquivo);
  } catch (error) {
    res.status(500).json({ error: "Erro interno ao salvar o arquivo" });
  }
};

const listarArquivos = async (req, res) => {
  try {
    const arquivos = await ArquivoPortugues.findAll();
    res.status(200).json(arquivos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar arquivos" });
  }
};

const buscarArquivoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const arquivo = await ArquivoPortugues.findByPk(id);
    if (!arquivo) return res.status(404).json({ error: "Arquivo não encontrado" });
    res.json(arquivo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o arquivo" });
  }
};

const deletarArquivo = async (req, res) => {
  try {
    const { id } = req.params;
    const arquivo = await ArquivoPortugues.findByPk(id);
    if (!arquivo) return res.status(404).json({ error: "Arquivo não encontrado" });

    await CurtidaPortuguês.destroy({ where: { arquivoPortuguesId: id } });

    const filePath = path.resolve(arquivo.arquivo);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await arquivo.destroy();
    res.status(200).json({ message: "Arquivo deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o arquivo" });
  }
};

module.exports = {
  criarArquivo,
  listarArquivos,
  buscarArquivoPorId,
  deletarArquivo
};

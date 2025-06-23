const express = require('express');
const router = express.Router();
const multer = require('multer');
const { ArquivoPortugues, CurtidaPortuguês } = require('../models');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/ogg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo inválido.'));
    }
  }
});

router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const { titulo, tipo } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Nenhuma foto ou vídeo foi enviado' });

    const novoArquivo = await ArquivoPortugues.create({
      titulo,
      tipo,
      arquivo: req.file.path.replace(/\\/g, '/'),
      categoria: 'PortuguêsPortuguês'
    });

    res.status(201).json(novoArquivo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar o arquivo' });
  }
});

router.get('/', async (req, res) => {
  try {
    const arquivos = await ArquivoPortugues.findAll();
    res.status(200).json(arquivos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os arquivos' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const arquivo = await ArquivoPortugues.findByPk(id);
    if (!arquivo) return res.status(404).json({ error: 'Arquivo não encontrado' });

    await CurtidaPortuguês.destroy({ where: { arquivoPortuguesId: id } });

    const filePath = path.resolve(arquivo.arquivo);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await arquivo.destroy();
    res.status(200).json({ message: 'Arquivo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Erro ao deletar o arquivo: ${error.message}` });
  }
});

module.exports = router;

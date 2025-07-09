const express = require('express');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/certificado', (req, res) => {
  const { nome, curso, cargaHoraria, instituicao, local } = req.body;
  if (!nome || !curso || !cargaHoraria || !instituicao || !local) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=certificado.pdf');
  doc.pipe(res);

  // Borda dupla
  doc.save();
  doc.lineWidth(4).rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke('#0074D9');
  doc.lineWidth(1).rect(30, 30, doc.page.width - 60, doc.page.height - 60).stroke('#7FDBFF');
  doc.restore();

  // Logo (se existir)
  const logoPath = path.join(__dirname, 'public', 'logo.png');
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, doc.page.width / 2 - 50, 40, { width: 100 });
  }

  // Título
  doc.moveDown(4);
  doc.fillColor('#0074D9').fontSize(30).font('Helvetica-Bold').text('Certificado de Conclusão', { align: 'center' });
  doc.moveDown(2);

  // Corpo
  doc.fillColor('black').fontSize(16).font('Helvetica').text(`Certificamos que`, { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(22).font('Helvetica-Bold').text(nome, { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(16).font('Helvetica').text(`concluiu o curso de`, { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(20).font('Helvetica-Bold').text(curso, { align: 'center' });
  doc.moveDown(1);
  doc.fontSize(14).font('Helvetica').text(`Carga horária: ${cargaHoraria}`, { align: 'center' });
  doc.moveDown(1);
  doc.fontSize(14).font('Helvetica').text(`Instituição: ${instituicao}`, { align: 'center' });

  // Local e data
  doc.moveDown(2);
  doc.fontSize(14).font('Helvetica').text(`${local}, ${new Date().toLocaleDateString('pt-BR')}`, { align: 'right' });

  // Código de autenticação único
  const codigo = Math.random().toString(36).substring(2, 10).toUpperCase();
  doc.moveDown(2);
  doc.fontSize(12).fillColor('#888').text(`Código de autenticação: ${codigo}`, { align: 'left' });
  doc.fillColor('black');

  // Espaço para assinatura
  doc.moveDown(4);
  doc.fontSize(14).font('Helvetica').text('_________________________', { align: 'center' });
  doc.fontSize(12).font('Helvetica').text('Assinatura', { align: 'center' });

  doc.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 
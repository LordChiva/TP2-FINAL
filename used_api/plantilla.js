const PDFDocument = require('pdfkit');
const doc = new PDFDocument;

function pedidoPdf(pedido){
  const ped = JSON.stringify(pedido);
  doc.pipe(fs.createWriteStream(`pedido${pedido.id}.pdf`));

  doc
    .text('Pedido', 100, 300)
    .font('Times-Roman', 13)
    .moveDown()
    .text(ped, {
      width: 412,
      align: 'justify',
      indent: 30,
      columns: 2,
      height: 300,
      ellipsis: true
    });

  doc.end();
}

module.exports = { pedidoPdf };
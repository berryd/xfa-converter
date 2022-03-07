const htmlPdf = require('html-pdf-chrome');
const begin = Date.now();
console.log('Begin');
const options = {
    port: 9222,
    completionTrigger: new htmlPdf.CompletionTrigger.Timer(50000),
    chromeFlags: ['--disable-web-security', '--headless']
};

const url = 'http://localhost:8888/web/viewer.html?file=/xfa/xfa_invoice_example.pdf';
console.log("Requesting conversion");
let pdf = htmlPdf.create(url, options).then((pdf) => {
  const created = Date.now();
  console.log(`Pdf is converted, writing output: ${created-begin}`);
  const result = pdf.toFile('./output/output.pdf');
  const end = Date.now();
  console.log(`Output is written: ${end-created}, ${end-begin}`);
  return result;
});

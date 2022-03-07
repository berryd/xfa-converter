const htmlPdf = require('html-pdf-chrome');

const options = {
    port: 9222,
    completionTrigger: new htmlPdf.CompletionTrigger.Timer(50000),
    chromeFlags: ['--disable-web-security', '--headless']
};

const url = 'http://localhost:8888/web/viewer.html?file=/xfa/xfa_invoice_example.pdf';
let pdf = htmlPdf.create(url, options).then((pdf) => pdf.toFile('./output/output.pdf'));

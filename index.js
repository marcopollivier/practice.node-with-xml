const http = require('node:http');
const { create } = require('xmlbuilder2')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  const body = create({ version: '1.0' })
    .ele('base', { att: 'att_base_1', att2: 'att_base_2' })
      
      .ele('niv1_a')
        .ele('niv2_a', { att: 'att_base_1', att2: 'att_base_2' }).txt('Estou no niv 2').up()
        .ele('niv2_b').txt('Ainda no niv 2').up()
      .up()

      .ele('ni1_b').up()
    .up();

  const complete = body.root().ele('niv1_a').ele('aaaa').att(false)
  
  // convert the XML tree to string
  const xml = complete.end({ prettyPrint: true });
  console.log(xml);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(xml);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
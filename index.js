const http = require('node:http');
const { create } = require('xmlbuilder2')

const hostname = '127.0.0.1';
const port = 3000;

const convertWithXPath = () => {
  return create({ version: '1.0' })
  .ele('soap:Envelope', { 'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/', 
                          'xmlns:soapenc': 'http://schemas.xmlsoap.org/soap/encoding/',
                          'xmlns:tns': 'http://wms2.marcopollivier.dev/soap/webservice.xpto',
                        
                          'xmlns:types': 'http://wms2.marcopollivier.dev/soap/webservice.xpto/encodedTypes',
                          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                          'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                        })
    .ele('soap:Body', { 'id': '#1', 'soapenc:arrayType': "tns:Livro[1]" })
  .up();
}

const convertWithJSON = () => {
  const obj = {
    'soap:Envelope': {
      '@xmlns:soap': "http://schemas.xmlsoap.org/soap/envelope/",
      '@xmlns:soapenc': "http://schemas.xmlsoap.org/soap/encoding/",
      '@xmlns:tns': "http://wms2.marcopollivier.dev/soap/webservice.xpto",
      '@xmlns:types': "http://wms2.marcopollivier.dev/soap/webservice.xpto/encodedTypes",
      '@xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
      '@xmlns:xsd': "http://www.w3.org/2001/XMLSchema",

      'soap:Body': {
        '@soap:encodingStyle': 'http://schemas.xmlsoap.org/soap/encoding/',

        'tns:CadastraLivros': {
          '@id': 'id1',
          '@xsi:type': 'tns:CadastraLivros',
          
          'LivrosArray': {
            '@href': '#id2'
          }

        },

        'soapenc:Array': {
          '@id': 'id2',
          '@soapenc:arrayType': 'tns:Livro[1]',

          'Item': { '@href': '#id3' }
        },
      }

    }
  };

  const original = create(obj)

  original.root().ele('soap:Body').ele('aaa')
  

  return original
}

const server = http.createServer((req, res) => {

  // const body = convertWithXPath();
  const body = convertWithJSON();
  
  const document = body
  
  const xml = document.end({ prettyPrint: true });
  console.log(xml);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(xml);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
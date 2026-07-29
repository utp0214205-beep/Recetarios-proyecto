const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/swagger.json';
const endPointsFiles = ['./src/app.js'];

const doc = {
  info: {
    title: 'API de Recetarios',
    description: 'Documentación de la API'
  },
  host: 'laughing-space-parakeet-r457x5r4wxvw3jqj-3000.app.github.dev',
  schemes: ['https']
};

swaggerAutogen(outputFile, endPointsFiles, doc);
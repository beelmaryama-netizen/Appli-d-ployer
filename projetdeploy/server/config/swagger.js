//documenter mon api avec swagger

//importer swagger-jsdoc et swagger-ui-express
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//exporter swaggerDocs pour l'utiliser dans server.js
const options = {
  //definir les options de swagger
  definition: {
    openapi: "3.0.0", //version de openapi

    info: {
      title: "API de gestion de stock", //titre de l.api
      version: "1.0.0", //version de l.api
      description: "API pour gérer les produits en stock", //description de l.api
    },

    //specifier l'adresse de l.api
    servers: [
      {
        url: "http://localhost:53232", //url de l.api
      },
    ],
  },

  //specifier les fichiers contenant les annotations de swagger
  apis: ["./index.js"], //chemin vers les fichiers de routes
};

//générer la documentation swagger
const swaggerDocs = swaggerJsDoc(options);

//exporter swagger pour l'utiliser dans index.js
export { swaggerUi, swaggerDocs };
/**
 * @fileoverview Express application
 * @module app
 * @requires {@link external:express}
 * @requires {@link external:body-parser}
 * @requires config/app
 * @requires lib/errorhandler
 * @requires routes/main
 */

const express = require('express');
const bodyParser = require('body-parser');
const appCfg = require('./config/app');
const errorHandler = require('./lib/errorhandler');

// Importation des routers
const mainRouter = require('./routes/main');

// Configuration de l'application
const app = express();

app.set('port', appCfg.port);

// Body parser pour extraire vers un json le body ou les paramètres
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ajout des routes
app.use('/', mainRouter);

// Gestion des erreurs
app.use(errorHandler.errorNoRouteMapped);
app.use(errorHandler.errorHandler);

module.exports = app;

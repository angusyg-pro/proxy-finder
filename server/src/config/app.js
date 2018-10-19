/**
 * @fileoverview Configuration de base de l'application
 * @module config/app
 * @requires {@link external:path}
 */

const path = require('path');

/**
 * Configuration
 * @namespace
 */
const app = {
  /**
   * Port du serveur
   * @type {number}
   * @default 3000
   */
  port: process.env.PORT || 3003,

  /**
   * Path du fichier de log du serveur
   * @type {string}
   */
  logFile: path.join(__dirname, '../../../logs/combined.log'),

  /**
   * Liste de proxys pour rebond vers PFD
   * @type {object[]}
   */
  proxies: [
    {
      address: 'M57355',
      port: 8888,
    },
    {
      address: 'M57341',
      port: 8888,
    },
    {
      address: 'M57244',
      port: 8888,
    },
    {
      address: 'M54683',
      port: 8888,
    },
  ],
};

module.exports = app;

/**
 * @fileoverview Service de recherche de proxies CLOUD - PFD actifs
 * @module lib/finder
 * @requires {@link external:tcp-ping}
 * @requires {@link external:util}
 * @requires config/app
 * @requires lib/logger
 */

const tcpp = require('tcp-ping');
const util = require('util');
const config = require('../config/app');
const logger = require('./logger');

const ping = util.promisify(tcpp.ping);

const service = {};

function pingProxy(proxy) {
  return new Promise(async (resolve) => {
    try {
      let status = 'DOWN';
      const data = await ping({
        address: proxy.address,
        port: proxy.port,
        attempts: 1,
        timeout: 5000,
      });
      if (data.min !== undefined) {
        // Proxy trouvé
        status = 'UP';
      }
      return resolve(`${proxy.address}:${proxy.port} ${status}`);
    } catch (err) {
      logger.warn(`Echec de contact du proxy '${proxy.address}:${proxy.port}'`);
      return resolve(`${proxy.address}:${proxy.port} ERROR`);
    }
  });
}

/**
 * Retourne une requête proxifiée
 * @private
 * @return {Promise} résolue avec la requête proxifiée, rejettée si erreur
 */
service.checkProxies = () => new Promise(async (resolve, reject) => {
  // Récupération de la liste des proxies paramétrée
  if (config.proxies.length > 0) {
    const status = [];
    for (const proxy of config.proxies) { /* eslint no-restricted-syntax: 0 */
      // Test du proxy
      status.push(pingProxy(proxy));
    }
    Promise.all(status).then(data => resolve(data));
  } else {
    // Aucun proxy configuré
    return reject(new Error('Aucun proxy configuré'));
  }
});

module.exports = service;

/**
 * @fileoverview Routeur principal
 * @module routes/main
 * @requires {@link external:express}
 * @requires {@link external:fs-extra}
 */

const express = require('express');
const fs = require('fs-extra');
const config = require('../config/app');
const finder = require('../lib/finder');

const router = express.Router();
const upSince = new Date();

/**
 * Renvoie la date et heure de démarrage du router
 * @path {GET} /status
 * @name /status
 */
router.get('/status', (req, res) => res.status(200).json({
  up: `UP depuis ${upSince}`,
}));

/**
 * Renvoie la log du serveur
 * @path {GET} /serverlog
 * @name /serverlog
 */
router.get('/serverlog', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.status(200).send(fs.readFileSync(config.logFile).toString());
});

/**
 * Déclenche une vérification du statut des proxies configurés
 * @path {GET} /ping
 * @name /ping
 */
router.get('/ping', (req, res, next) => {
  finder.checkProxies()
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
});

module.exports = router;

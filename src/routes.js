const express = require('express');
const RepositoryController = require('./v1/repository/RepositoryController');

const router = express.Router();

router.post('/v1/repositories/paging', new RepositoryController().paging);

module.exports = router;

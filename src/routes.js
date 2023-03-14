const express = require('express');
const RepositoryController = require('./v1/repository/RepositoryController');

const router = express.Router();

router.post('/v1/repositories/paging', new RepositoryController().paging);
router.post('/v1/search', new RepositoryController().search);
router.post('/v1/search/tags', new RepositoryController().searchByTag);
router.post('/v1/search/languages', new RepositoryController().searchByLanguage);

module.exports = router;

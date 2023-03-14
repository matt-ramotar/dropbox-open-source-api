const { Repository } = require('../models');
const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

class RepositoryController {
  paging = async (req, res) => {
    const { pageId, limit } = req.body;

    console.log(pageId, limit);

    const options = {
      limit: limit ?? 20,
      sort: {
        updated: -1,
      },
      populate: [
        {
          path: 'contributors',
        },
        { path: 'languages' },
        { path: 'tags' },
      ],
      page: pageId ?? 1,
    };

    try {
      const response = await Repository.paginate({ isPublic: true }, options);
      return res.json(response);
    } catch (error) {
      return res.json([]);
    }
  };

  search = async (req, res) => {
    const namePartialMatches = await Repository.find({ name: { $regex: req.body.searchInput, $options: 'i' }, isPublic: true })
      .populate('contributors')
      .populate('languages')
      .populate('tags');
    const descriptionPartialmatches = await Repository.find({ description: { $regex: req.body.searchInput, $options: 'i' }, isPublic: true })
      .populate('contributors')
      .populate('languages')
      .populate('tags');
    const fullTextMatches = await Repository.find({
      $text: { $search: req.body.searchInput, $caseSensitive: false, $diacriticSensitive: true },
      isPublic: true,
    })
      .populate('contributors')
      .populate('languages')
      .populate('tags');

    const resultObject = [...namePartialMatches, ...descriptionPartialmatches, ...fullTextMatches].reduce((acc, repository) => {
      acc[repository._id] = repository;
      return acc;
    }, {});

    return res.json(Object.values(resultObject));
  };

  searchByTag = async (req, res) => {
    const tagId = req.body.tagId;

    const matches = await Repository.find({ tags: tagId });
    return res.json(matches);
  };

  searchByLanguage = async (req, res) => {
    const languageId = req.body.languageId;

    const matches = await Repository.find({ languages: languageId });
    return res.json(matches);
  };
}

module.exports = RepositoryController;

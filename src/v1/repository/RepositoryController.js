const { Repository } = require('../models');

class RepositoryController {
  paging = async (req, res) => {
    const { pageId, limit } = req.body;

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
      return await Repository.paginate(null, options);
    } catch (error) {
      return res.json([]);
    }
  };
}

module.exports = RepositoryController;

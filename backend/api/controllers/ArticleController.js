module.exports = {
  create: async (req, res) => {
    try {
      const article = await Article.create(req.body).fetch();
      return res.status(201).json(article);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  find: async (req, res) => {
    try {
      const articles = await Article.find().populate('orders');
      return res.status(200).json(articles);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  findOne: async (req, res) => {
    try {
      const article = await Article.findOne({ id: req.params.id }).populate('orders');
      return res.status(200).json(article);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  update: async (req, res) => {
    try {
      const updatedArticle = await Article.updateOne({ id: req.params.id }).set(req.body);
      return res.status(200).json(updatedArticle);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  delete: async (req, res) => {
    try {
      await Article.destroyOne({ id: req.params.id });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};

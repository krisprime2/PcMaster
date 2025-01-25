module.exports = {
  create: async (req, res) => {
    try {
      const userId = req.session.userId || req.body.user;
      const configurationData = { ...req.body, user: userId };

      const configuration = await Configuration.create(configurationData).fetch();

      return res.status(201).json(configuration);
    } catch (error) {
      console.error('Error creating configuration:', error);
      return res.status(400).json({ error });
    }
  },

  find: async (req, res) => {
    try {
      const configurations = await Configuration.find().populate('components').populate('user');
      return res.status(200).json(configurations);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  findOne: async (req, res) => {
    try {
      const configuration = await Configuration.findOne({ id: req.params.id })
        .populate('components')
        .populate('user');
      if (!configuration) {
        return res.status(404).json({ error: 'Configuration not found' });
      }
      return res.status(200).json(configuration);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  update: async (req, res) => {
    try {
      const updatedConfiguration = await Configuration.updateOne({ id: req.params.id }).set(req.body);
      if (!updatedConfiguration) {
        return res.status(404).json({ error: 'Configuration not found' });
      }
      return res.status(200).json(updatedConfiguration);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  delete: async (req, res) => {
    try {
      const deletedConfiguration = await Configuration.destroyOne({ id: req.params.id });
      if (!deletedConfiguration) {
        return res.status(404).json({ error: 'Configuration not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};

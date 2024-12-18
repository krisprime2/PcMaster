module.exports = {
  create: async (req, res) => {
    try {
      const component = await Component.create(req.body).fetch();
      return res.status(201).json(component);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  find: async (req, res) => {
    try {
      const components = await Component.find().populate('configurations');
      return res.status(200).json(components);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  findOne: async (req, res) => {
    try {
      const component = await Component.findOne({ id: req.params.id }).populate('configurations');
      if (!component) {
        return res.status(404).json({ error: 'Component not found' });
      }
      return res.status(200).json(component);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  update: async (req, res) => {
    try {
      const updatedComponent = await Component.updateOne({ id: req.params.id }).set(req.body);
      if (!updatedComponent) {
        return res.status(404).json({ error: 'Component not found' });
      }
      return res.status(200).json(updatedComponent);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  delete: async (req, res) => {
    try {
      const deletedComponent = await Component.destroyOne({ id: req.params.id });
      if (!deletedComponent) {
        return res.status(404).json({ error: 'Component not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};

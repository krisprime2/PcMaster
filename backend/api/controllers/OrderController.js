const {ACTIVE, LOCKED} = require("../constants/Status");


module.exports = {
  create: async (req, res) => {
    try {
      const data = req.body;
      data.status = ACTIVE;
      const order = await Order.create(data).fetch();
      return res.status(201).json(order);
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error });
    }
  },

  find: async (req, res) => {
    try {
      const orders = await Order.find().populate('user').populate('articles');
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  findOne: async (req, res) => {
    try {
      const order = await Order.findOne({ id: req.params.id }).populate('user').populate('articles');
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  update: async (req, res) => {
    try {
      const updatedOrder = await Order.updateOne({ id: req.params.id }).set(req.body);
      return res.status(200).json(updatedOrder);
    } catch (error) {
      sails.log(error)
      return res.status(400).json({ error });
    }
  },

  delete: async (req, res) => {
    try {
      await Order.destroyOne({ id: req.params.id });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};

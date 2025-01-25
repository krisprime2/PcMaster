module.exports = {
  create: async function (req, res) {
    let params = req.allParams();
    await Product.create(params);
    res.ok();
  },

  findOne: async function (req, res) {
    let product = await Product.findOne({ id: req.params.id });
    res.json(product);
  },
  destroy: async function (req, res) {
    await Product.destroy({ id: req.params.id });
    res.ok();
  },
  find: async function (req, res) {
    let product = [
      {
        "name": "product 1",
        "price": 200,
        "category": "category1",
        "description": "Description1"
      },
      {
        "name": "product 2",
        "price": 250,
        "category": "category2",
        "description": "Description2"
      }
    ]
    return res.json(product);
  }
};


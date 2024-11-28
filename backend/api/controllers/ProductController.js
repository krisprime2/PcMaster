/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    let params = req.allParams();
    await Product.create(params);
    res.ok();
  },
 /* find: async function (req, res) {
    let products = await Product.find();
    return res.json(products);
  },*/
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
      }
    ]
    return res.json(product);
  }
};


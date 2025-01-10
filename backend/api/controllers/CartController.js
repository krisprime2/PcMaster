module.exports = {
  addItem: async function (req, res) {
    const { product, quantity } = req.body;

    if (!product || !quantity) {
      return res.badRequest({ message: 'Invalid product or quantity' });
    }

    if (!req.session.cart) {
      req.session.cart = [];
    }

    const existingItem = req.session.cart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      req.session.cart.push({ product, quantity });
    }

    return res.json(req.session.cart);
  },

  removeItem: async function (req, res) {
    const { productId } = req.body;

    if (!productId || !req.session.cart) {
      return res.badRequest({ message: 'Invalid product or no cart found' });
    }

    req.session.cart = req.session.cart.filter(item => item.product.id !== productId);

    return res.json(req.session.cart);
  },

  getCart: async function (req, res) {
    return res.json(req.session.cart || []);
  },

  clearCart: async function (req, res) {
    req.session.cart = [];
    return res.json(req.session.cart);
  }
};

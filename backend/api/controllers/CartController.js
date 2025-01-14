module.exports = {
  addItem: async function (req, res) {
    const { item, type, quantity } = req.body;

    if (!item || !type || !quantity) {
      return res.badRequest({ message: 'Invalid item, type, or quantity' });
    }

    if (!req.session.cart) {
      req.session.cart = [];
    }

    const isConfiguration = type === 'configuration';

    const existingItem = req.session.cart.find(cartItem => {
      if (isConfiguration) {
        return (
          cartItem.type === 'configuration' &&
          JSON.stringify(cartItem.item.components) === JSON.stringify(item.components)
        );
      } else {
        return cartItem.type === 'article' && cartItem.item.id === item.id;
      }
    });

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      req.session.cart.push({ item, type, quantity });
    }

    return res.json(req.session.cart);
  },

  removeItem: async function (req, res) {
    const { itemId, type } = req.body;

    if (!itemId || !type || !req.session.cart) {
      return res.badRequest({ message: 'Invalid item ID, type, or no cart found' });
    }

    req.session.cart = req.session.cart.filter(cartItem => {
      if (type === 'configuration') {
        return cartItem.type !== 'configuration' || cartItem.item.id !== itemId;
      } else {
        return cartItem.type !== 'article' || cartItem.item.id !== itemId;
      }
    });

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

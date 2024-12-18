const {LAPTOP, DESKTOP_PC,REPLACEMENT_PART} = require("../constants/ArticleTypes");


module.exports = {
  attributes: {
    type: {type: 'number', required: true, isIn: [LAPTOP, DESKTOP_PC, REPLACEMENT_PART]},
    price: { type: 'number', columnType: 'float' },
    name: { type: 'string' },
    description: { type: 'string' },

    orders: {
      collection: 'order',
      via: 'articles',
    },
  },
};

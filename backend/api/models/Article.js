const {LAPTOP, DESKTOP_PC,REPLACEMENT_PART} = require("../constants/ArticleTypes");


module.exports = {
  attributes: {
    type: {type: 'number', required: true, isIn: [LAPTOP, DESKTOP_PC, REPLACEMENT_PART]},
    price: { type: 'number', columnType: 'float' , required: true},
    name: { type: 'string', required: true },
    description: { type: 'string' },
    imageUrl: { type: 'string' },

    orders: {
      collection: 'order',
      via: 'articles',
    },
  },
};

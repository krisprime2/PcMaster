module.exports = {
  attributes: {
    date: { type: 'string', columnType: 'datetime' },
    status: { type: 'string' },

    user: {
      model: 'user',
    },
    articles: {
      collection: 'article',
      via: 'orders',
    },
  },
};

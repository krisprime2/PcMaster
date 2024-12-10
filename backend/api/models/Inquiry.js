/**
 * Inquiry.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string'},
    description: { type: 'string'},
    status: { type: 'string'},
    deviceType: { type: 'string'},
    modelNumber: { type: 'number'},

  user: {
    model: 'user',
    required: true
   },
  },
};


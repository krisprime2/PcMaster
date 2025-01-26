/**
 * Inquiry.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const {INPROCESSING, PROCESSED, DECLINED} = require("../constants/InquiryStatus");

module.exports = {

  attributes: {
    name: { type: 'string'},
    email: { type: 'string'},
    description: { type: 'string'},
    status: { type: 'number', required: true, isIn: [INPROCESSING, PROCESSED, DECLINED]},
    deviceType: { type: 'string'},
    modelNumber: { type: 'number'},
  },
};


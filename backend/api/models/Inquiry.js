/**
 * Inquiry.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const {INPROCESSING, PROCESSED, DECLINED} = require("../constants/InquiryStatus");

module.exports = {

  attributes: {
    name: { type: 'string', required: true},
    email: { type: 'string', required: true},
    description: { type: 'string', required: true},
    status: { type: 'number', required: true, isIn: [INPROCESSING, PROCESSED, DECLINED]},
    deviceType: { type: 'string', required: true},
    modelNumber: { type: 'string', required: true},
  },
};


const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getRecords = {
    body: Joi.object().keys({
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        minCount: Joi.number().required(),
        maxCount: Joi.number().required(),
      }),
}

module.exports = {
  getRecords
}
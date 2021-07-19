const catchAsync = require('../utils/catchAsync');
const { recordService } = require('../services');
const httpStatus = require('http-status');

const queryRecords = catchAsync(async (req, res) => {
  console.log('here');
  const records = recordService.getRecordsByFilter(req.body);
  res.status(httpStatus.OK).send(records);
});

module.exports = {
  queryRecords,
}

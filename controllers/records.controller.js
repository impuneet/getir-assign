const catchAsync = require('../utils/catchAsync');
const { recordService } = require('../services');
const { recordsMappers } = require('../mappers')
const httpStatus = require('http-status');

const queryRecords = catchAsync(async (req, res) => {
  const records = await recordService.getRecordsByFilter(req.body);
  const mappedRecords = recordsMappers.getRecordsResponse(records);
  res.send(mappedRecords);
});

module.exports = {
  queryRecords,
}

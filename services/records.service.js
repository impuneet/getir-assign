const httpStatus = require('http-status');
const recordsModel = require('../models/records');
const ApiError = require('../utils/ApiError');

const getRecordsByFilter = async (payload) => {
    const { startDate, endDate, minCount, maxCount } = payload;
    try {
        const records = await recordsModel.aggregate([
            {
              $match: {
                $and: [
                  {
                    createdAt: { $lte: new Date(endDate), $gte: new Date(startDate) },
                  },
                ],
              },
            },
            { $unwind: "$counts" },
            {
              $group: {
                _id: "$_id",
                key: { $first: "$key" },
                createdAt: { $first: "$createdAt" },
                totalCount: {
                  $sum: "$counts",
                },
              },
            },
            {
              $match: { $and: [{ totalCount: { $gte: minCount, $lte: maxCount } }] },
            },
          ]);   
          return records;
    } catch (error) {
        console.log(error);
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error in fetching records');
    }
}

module.exports = {
    getRecordsByFilter,
}
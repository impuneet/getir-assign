const getRecordsResponse = (records) => ({
  code: 0,
  msg: "Success",
  records: records.map((x) => ({
    key: x.key,
    createdAt: x.createdAt,
    totalCount: x.totalCount,
  })),
});

module.exports = {
    getRecordsResponse,
}
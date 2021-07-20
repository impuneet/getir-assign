const request = require("supertest");
const httpStatus = require("http-status");
const recordsModel = require("../models/records");
const setupTestDB = require("../utils/setupTestDB");

const app = require("../app");

setupTestDB();

describe("Record routes", () => {
  describe("POST /v1/records", () => {
    beforeEach(() => {
      validPayload = {
        startDate: "2016-01-26",
        endDate: "2018-02-02",
        minCount: 2700,
        maxCount: 3000,
      };
      inValidPayload = {
        startDate: "2016-01-26",
        minCount: 2700,
        maxCount: 3000,
      };
    });

    test("should return 200 and apply the default query options", async () => {
      const res = await request(app)
        .post("/v1/records")
        .send(validPayload)
        .expect(httpStatus.OK);

        expect(res.body).toEqual({
            records: expect.any(Array),
            code: 0,
            msg: "Success",
        });
    });

    test("should return 500 because of invalid payload", async () => {
        const res = await request(app)
          .post("/v1/records")
          .send(inValidPayload)
          .expect(httpStatus.INTERNAL_SERVER_ERROR);
      });
  });
});

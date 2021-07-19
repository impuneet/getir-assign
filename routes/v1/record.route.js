const express = require('express');
const { recordsController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(recordsController.queryRecords);

module.exports = router;
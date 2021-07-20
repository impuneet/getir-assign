const express = require('express');
const { recordsController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { recordValidation } = require('../../validations')
const router = express.Router();

router
  .route('/')
  .post( validate(recordValidation.getRecords), recordsController.queryRecords);

module.exports = router;
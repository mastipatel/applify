const express = require('express');

const jobController = require('../controllers/jobapplications.js');

const router = express.Router();

router.get( '/', jobController.getApplicationByEmail);
router.put('/create', jobController.CreateApplication);
router.put('/edit', jobController.EditApplication);
router.delete('/:application_id', jobController.DeleteApplication);
module.exports = router;
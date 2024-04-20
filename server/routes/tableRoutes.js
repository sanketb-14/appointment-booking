const express = require('express');
const router = express.Router();
const {createTable,getTableNames} = require('../controllers/tableController')
router.route('/create').post(createTable)
router.route('/').get(getTableNames)


module.exports = router

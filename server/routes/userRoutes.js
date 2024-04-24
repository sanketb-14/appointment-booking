const express = require('express');
const router = express.Router();
const { getAllUsers, addUser, singleUser, updateUser, deleteUser } = require('../controllers/userController')


router.route('/:tableName').get(getAllUsers).post(addUser)
router.route('/:tableName/:id').get(singleUser).patch(updateUser).delete(deleteUser)

module.exports = router
const express = require('express');
const router = express.Router();
const { getAllUsers, addUser, singleUser, updateUser, deleteUser } = require('../controllers/userController')


router.route('/').get(getAllUsers).post(addUser)
router.route('/:id').get(singleUser).patch(updateUser).delete(deleteUser)

module.exports = router
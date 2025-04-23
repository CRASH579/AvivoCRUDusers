const express = require('express');
const router = express.Router();
const { getUsers,createUser, deleteUser } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/create', createUser);
router.delete('/:id', deleteUser);

module.exports = router;
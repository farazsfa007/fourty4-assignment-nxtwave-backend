// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');

router.get('/', usersController.getUsers);         // GET /api/users
router.post('/', usersController.createUser);      // POST /api/users
router.get('/:id', usersController.getUserById);   // GET /api/users/:id
router.put('/:id', usersController.updateUser);    // PUT /api/users/:id
router.delete('/:id', usersController.deleteUser);// DELETE /api/users/:id

module.exports = router;

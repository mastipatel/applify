const express = require('express');

const userController = require('../controllers/users.js');

const router = express.Router();

router.put( '/sign-up', userController.SignUp);
router.put('/sign-in', userController.SignIn);
router.delete('/:user_id', userController.DeleteAccount);
module.exports = router;
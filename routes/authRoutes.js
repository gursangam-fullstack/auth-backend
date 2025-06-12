const express = require('express');
const { registerTempUser, loginUserController, getAlluser } = require('../controllers/userController');
const validate = require('../middlewares/validate.js');
const { signupSchema, loginSchema } = require('../validations/userValidations.js');
const auth = require('../middlewares/auth.js');

const router = express.Router();

router.post('/register', validate(signupSchema), registerTempUser);
router.post('/login', validate(loginSchema), loginUserController);
router.get('/users', getAlluser);

module.exports = router;


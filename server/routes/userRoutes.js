const express = require('express');
const User = require('../models/User')

const router = express.Router();

router.get('/profile',userController.getUser);
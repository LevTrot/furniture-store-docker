var express = require('express');
var router = express.Router();
const User = require('../Roles/User');
const Role = require('../Roles/User')

const users = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'User' },
  { id: 3, name: 'Write' }
];

/* GET users listing. */
router.get('/', async(req, res) => {
  try{
    const users = await User.find().populate('role');
    res.json(users);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;

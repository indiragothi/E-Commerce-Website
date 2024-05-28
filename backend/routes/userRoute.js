const express = require('express');
const { 
    handleSignIn, 
    handleSignUp, 
    handleLogout, 
    handleUserDetails,
    handleAllUser,
    handleUpdateUser
} = require('../controllers/userController');

const { authToken } = require('../middlewares/authToken');

const router = express.Router();
 
// for user
router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);
router.get('/logout', handleLogout)
router.get('/user-details', authToken, handleUserDetails)

// admin-panel
router.get('/all-user',authToken, handleAllUser)
router.get('/update-user',authToken, handleUpdateUser)

module.exports = router;
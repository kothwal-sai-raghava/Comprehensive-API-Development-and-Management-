const express= require('express');
const {protect,adminOnly} = require('../middleware/autoMiddleWare'); // Importing the protect middleware

const router = express.Router();

const {
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
}= require('../controllers/userControllers');

router.post('/login',loginUser); // Route to log in a user
router.post("/", createUser); // Route to create a new user
router.get("/",adminOnly, getUser); // Route to get all users
router.get("/:id", protect, getUserById); // Route to get a user by ID
router.put("/:id", protect,updateUser); // Route to update a user
router.delete("/:id", protect, deleteUser); // Route to delete a user
module.exports = router;
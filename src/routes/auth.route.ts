import express from 'express';
import { register, login } from '../controllers/auth.controller';

const router = express.Router();

// route for registering a new user
router.post('/register', register);


// route for logging in a user
router.post('/login', login);


export default router; 
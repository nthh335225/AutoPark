// src/routes/userRoutes.js
import express from 'express';
import { login, createUser, updateUser, changePassword, getUser, validateToken } from '../controllers/UserController.js';
import { createTransaction, getListTransactions, getTransaction} from '../controllers/TransactionHistoryController.js';

const router = express.Router();

// user 
router.post('/user/register', createUser);
router.post('/user/login', login);
router.post('/user/validateToken', validateToken);
router.post('/user/get', getUser);
router.post('/user/update', updateUser);
router.post('/user/changePassword', changePassword);

// transaction History 
router.post('/transactionHistory/create', createTransaction);
router.post('/transactionHistory/list', getListTransactions);
router.post('/transactionHistory/get', getTransaction);

// bonus History 
// router.post('/bonusHistory/create', createTransaction);
// router.post('/bonusHistory/list', getListTransactions);

export default router;

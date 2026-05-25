import express from 'express';
import { sendContact, aiAssistant } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', sendContact);
router.post('/ai', aiAssistant);

export default router;

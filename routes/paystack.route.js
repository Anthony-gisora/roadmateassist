import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = process.env.BASE_URL || 'https://api.paystack.co';

// Initialize a payment
router.post('/initialize', async (req, res) => {
  try {
    const { email, amount } = req.body;
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      { email, amount },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

// Verify payment after success
router.get('/verify/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Handle Paystack Webhooks
router.post('/webhook', express.json({ type: '*/*' }), (req, res) => {
  const event = req.body;
  console.log('Paystack webhook event:', event);
  res.sendStatus(200);
});

export default router;

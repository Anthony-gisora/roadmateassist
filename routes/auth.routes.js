import express from "express";
import {
  loginMechanic,
  registerMechanic,
  handleOnOff,
  forgotPassword,
  verifyCode,
  resetPass,
} from "../controllers/auth.controller.js";

const router = express.Router();

<<<<<<< HEAD
router.post("/register", registerMechanic);
router.post("/login", loginMechanic);
=======
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Log in a mechanic
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: mechanic@example.com
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginMechanic);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new mechanic
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mechanic registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/register", registerMechanic);

/**
 * @openapi
 * /auth/is-online/{id}:
 *   put:
 *     summary: Update mechanic online/offline status
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mechanic ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isOnline:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Mechanic status updated
 *       404:
 *         description: Mechanic not found
 */
>>>>>>> cbbf0f2ff8968a14ba78a6e685030d27d6282833
router.put("/is-online/:id", handleOnOff);
router.post("/passwords", registerMechanic);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyCode);
router.post("/reset-password", resetPass);

export default router;

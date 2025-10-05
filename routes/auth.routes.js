import express from "express";
import {
  loginMechanic,
  registerMechanic,
  handleOnOff,
} from "../controllers/auth.controller.js";

const router = express.Router();

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
router.put("/is-online/:id", handleOnOff);

export default router;

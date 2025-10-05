import express from "express";
import {
  handleDriverRequest,
  updateRequestComplete,
  updateRequestStatus,
  updateRequestStatusPending,
} from "../controllers/request.controller.js";

const router = express.Router();

/**
 * @openapi
 * /requests:
 *   post:
 *     summary: Create a new driver request
 *     tags:
 *       - Requests
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driverId:
 *                 type: string
 *               clientId:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Request created successfully
 *       400:
 *         description: Invalid request data
 */
router.post("/requests", handleDriverRequest);

/**
 * @openapi
 * /requests/update-status/{id}:
 *   put:
 *     summary: Update request status to accepted or in progress
 *     tags:
 *       - Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "accepted"
 *     responses:
 *       200:
 *         description: Request status updated
 *       404:
 *         description: Request not found
 */
router.put("/update-status/:id", updateRequestStatus);

/**
 * @openapi
 * /requests/update-pending/{id}:
 *   put:
 *     summary: Mark request as pending
 *     tags:
 *       - Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Request ID
 *     responses:
 *       200:
 *         description: Request marked as pending
 *       404:
 *         description: Request not found
 */
router.put("/update-pending/:id", updateRequestStatusPending);

/**
 * @openapi
 * /requests/update-complete/{id}:
 *   put:
 *     summary: Mark request as completed
 *     tags:
 *       - Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Request ID
 *     responses:
 *       200:
 *         description: Request marked as completed
 *       404:
 *         description: Request not found
 */
router.put("/update-complete/:id", updateRequestComplete);

export default router;

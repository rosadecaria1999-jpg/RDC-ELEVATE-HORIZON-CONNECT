// routes/registrations.js
const express = require("express");
const router = express.Router();
const { Registration, Event, sequelize } = require("../models");
const { Op } = require("sequelize");


/**
 * @swagger
 * /api/registrations:
 *   post:
 *     summary: Register user for event
 *     tags: [Registrations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: integer
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful
 */
router.post("/", async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { eventId, fullName, email } = req.body;
    if (!eventId || !fullName || !email) {
      await t.rollback();
      return res
        .status(400)
        .json({
          success: false,
          error: "eventId, fullName and email are required.",
        });
    }

    const event = await Event.findByPk(eventId, { transaction: t });
    if (!event) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, error: "Event not found." });
    }

    if (event.isCancelled) {
      await t.rollback();
      return res
        .status(400)
        .json({ success: false, error: "Event is cancelled." });
    }

    if (event.spotsRemaining <= 0) {
      await t.rollback();
      return res.status(400).json({ success: false, error: "Event is full." });
    }

    // simple duplicate check: same email already registered to same event
    const existing = await Registration.findOne({
      where: { eventId, email },
      transaction: t,
    });
    if (existing) {
      await t.rollback();
      return res
        .status(400)
        .json({
          success: false,
          error: "This email is already registered for the event.",
        });
    }

    const registration = await Registration.create(
      { eventId, fullName, email },
      { transaction: t }
    );
    event.spotsRemaining = event.spotsRemaining - 1;
    await event.save({ transaction: t });

    await t.commit();
    res
      .status(201)
      .json({
        success: true,
        message: "Registration successful.",
        registrationId: registration.id,
      });
  } catch (err) {
    await t.rollback();
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Unable to complete registration." });
  }
});


/**
 * @swagger
 * /api/registrations/event/{eventId}:
 *   get:
 *     summary: Get registrations for an event
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registration list
 */
router.get("/event/:eventId", async (req, res) => {
  try {
    const registrations = await Registration.findAll({
      where: { eventId: req.params.eventId },
      order: [["timestamp", "ASC"]],
    });
    res.json(registrations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch registrations." });
  }
});


/**
 * @swagger
 * /api/registrations/user/{email}:
 *   get:
 *     summary: Get registrations by email
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User registrations
 */
router.get("/user/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const registrations = await Registration.findAll({
      where: { email },
      include: [{ model: Event, as: "event" }],
      order: [["timestamp", "ASC"]],
    });
    res.json(registrations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch user registrations." });
  }
});

module.exports = router;

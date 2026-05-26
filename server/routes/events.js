// routes/events.js
const express = require("express");
const router = express.Router();
const { Event } = require("../models");
const { Op } = require("sequelize");

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of events
 */
router.get("/", async (req, res) => {
  try {
    const { date, category, search } = req.query;
    const where = {};

    if (date) where.date = date;
    if (category) where.category = category;
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    const events = await Event.findAll({
      where,
      order: [
        ["date", "ASC"],
        ["startTime", "ASC"],
      ],
    });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch events." });
  }
});

/**
 * @swagger
 * /api/events/today:
 *   get:
 *     summary: Get today's events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Today's events
 */
router.get("/today", async (req, res) => {
  try {
    const today = req.query.date || new Date().toISOString().slice(0, 10); // allow passing date for testing
    const events = await Event.findAll({
      where: { date: today },
      order: [["startTime", "ASC"]],
    });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch today's events." });
  }
});

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 */
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found." });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch event." });
  }
});

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created
 */
router.post("/", async (req, res) => {
  try {
    const {
      title,
      date,
      startTime,
      endTime,
      location,
      category,
      description,
      capacity,
    } = req.body;
    if (!title || !date)
      return res.status(400).json({ error: "Title and date are required." });

    const cap = parseInt(capacity || 0, 10);
    const event = await Event.create({
      title,
      date,
      startTime,
      endTime,
      location,
      category,
      description,
      capacity: cap,
      spotsRemaining: cap,
    });

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to create event." });
  }
});

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event updated
 */
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found." });

    const updatable = [
      "title",
      "date",
      "startTime",
      "endTime",
      "location",
      "category",
      "description",
      "capacity",
      "isCancelled",
    ];
    updatable.forEach((k) => {
      if (req.body[k] !== undefined) event[k] = req.body[k];
    });

    // if capacity changed ensure spotsRemaining is adjusted but not negative
    if (req.body.capacity !== undefined) {
      const newCap = parseInt(req.body.capacity, 10) || 0;
      const used = event.capacity - event.spotsRemaining; // previously booked
      const newSpotsRemaining = Math.max(0, newCap - used);
      event.capacity = newCap;
      event.spotsRemaining = newSpotsRemaining;
    }

    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to update event." });
  }
});

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted
 */
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found." });
    await event.destroy();
    res.json({ success: true, message: "Event deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to delete event." });
  }
});

module.exports = router;

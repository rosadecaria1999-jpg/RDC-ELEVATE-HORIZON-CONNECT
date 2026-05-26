// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const { sequelize } = require("./models");

const eventsRouter = require("./routes/events");
const registrationsRouter = require("./routes/registrations");

/**
 * @swagger
 * tags:
 *   - name: Events
 *     description: Event management endpoints
 *   - name: Registrations
 *     description: Event registration endpoints
 *   - name: System
 *     description: System endpoints
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is running
 */

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Elevate Horizon API",
      version: "1.0.0",
      description: "Events and registrations API for Elevate Horizon Connect",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: [
    "./app.js",
    "./routes/*.js",
    "./models/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger Docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API prefix
app.use("/api/events", eventsRouter);
app.use("/api/registrations", registrationsRouter);

// health
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// start server after DB is ready
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🚀 Base API: http://localhost:${PORT}/api`);
      console.log(`📄 Swagger Docs: http://localhost:${PORT}/api/docs`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
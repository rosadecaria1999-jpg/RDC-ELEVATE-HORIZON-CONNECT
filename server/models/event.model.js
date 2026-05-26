/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         date:
 *           type: string
 *           example: 2026-05-24
 *         startTime:
 *           type: string
 *           example: "09:00"
 *         endTime:
 *           type: string
 *           example: "11:00"
 *         location:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         capacity:
 *           type: integer
 *         spotsRemaining:
 *           type: integer
 *         isCancelled:
 *           type: boolean
 */
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.STRING, allowNull: false }, // YYYY-MM-DD
      startTime: { type: DataTypes.STRING, allowNull: true }, // HH:MM
      endTime: { type: DataTypes.STRING, allowNull: true }, // HH:MM
      location: { type: DataTypes.STRING, allowNull: true },
      category: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      capacity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      spotsRemaining: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isCancelled: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      timestamps: true,
    }
  );

  return Event;
};

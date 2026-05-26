/**
 * @swagger
 * components:
 *   schemas:
 *     Registration:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         eventId:
 *           type: integer
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 */
module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define(
    "Registration",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );

  return Registration;
};

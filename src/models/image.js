import Sequelize from "sequelize";
import sequelize from "./../db/";

export default sequelize.define(
  "image",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    filename: {
      type: Sequelize.STRING,
      allowNull: false
    },
    mime_type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    },
    size: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    optimized: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    optimized_image: {
      type: Sequelize.STRING,
      allowNull: true
    },
    optimized_size: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    quality: {
      type: Sequelize.STRING,
      allowNull: true
    },
    callback_url: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    getterMethods: {
      json() {
        return {
          id: this.id,
          filename: this.filename,
          mime_type: this.mime_type,
          size: this.size,
          optimized: this.optimized,
          optimized_size: this.optimized_size,
          quality: this.quality
        };
      }
    }
  }
);

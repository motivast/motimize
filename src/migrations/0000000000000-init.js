export default {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('images', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            filename: {
                type: Sequelize.STRING,
                allowNull: false,
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
            callback_url: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('images');
    }
};

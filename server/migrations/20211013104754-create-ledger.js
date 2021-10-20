"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Ledgers", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			AccountId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: `Accounts`,
					key: `id`,
				},
				onUpdate: `Cascade`,
				onDelete: `Cascade`,
			},
			description: {
				type: Sequelize.STRING,
			},
			transactionType: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			amount: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			UserId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: `Users`,
					key: `id`,
				},
				onUpdate: `Cascade`,
				onDelete: `Cascade`,
			},
			TransactionId: {
				type: Sequelize.INTEGER,
				references: {
					model: `Transactions`,
					key: `id`,
				},
				onUpdate: `Cascade`,
				onDelete: `Cascade`,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Ledgers");
	},
};

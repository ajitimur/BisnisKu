"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Transaction.belongsTo(models.User);
			Transaction.belongsTo(models.Product);
		}
	}
	Transaction.init(
		{
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `UserId is required`,
					},
				},
			},
			CustomerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `CustomerId is required`,
					},
				},
			},
			ProductId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `ProductId is required`,
					},
				},
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `quantity is required`,
					},
				},
			},
			amount: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `amount is required`,
					},
				},
			},
			dueDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `dueDate is required`,
					},
				},
			},
			isPaid: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `isPaid is required`,
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Transaction",
		}
	);
	return Transaction;
};

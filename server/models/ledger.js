"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Ledger extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Ledger.belongsTo(models.User);
		}
	}
	Ledger.init(
		{
			AccountId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `AccountId is required`,
					},
				},
			},
			transactionType: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `transactionType is required`,
					},
				},
			},
			description: DataTypes.STRING,
			amount: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `amount is required`,
					},
					notNull: {
						msg: "amount is not null",
					},
				},
			},
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `UserId is required`,
					},
				},
			},
			TransactionId: {
				type: DataTypes.INTEGER,
			},
		},
		{
			sequelize,
			modelName: "Ledger",
		}
	);
	return Ledger;
};

const {
  Customer,
  Ledger,
  Product,
  Transaction,
  sequelize,
} = require("../models");
const { getAccount, accounts } = require("../helpers/dataAccounts");

class PenjualanController {
  static async penjualanCash(req, res, next) {
    const { CustomerId, ProductId, quantity, category } = req.body; //customer berisi object data customer, product object isi data product yg dijual, //category ini customer bayarnya tf bank atau kas
    const userId = req.user.id;

    const t = await sequelize.transaction();
    try {
      const foundProduct = await Product.findByPk(ProductId);

      if (foundProduct) {
        const oldQuantity = foundProduct.quantity;
        const newQuantity = oldQuantity - quantity;

        const amount = foundProduct.sellPrice * quantity

        //Cek misal yg ngejual lebih dari stock yg ada
        if (newQuantity < 0) {
          //Disini throw error
          throw {
            name: `Bad request`,
            code: 400,
            message: `Cannot sell more than available quantity`,
          };
        }

        //Mengurangi quantity di table product
        await Product.update(
          {
            quantity: newQuantity,
          },
          {
            where: { id: ProductId },
          },
          {
            transaction: t,
          }
        );

        //Create new transaction
        const transaction = await Transaction.create(
          {
            UserId: userId,
            CustomerId,
            ProductId,
            quantity,
            amount,
            dueDate: new Date(),
            isPaid: true,
          },
          {
            transaction: t,
          }
        );

        //Create Ledger
        let ledger = [
          {
            AccountId: accounts.Kas, //Kas
            transactionType: "Debet",
            amount: amount,
            UserId: userId,
          },
          {
            AccountId: accounts.Persediaan, //Persediaan
            transactionType: "Credit",
            amount: foundProduct.basePrice * quantity,
            UserId: userId,
          },
          {
            AccountId: accounts.HPP, //HPP
            transactionType: "Debet",
            amount: foundProduct.basePrice * quantity,
            UserId: userId,
          },
          {
            AccountId: accounts.Penjualan, //Penjualan
            transactionType: "Debet",
            amount: amount,
            UserId: userId,
            TransactionId: transaction.id,
          },
        ];

        if (category === "bank") {
          console.log(accounts.Bank);
          ledger = [
            //assign new value, beda cuma kas di ganti jadi bank
            {
              AccountId: accounts.Bank, //Bank
              transactionType: "Debet",
              amount: amount,
              UserId: userId,
            },
            {
              AccountId: accounts.Persediaan, //Persediaan
              transactionType: "Credit",
              amount: foundProduct.basePrice * quantity,
              UserId: userId,
            },
            {
              AccountId: accounts.HPP, //HPP
              transactionType: "Debet",
              amount: foundProduct.basePrice * quantity,
              UserId: userId,
            },
            {
              AccountId: accounts.Penjualan, //Penjualan
              transactionType: "Debet",
              amount: amount,
              UserId: userId,
              TransactionId: transaction.id,
            },
          ];
        }

        const result = await Ledger.bulkCreate(ledger, { transaction: t });

        await t.commit();
        res.status(201).json(result);
      } else {
        //Throw error not found
        throw {
          name: `NOTFOUND`,
          code: 404,
          message: `Product does not exists`,
        };
      }
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async penjualanPiutang(req, res, next) {
    const { CustomerId, ProductId, quantity, dueDate } = req.body;
    const userId = req.user.id;

    const t = await sequelize.transaction();
    try {
      const foundProduct = await Product.findByPk(ProductId);

      if (foundProduct) {
        const oldQuantity = foundProduct.quantity;
        const newQuantity = oldQuantity - quantity;

        const amount = foundProduct.sellPrice * quantity

        //Cek misal yg ngejual lebih dari stock yg ada
        if (newQuantity < 0) {
          //Disini throw error
          throw {
            name: `Bad request`,
            code: 400,
            message: `Cannot sell more than available quantity`,
          };
        }

        //Mengurangi quantity di table product
        await Product.update(
          {
            quantity: newQuantity,
          },
          {
            where: { id: ProductId },
          },
          {
            transaction: t,
          }
        );

        //Create new transaction
        const transaction = await Transaction.create(
          {
            UserId: userId,
            CustomerId,
            ProductId,
            quantity,
            amount: amount,
            dueDate,
            isPaid: false,
          },
          {
            transaction: t,
          }
        );

        //Create Ledger
        const ledger = [
          {
            AccountId: accounts.Piutang, //Piutang
            transactionType: "Debet",
            amount: amount,
            UserId: userId,
          },
          {
            AccountId: accounts.Persediaan, //Persediaan
            transactionType: "Credit",
            amount: foundProduct.basePrice * quantity,
            UserId: userId,
          },
          {
            AccountId: accounts.HPP, //HPP
            transactionType: "Debet",
            amount: foundProduct.basePrice * quantity,
            UserId: userId,
          },
          {
            AccountId: accounts.Penjualan, //Penjualan
            transactionType: "Debet",
            amount: amount,
            UserId: userId,
            TransactionId: transaction.id,
          },
        ];

        const result = await Ledger.bulkCreate(ledger, { transaction: t });

        await t.commit();
        res.status(201).json(result);
      } else {
        //Throw error not found
        throw {
          name: `NOTFOUND`,
          code: 404,
          message: `Product does not exists`,
        };
      }
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = PenjualanController;

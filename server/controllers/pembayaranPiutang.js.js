const {
	Account,
	Category,
	Customer,
	Ledger,
	Product,
	Transaction,
	User,
	sequelize,
} = require("../models/index");

class PembayaranPiutangController {
	static async sendInvoice(req, res, next) {
    const id = req.params.id
    const UserId = req.user.id
		try {
      //find TransactionId ada apa ga
      const findTransaction = await Transaction.findOne({
        where: {
          id,
          UserId
        },
        include: [{model: Customer}, {model: User}, {model: Product}]
      })

      console.log(findTransaction.User);
      if(findTransaction){
        //nerbitin invoice
        const Xendit = require('xendit-node')
        const x = new Xendit({
            secretKey:'xnd_development_dHe58lZyBgLLnJYRH1O7CTukejaSIBAAkwl5IkKQbw5WBXyzHhVGPcMjdFju0y'
        })
  
        const { Invoice } = x;
        const invoiceSpecificOptions = {};
        const i = new Invoice(invoiceSpecificOptions);
  
        const resp = await i.createInvoice({
          externalID: `${id}`, // ini ganti TransactionId
          amount: findTransaction.amount,
          payerEmail: findTransaction.Customer.email,
          description: `Your transaction at ${findTransaction.User.businessName} for ${findTransaction.quantity} ${findTransaction.Product.unit} of ${findTransaction.Product.productName}`,
          shouldSendEmail: true,
          customer: {
            given_names: findTransaction.Customer.name,
            email: findTransaction.Customer.email,
            success_redirect_url: "http://localhost:5000/xendit/success",
          }
        });
        // console.log(resp);
  
        res.status(200).json(resp)
      } else {
        throw {
          name: `NOTFOUND`,
          code: 404,
          message: `Product does not exists`
      }
      }
		} catch (error) {
			// await t.rollback();
			// next(error);
      console.log(error);
			res
				.status(error.code || 501)
				.json({ message: error.message || "server error" });
		}
	}

  static async debtPayment(req, res, next){
    const { external_id } = req.body
    const TransactionId = external_id
    // const t = await sequelize.transaction();
    console.log(`MASUK BOSSSSS`);
    try {
      const transaction = await Transaction.update({
        isPaid: true
      },
      {
        where: {
          id: TransactionId
        },
        returning: true
      })

      console.log(transaction[1][0].amount);
      const ledger = [
        {
          AccountId: 2, //Bank
          transactionType: "Debet",
          amount: transaction[1][0].amount,
          UserId: transaction[1][0].UserId
        },
        {
          AccountId: 4, //Piutang
          transactionType: "Credit",
          amount: transaction[1][0].amount,
          UserId: transaction[1][0].UserId
        }
      ]
      // console.log(ledger);

      await Ledger.bulkCreate(ledger);
      // await t.commit();

      res.status(200).json({
        message: `Invoice ${TransactionId} Have Been Paid`
      })
      console.log("SUKSES BOSSSSSS");
    } catch (error) {
      // await t.rollback();
      console.log(error);
      next(error)
    }
  }
}

module.exports = {
	PembayaranPiutangController,
};

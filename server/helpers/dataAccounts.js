const { Account } = require("../models/index");

let accounts = {};

let getAccount = new Promise(async function (myResolve, myReject) {
	try {
		let x = 0;

		// The producing code (this may take some time)
		let objekAccount = await Account.findAll();

		for (const iterator of objekAccount) {
			accounts[iterator.name] = iterator.id;
		}

		myResolve(objekAccount);
	} catch (error) {
		myReject("Error");
	}
});

module.exports = { getAccount, accounts };

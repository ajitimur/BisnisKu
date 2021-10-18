const app = require("../app.js");
const dotenv = require("dotenv");
const port = process.env.PORT || 4000;
const { getAccount, accounts } = require("../helpers/dataAccounts");
getAccount.then((_) => {
	accounts;
	console.log(
		"🚀 ~ file: www.js ~ line 8 ~ getAccount.then ~ accounts",
		accounts
	);
});
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

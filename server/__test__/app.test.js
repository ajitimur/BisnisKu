const request = require("supertest");
const { getAccount, accounts } = require("../helpers/dataAccounts");
const app = require("../app");
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
let access_token = "";

const queryInterface = sequelize.getQueryInterface();

beforeAll(async () => {
	let UserData = {
		username: "dianardian",
		email: "dian@gmail.com",
		password: "123456",
		phoneNumber: "0899566666",
		businessName: "kelontong",
		bankNumber: "6940050053",
		address: "jalan abadi",
	};
	await User.create(UserData);

	await queryInterface.bulkInsert(
		"Products",
		[
			{
				UserId: 1,
				productName: "Pepsodent",
				quantity: 15,
				unit: "pcs",
				basePrice: 5000,
				sellPrice: 9000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: 1,
				productName: "sampo clear",
				quantity: 20,
				unit: "pcs",
				basePrice: 1000,
				sellPrice: 2000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: 1,
				productName: "Minyak Sayur",
				quantity: 20,
				unit: "liter",
				basePrice: 4000,
				sellPrice: 5000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{}
	);
	// await queryInterface.bulkInsert("Posts", arrayPost, {});
});

afterAll(async () => {
	await User.destroy({
		where: {},
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
});

let user = {
	username: "dian",
	email: "dianDiadi@gmail.com",
	password: "123456",
	phoneNumber: "0899566666",
	businessName: "kelontong",
	bankNumber: "6940050053",
	address: "jalan abadi",
};
describe("register User", () => {
	test("Berhasil register", (done) => {
		request(app)
			.post("/user/register")
			.send(user)
			.expect(201)
			.then((resp) => {
				expect(resp.body.message).toBe(
					`User: ${user.username} Successfully created`
				);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("email register sama", (done) => {
		let expectedResponse = ["username must be unique"];
		request(app)
			.post("/user/register")
			.send(user)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.arrayContaining(expectedResponse));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("Format email register tidak sesuai", (done) => {
		let userEmailWrong = {
			...user,
			email: "emailSalah",
		};
		let expectedResponse = "Must be an email";
		request(app)
			.post("/user/register")
			.send(userEmailWrong)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toContain(expectedResponse);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("input Register diberikan string kosong / tidak diinput", (done) => {
		registerParamsEmpty = {
			username: "",
			email: "",
			password: "",
			phoneNumber: "",
			businessName: "",
			bankNumber: "",
			address: "",
		};
		let expectedResponse = [
			"Username is required",
			"Email is required",
			"Must be an email",
			"Password is required",
			"businessName is required",
			"bankNumber is required",
			"phoneNumber is required",
			"address is required",
		];
		request(app)
			.post("/user/register")
			.send(registerParamsEmpty)
			.expect(400)
			.then((resp) => {
				for (const expected of expectedResponse) {
					expect(resp.body).toContain(expected);
				}

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("Login User,", () => {
	let loginParams = {
		username: "dianardian",
		password: "123456",
	};
	test("Berhasil login", (done) => {
		request(app)
			.post("/user/login")
			.send(loginParams)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(
					expect.objectContaining({
						access_token: expect.any(String),
						statuscode: 200,
						msg: "Login Succesful",
					})
				);
				access_token = resp.body.access_token;

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("Password Salah", (done) => {
		let passwordSalah = {
			...loginParams,
			password: "passwordSalah",
		};

		let exprectedResponse = {
			msg: "username atau password salah",
		};
		request(app)
			.post("/user/login")
			.send(passwordSalah)
			.expect(401)
			.then((resp) => {
				expect(resp.body).toEqual(expect.objectContaining(exprectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("username Salah", (done) => {
		let usernameWrong = {
			...loginParams,
			username: "wrongUsername",
		};

		let exprectedResponse = {
			msg: "username atau password salah",
		};
		request(app)
			.post("/user/login")
			.send(usernameWrong)
			.expect(401)
			.then((resp) => {
				expect(resp.body).toEqual(expect.objectContaining(exprectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("username password kosong", (done) => {
		let usernamePasswordEmpty = {
			username: "",
			password: "",
		};

		let exprectedResponse = {
			msg: "username atau password salah",
		};
		request(app)
			.post("/user/login")
			.send(usernamePasswordEmpty)
			.expect(401)
			.then((resp) => {
				expect(resp.body).toEqual(expect.objectContaining(exprectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

//NOTE QUERY LIST

describe("product ", () => {
	let idProduct = 0;
	test("product all", (done) => {
		request(app)
			.get("/product/all")
			.set("access_token", access_token)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));
				if (resp.body.length > 0) {
					for (const iterator of resp.body) {
						expect(iterator).toEqual(
							expect.objectContaining({
								UserId: expect.any(Number),
								productName: expect.any(String),
								quantity: expect.any(Number),
								unit: expect.any(String),
								basePrice: expect.any(Number),
								sellPrice: expect.any(Number),
							})
						);
						idProduct = iterator.id;
					}
				}

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("product id", (done) => {
		request(app)
			.get(`/product/${idProduct}`)
			.set("access_token", access_token)
			.expect(200)
			.then((resp) => {
				console.log(
					"🚀 ~ file: app.test.js ~ line 324 ~ .then ~ resp",
					resp.body
				);
				expect(resp.body).toEqual(expect.any(Object));

				expect(resp.body).toEqual(
					expect.objectContaining({
						UserId: expect.any(Number),
						productName: expect.any(String),
						quantity: expect.any(Number),
						unit: expect.any(String),
						basePrice: expect.any(Number),
						sellPrice: expect.any(Number),
					})
				);

				done();
			})
			.catch((err) => {
				console.log("🚀 ~ file: app.test.js ~ line 346 ~ test ~ err", err);

				done(err);
			});
	});
});
describe("modal ", () => {
	test("modal cash", (done) => {
		getAccount;
		let modal = {
			modal: 1000000,
		};

		request(app)
			.post("/modal/cash")
			.set("access_token", access_token)
			.send(modal)
			.expect(201)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));

				if (resp.body.length > 0) {
					resp.body.forEach((element, index) => {
						if (index == 0) {
							expect(element).toEqual(
								expect.objectContaining({
									AccountId: expect.any(Number),
									UserId: expect.any(Number),
									transactionType: expect.any(String),
								})
							);
							expect(element.AccountId).toBe(accounts.Kas);
						} else if (index == 1) {
							expect(element).toEqual(
								expect.objectContaining({
									AccountId: expect.any(Number),
									UserId: expect.any(Number),
									transactionType: expect.any(String),
								})
							);
							expect(element.AccountId).toBe(accounts.Modal);
						}
					});
				}

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("modal Bank", (done) => {
		getAccount;
		let modal = {
			modal: 1000000,
		};

		request(app)
			.post("/modal/bank")
			.set("access_token", access_token)
			.send(modal)
			.expect(201)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));

				if (resp.body.length > 0) {
					resp.body.forEach((element, index) => {
						if (index == 0) {
							expect(element).toEqual(
								expect.objectContaining({
									AccountId: expect.any(Number),
									UserId: expect.any(Number),
									transactionType: expect.any(String),
								})
							);
							expect(element.AccountId).toBe(accounts.Kas);
						} else if (index == 1) {
							expect(element).toEqual(
								expect.objectContaining({
									AccountId: expect.any(Number),
									UserId: expect.any(Number),
									transactionType: expect.any(String),
								})
							);
							expect(element.AccountId).toBe(accounts.Modal);
						}
					});
				}

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("pembellian cash ", () => {
	test(" berhasil pembelian Cash dengan product yang sudah ada", (done) => {
		getAccount;
		let pembelian = {
			productName: "Pepsodent",
			quantity: 1,
			unit: "pcs",
			basePrice: 5000,
			sellPrice: 9000,
		};
		request(app)
			.post("/pembelian/cash")
			.set("access_token", access_token)
			.send(pembelian)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));
				expect(resp.body[0]).toBe(1);
				expect(resp.body[1][0]).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						UserId: expect.any(Number),
						productName: expect.any(String),
						quantity: expect.any(Number),
						unit: expect.any(String),
						basePrice: expect.any(Number),
						sellPrice: expect.any(Number),
					})
				);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test(" berhasil pembelian Cash dengan product yang belum ada atau product baru", (done) => {
		getAccount;
		let pembelian = {
			productName: "closeUp",
			quantity: 5,
			unit: "pcs",
			basePrice: 7000,
			sellPrice: 11000,
		};
		request(app)
			.post("/pembelian/cash")
			.set("access_token", access_token)
			.send(pembelian)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));
				expect(resp.body[1]).toBe(true);
				expect(resp.body[0]).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						UserId: expect.any(Number),
						productName: expect.any(String),
						quantity: expect.any(Number),
						unit: expect.any(String),
						basePrice: expect.any(Number),
						sellPrice: expect.any(Number),
					})
				);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("pembellian Hutang ", () => {
	test(" berhasil pembelian Hutang dengan product yang sudah ada", (done) => {
		getAccount;
		let pembelian = {
			productName: "Pepsodent",
			quantity: 1,
			unit: "pcs",
			basePrice: 5000,
			sellPrice: 9000,
		};
		request(app)
			.post("/pembelian/hutang")
			.set("access_token", access_token)
			.send(pembelian)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));
				expect(resp.body[0]).toBe(1);
				expect(resp.body[1][0]).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						UserId: expect.any(Number),
						productName: expect.any(String),
						quantity: expect.any(Number),
						unit: expect.any(String),
						basePrice: expect.any(Number),
						sellPrice: expect.any(Number),
					})
				);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test(" berhasil pembelian Hutang dengan product yang belum ada atau product baru", (done) => {
		getAccount;
		let pembelian = {
			productName: "colgate",
			quantity: 6,
			unit: "pcs",
			basePrice: 8000,
			sellPrice: 13000,
		};
		request(app)
			.post("/pembelian/cash")
			.set("access_token", access_token)
			.send(pembelian)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));
				expect(resp.body[1]).toBe(true);
				expect(resp.body[0]).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						UserId: expect.any(Number),
						productName: expect.any(String),
						quantity: expect.any(Number),
						unit: expect.any(String),
						basePrice: expect.any(Number),
						sellPrice: expect.any(Number),
					})
				);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

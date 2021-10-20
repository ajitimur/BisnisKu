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

const { findAll } = require("../controllers/customerController");
let access_token = "";

const queryInterface = sequelize.getQueryInterface();
//NOTE : DATA INSERT

beforeEach(() => {
	jest.restoreAllMocks();
});

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
	await queryInterface.bulkInsert(
		"Customers",
		[
			{
				name: "Jasmin Rahmawati",
				email: "reksa.rajata@gmail.co.id",
				phoneNumber: "026 0949 884",
				UserId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Puji Hartati",
				email: "mardhiyah.mursinin@oktaviani.co.id",
				phoneNumber: "(+62) 368 3903 2888",
				UserId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{}
	);
	//  await queryInterface.bulkInsert("Posts", arrayPost, {});
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
				expect(resp.body.message).toEqual(
					expect.arrayContaining(expectedResponse)
				);

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
				expect(resp.body.message[0]).toContain(expectedResponse);

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
		let expectedResponse = {
			message: [
				"Username is required",
				"Email is required",
				"Must be an email",
				"Password is required",
				"businessName is required",
				"bankNumber is required",
				"phoneNumber is required",
				"address is required",
			],
		};
		request(app)
			.post("/user/register")
			.send(registerParamsEmpty)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));

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
			message: "Email atau Password salah",
		};
		request(app)
			.post("/user/login")
			.send(passwordSalah)
			.expect(400)
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
			message: "Email atau Password salah",
		};
		request(app)
			.post("/user/login")
			.send(usernameWrong)
			.expect(400)
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
			message: "Email atau Password salah",
		};
		request(app)
			.post("/user/login")
			.send(usernamePasswordEmpty)
			.expect(400)
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
				done(err);
			});
	});

	test("product handle error", (done) => {
		jest.spyOn(Product, "findAll").mockRejectedValue("Error");

		request(app)
			.get("/product/all")
			.set("access_token", access_token)
			.expect(500)
			.then((resp) => {
				expect(resp.body.err).toBe(undefined);

				done();
			})
			.catch((err) => {
				done(err);
			})
			.finally(() => {
				jest.clearAllMocks();
			});
	});

	test("product handle error", (done) => {
		request(app)
			.get("/product/100")
			.set("access_token", access_token)
			.expect(404)
			.then((resp) => {
				expect(resp.body).toEqual(
					expect.objectContaining({
						message: "Product not Found",
					})
				);

				done();
			})
			.catch((err) => {
				done(err);
			})
			.finally(() => {
				jest.clearAllMocks();
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
							expect(element.AccountId).toBe(accounts.Bank);
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
	test("modal Bank input invalid", (done) => {
		getAccount;
		let modal = {
			modal: "",
		};
		const expectedResponse = {
			message: "invalid input",
		};
		request(app)
			.post("/modal/bank")
			.set("access_token", access_token)
			.send(modal)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("modal cash input invalid", (done) => {
		getAccount;
		let modal = {
			modal: "",
		};
		const expectedResponse = {
			message: "invalid input",
		};
		request(app)
			.post("/modal/cash")
			.set("access_token", access_token)
			.send(modal)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("pembellian  ", () => {
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
			.post("/pembelian/hutang")
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

describe("pembellian bank ", () => {
	test(" berhasil pembelian bank dengan product yang sudah ada", (done) => {
		getAccount;
		let pembelian = {
			productName: "Pepsodent",
			quantity: 1,
			unit: "pcs",
			basePrice: 5000,
			sellPrice: 9000,
		};
		request(app)
			.post("/pembelian/bank")
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
	test(" berhasil pembelian bank dengan product yang belum ada atau product baru", (done) => {
		getAccount;
		let pembelian = {
			productName: "colgate white",
			quantity: 6,
			unit: "pcs",
			basePrice: 8000,
			sellPrice: 13000,
		};
		request(app)
			.post("/pembelian/bank")
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

describe("error pembelian", () => {
	test("pembelian cash uang tidak cukup", (done) => {
		getAccount;
		let pembelian = {
			productName: "Pepsodent",
			quantity: 100000,
			unit: "pcs",
			basePrice: 5000,
			sellPrice: 9000,
		};
		const expectedResponse = {
			message: "insufficient money",
		};
		request(app)
			.post("/pembelian/cash")
			.set("access_token", access_token)
			.send(pembelian)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("pembelian bank uang tidak cukup", (done) => {
		getAccount;
		let pembelian = {
			productName: "Pepsodent",
			quantity: 100000,
			unit: "pcs",
			basePrice: 5000,
			sellPrice: 9000,
		};
		const expectedResponse = {
			message: "insufficient money",
		};
		request(app)
			.post("/pembelian/bank")
			.set("access_token", access_token)
			.send(pembelian)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test(" rollback hutang", (done) => {
		getAccount;
		let pembelian = {
			productName: "Pepsodent",
			quantity: 1,
			unit: "pcs",
		};
		const expectedResponse = {
			message: "invalid input",
		};

		request(app)
			.post("/pembelian/hutang")
			.set("access_token", access_token)
			.send(pembelian)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

//TODO penjualan
describe("penjualan  ", () => {
	test(" penjualan berhasil menggunakan kas ", (done) => {
		getAccount;
		let penjualan = {
			customer: {
				id: 1,
				name: "Jasmin Rahmawati",
				email: "reksa.rajata@gmail.co.id",
				phoneNumber: "026 0949 884",
			},
			product: {
				id: 1,
				productName: "Pepsodent",
				sellQuantity: 1,
				amount: 9000,
			},
		};
		request(app)
			.post("/penjualan/cash")
			.set("access_token", access_token)
			.send(penjualan)
			.expect(201)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));
				resp.body.forEach((element, index) => {
					expect(element).toEqual(
						expect.objectContaining({
							id: expect.any(Number),
							AccountId: expect.any(Number),
							transactionType: expect.any(String),
							amount: expect.any(Number),
							UserId: expect.any(Number),
						})
					);
				});

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test(" penjualan berhasil menggunakan Piutang ", (done) => {
		getAccount;
		let penjualan = {
			customer: {
				id: 1,
				name: "Jasmin Rahmawati",
				email: "reksa.rajata@gmail.co.id",
				phoneNumber: "026 0949 884",
			},
			product: {
				id: 1,
				productName: "Pepsodent",
				sellQuantity: 1,
				amount: 9000,
				dueDate: new Date(),
			},
		};
		request(app)
			.post("/penjualan/Piutang")
			.set("access_token", access_token)
			.send(penjualan)
			.expect(201)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));
				resp.body.forEach((element, index) => {
					expect(element).toEqual(
						expect.objectContaining({
							id: expect.any(Number),
							AccountId: expect.any(Number),
							transactionType: expect.any(String),
							amount: expect.any(Number),
							UserId: expect.any(Number),
						})
					);
				});

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("penjualan piutang melebihi yang ada di stock", (done) => {
		getAccount;
		let penjualan = {
			customer: {
				id: 1,
				name: "Jasmin Rahmawati",
				email: "reksa.rajata@gmail.co.id",
				phoneNumber: "026 0949 884",
			},
			product: {
				id: 1,
				productName: "Pepsodent",
				sellQuantity: 1000000,
				amount: 900000000,
				dueDate: new Date(),
			},
		};
		let exprectedResponse = {
			message: `Cannot sell more than available quantity`,
		};

		request(app)
			.post("/penjualan/Piutang")
			.set("access_token", access_token)
			.send(penjualan)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(exprectedResponse));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("penjualan piutang melebihi yang ada di stock", (done) => {
		getAccount;
		let penjualan = {
			customer: {
				id: 1,
				name: "Jasmin Rahmawati",
				email: "reksa.rajata@gmail.co.id",
				phoneNumber: "026 0949 884",
			},
			product: {
				id: 1,
				productName: "Pepsodent",
				sellQuantity: 1000000,
				amount: 900000000,
				dueDate: new Date(),
			},
		};
		let exprectedResponse = {
			message: `Cannot sell more than available quantity`,
		};

		request(app)
			.post("/penjualan/cash")
			.set("access_token", access_token)
			.send(penjualan)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(exprectedResponse));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("pembeli cash namun tidak memiliki customerId", (done) => {
		getAccount;
		let penjualan = {
			customer: {
				name: "Ahmad Suhemat",
				email: "reksa@gmail.co.id",
				phoneNumber: "026 0949 884",
			},
			product: {
				id: 1,
				productName: "Pepsodent",
				sellQuantity: 1,
				amount: 9000,
				dueDate: new Date(),
			},
		};
		request(app)
			.post("/penjualan/cash")
			.set("access_token", access_token)
			.send(penjualan)
			.expect(201)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));
				resp.body.forEach((element, index) => {
					expect(element).toEqual(
						expect.objectContaining({
							id: expect.any(Number),
							AccountId: expect.any(Number),
							transactionType: expect.any(String),
							amount: expect.any(Number),
							UserId: expect.any(Number),
						})
					);
				});

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("pembeli piutang namun tidak memiliki customerId", (done) => {
		getAccount;
		let penjualan = {
			customer: {
				name: "Ahmad Suhendra",
				email: "reksa@gmail.co.id",
				phoneNumber: "026 0949 884",
			},
			product: {
				id: 1,
				productName: "Pepsodent",
				sellQuantity: 1,
				amount: 9000,
				dueDate: new Date(),
			},
		};
		request(app)
			.post("/penjualan/piutang")
			.set("access_token", access_token)
			.send(penjualan)
			.expect(201)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));
				resp.body.forEach((element, index) => {
					expect(element).toEqual(
						expect.objectContaining({
							id: expect.any(Number),
							AccountId: expect.any(Number),
							transactionType: expect.any(String),
							amount: expect.any(Number),
							UserId: expect.any(Number),
						})
					);
				});

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test(" penjualan berhasil menggunakan bank ", (done) => {
		getAccount;
		let penjualan = {
			customer: {
				id: 1,
				name: "Jasmin Rahmawati",
				email: "reksa.rajata@gmail.co.id",
				phoneNumber: "026 0949 884",
			},
			product: {
				id: 1,
				productName: "Pepsodent",
				sellQuantity: 1,
				amount: 9000,
			},
			category: "bank",
		};
		request(app)
			.post("/penjualan/cash")
			.set("access_token", access_token)
			.send(penjualan)
			.expect(201)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));
				resp.body.forEach((element, index) => {
					expect(element).toEqual(
						expect.objectContaining({
							id: expect.any(Number),
							AccountId: expect.any(Number),
							transactionType: expect.any(String),
							amount: expect.any(Number),
							UserId: expect.any(Number),
						})
					);
				});

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("menjual barang yang tidak ada secara cash", (done) => {
		getAccount;
		let penjualan = {
			customer: {
				id: 1,
				name: "Jasmin Rahmawati",
				email: "reksa.rajata@gmail.co.id",
				phoneNumber: "026 0949 884",
			},
			product: {
				id: 99,
				productName: "Tahu",
				sellQuantity: 1,
				amount: 9000,
			},
		};
		let exprectedResponse = {
			message: `Product does not exists`,
		};

		request(app)
			.post("/penjualan/cash")
			.set("access_token", access_token)
			.send(penjualan)
			.expect(404)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(exprectedResponse));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("menjual barang yang tidak ada secara piutang", (done) => {
		getAccount;
		let penjualan = {
			customer: {
				id: 1,
				name: "Jasmin Rahmawati",
				email: "reksa.rajata@gmail.co.id",
				phoneNumber: "026 0949 884",
			},
			product: {
				id: 99,
				productName: "Tahu",
				sellQuantity: 1,
				amount: 9000,
			},
		};
		let exprectedResponse = {
			message: `Product does not exists`,
		};

		request(app)
			.post("/penjualan/piutang")
			.set("access_token", access_token)
			.send(penjualan)
			.expect(404)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(exprectedResponse));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe(" pengeluaran  ", () => {
	test(" pengeluaran berhasil menggunakan Cash ", (done) => {
		getAccount;
		let pengeluaran = {
			amount: 100000,
			description: "listrik",
		};
		let exprectedResponse = {
			message: "transaction created",
		};
		request(app)
			.post("/pengeluaran/cash")
			.set("access_token", access_token)
			.send(pengeluaran)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(exprectedResponse));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test(" pengeluaran berhasil menggunakan Bank ", (done) => {
		getAccount;
		let pengeluaran = {
			amount: 100000,
			description: "listrik",
		};
		let exprectedResponse = {
			message: "transaction created",
		};
		request(app)
			.post("/pengeluaran/cash")
			.set("access_token", access_token)
			.send(pengeluaran)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(exprectedResponse));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("Pengeluaran cash input invalid", (done) => {
		getAccount;
		let modal = {
			amount: "",
			description: "",
		};
		const expectedResponse = {
			message: "invalid input",
		};
		request(app)
			.post("/pengeluaran/cash")
			.set("access_token", access_token)
			.send(modal)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("Pengeluaran Bank input invalid", (done) => {
		getAccount;
		let modal = {
			amount: "",
			description: "",
		};
		const expectedResponse = {
			message: "invalid input",
		};
		request(app)
			.post("/pengeluaran/bank")
			.set("access_token", access_token)
			.send(modal)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("Pengeluaran Bank insufficient money", (done) => {
		getAccount;
		let modal = {
			amount: 100000000,
			description: "",
		};
		const expectedResponse = {
			message: "insufficient money",
		};
		request(app)
			.post("/pengeluaran/bank")
			.set("access_token", access_token)
			.send(modal)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("Pengeluaran Cash insufficient money", (done) => {
		getAccount;
		let modal = {
			amount: 100000000,
			description: "",
		};
		const expectedResponse = {
			message: "insufficient money",
		};
		request(app)
			.post("/pengeluaran/cash")
			.set("access_token", access_token)
			.send(modal)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe(" report  ", () => {
	test(" berashasil menerima reports laba atau rugi", (done) => {
		getAccount;
		request(app)
			.get("/reports/labaRugi")
			.set("access_token", access_token)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(
					expect.objectContaining({
						balancePenjualan: expect.any(Number),
						balanceHpp: expect.any(Number),
						balanceBeban: expect.any(Number),
						balanceLabaRugi: expect.any(Number),
					})
				);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe(" authentication  ", () => {
	test("authentication ", (done) => {
		let exprectedResponse = {
			message: "Invalid JWT",
		};
		request(app)
			.get("/product/all")

			.expect(401)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(exprectedResponse));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
describe("customer ", () => {
	test("find all customer", (done) => {
		getAccount;
		request(app)
			.get("/customer")
			.set("access_token", access_token)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("find all error", (done) => {
		getAccount;
		jest.spyOn(Customer, "findAll").mockRejectedValue("Error");

		request(app)
			.get("/customer")
			.set("access_token", access_token)
			.expect(500)
			.then((res) => {
				expect(res.body.err).toBe(undefined);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("create customer", (done) => {
		getAccount;
		let customer = {
			name: "Adi",
			email: "adiadiaja@mail.com",
			phoneNumber: "1234567890",
		};
		const expectedResponse = {
			message: "Customer created",
		};

		request(app)
			.post("/customer")
			.set("access_token", access_token)
			.send(customer)
			.expect(201)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("create customer", (done) => {
		getAccount;
		let customer = {
			name: "Adi",
			email: "adiadiaja@mail.com",
			phoneNumber: "1234567890",
		};
		const expectedResponse = {
			message: "Customer created",
		};

		request(app)
			.post("/customer")
			.set("access_token", access_token)
			.send(customer)
			.expect(201)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("Error create customer", (done) => {
		getAccount;
		let customer = {
			name: "Adi",
		};

		request(app)
			.post("/customer")
			.set("access_token", access_token)
			.send(customer)
			.expect(400)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("transaction", () => {
	test("find unpaid", (done) => {
		getAccount;

		request(app)
			.get("/transaction/unpaid")
			.set("access_token", access_token)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("find paid", (done) => {
		getAccount;

		request(app)
			.get("/transaction/paid")
			.set("access_token", access_token)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("find unpaid error", (done) => {
		getAccount;
		jest.spyOn(Transaction, "findAll").mockRejectedValue("Error");

		request(app)
			.get("/transaction/unpaid")
			.set("access_token", access_token)
			.expect(500)
			.then((res) => {
				expect(res.body.err).toBe(undefined);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("find unpaid error", (done) => {
		getAccount;

		jest.spyOn(Transaction, "findAll").mockRejectedValue("Error");

		request(app)
			.get("/transaction/paid")
			.set("access_token", access_token)
			.expect(500)
			.then((res) => {
				expect(res.body.err).toBe(undefined);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("pembayaran", () => {
	test("berhasil pembayaran piutang", (done) => {
		getAccount;
		const expectedResponse = {
			message: "invalid input",
		};
		request(app)
			.get("/pembayaran/1")
			.set("access_token", access_token)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(
					expect.objectContaining({
						id: expect.any(String),
						external_id: expect.any(String),
						user_id: expect.any(String),
					})
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("gagal pembayaran piutang", (done) => {
		getAccount;
		const expectedResponse = {
			message: "Product does not exists",
		};
		request(app)
			.get("/pembayaran/100")
			.set("access_token", access_token)
			.expect(404)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("berhasil pembayaran xendit", (done) => {
		getAccount;
		const expectedResponse = { message: "Invoice 1 Have Been Paid" };
		const dataToXendit = {
			external_id: 1,
		};
		request(app)
			.post("/xendit/success")
			.set("access_token", access_token)
			.expect(200)
			.send(dataToXendit)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("gagal pembayaran xendit", (done) => {
		getAccount;
		const expectedResponse = {
			message: ["internal server error"],
		};
		const dataToXendit = {
			external_id: 100,
		};
		request(app)
			.post("/xendit/success")
			.set("access_token", access_token)
			.expect(500)
			.send(dataToXendit)
			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(expect.objectContaining(expectedResponse));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("Report", () => {
	test("gagal report laba/rugi ", (done) => {
		getAccount;
		jest.spyOn(sequelize, "query").mockRejectedValue("Error");
		request(app)
			.get("/reports/labaRugi")
			.set("access_token", access_token)
			.expect(401)

			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Array));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("berhasil report laba/rugi ", (done) => {
		getAccount;

		request(app)
			.get("/reports/labaRugi")
			.set("access_token", access_token)
			.expect(200)

			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(
					expect.objectContaining({
						bebanBalance: expect.any(Array),
						hppBalance: expect.any(Array),
						penjualan: expect.any(Array),
					})
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("berhasil report saldo ", (done) => {
		getAccount;

		request(app)
			.get("/reports/saldo")
			.set("access_token", access_token)
			.expect(200)

			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));
				expect(resp.body).toEqual(
					expect.objectContaining({
						balanceBank: expect.any(Number),
						balanceHutang: expect.any(Number),
					})
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("gagal report saldo ", (done) => {
		getAccount;
		jest.spyOn(Ledger, "findAll").mockRejectedValue("Error");
		request(app)
			.get("/reports/saldo")
			.set("access_token", access_token)
			.expect(500)

			.then((resp) => {
				expect(resp.body).toEqual(expect.any(Object));

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

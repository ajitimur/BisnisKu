const request = require("supertest");
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
		username: "dian ardi",
		email: "dian@gmail.com",
		password: "123456",
		phoneNumber: "0899566666",
		businessName: "kelontong",
		bankNumber: "6940050053",
		address: "jalan abadi",
	};
	await User.create(UserData);
	// for (let i = 0; i < 25; i++) {
	// 	post.title = `title ${i + 1}`;
	// 	post.content = `content ${i + 1}`;
	// 	post.imgUrl =
	// 		"https://www.bayustudio.com/wp-content/uploads/2020/01/versus.jpg";
	// 	post.categoryId = 1;
	// 	post.authorId = 1;
	// 	post.fieldStatus = "active";
	// 	post.createdAt = new Date();
	// 	post.updatedAt = new Date();
	// 	arrayPost.push(post);
	// }
	// await queryInterface.bulkInsert(
	// 	"Categories",
	// 	[
	// 		{
	// 			name: "Traveller",
	// 			createdAt: new Date(),
	// 			updatedAt: new Date(),
	// 		},
	// 		{
	// 			name: "Techonology",
	// 			createdAt: new Date(),
	// 			updatedAt: new Date(),
	// 		},
	// 		{
	// 			name: "my Diary",
	// 			createdAt: new Date(),
	// 			updatedAt: new Date(),
	// 		},
	// 		{
	// 			name: "programming",
	// 			createdAt: new Date(),
	// 			updatedAt: new Date(),
	// 		},
	// 	],
	// 	{}
	// );
	// await queryInterface.bulkInsert("Posts", arrayPost, {});
});

afterAll(async () => {
	await User.destroy({
		where: {},
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
	// await Post.destroy({
	// 	where: {},
	// 	truncate: true,
	// 	cascade: true,
	// 	restartIdentity: true,
	// });
	// await Category.destroy({
	// 	where: {},
	// 	truncate: true,
	// 	cascade: true,
	// 	restartIdentity: true,
	// });
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
			.post("/users/register")
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
			.post("/users/register")
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
			.post("/users/register")
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
			.post("/users/register")
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
		username: user.username,
		password: user.password,
	};
	test("Berhasil login", (done) => {
		request(app)
			.post("/users/login")
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
			.post("/users/login")
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
			.post("/users/login")
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
			.post("/users/login")
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

// describe("customer entitas utama", () => {
// 	let page,
// 		size,
// 		author,
// 		category = 0;
// 	test("Berhasil mendapatkan Entitas Utama (dengan access_token) tanpa menggunakan query filter parameter", (done) => {
// 		request(app)
// 			.get("/customer")
// 			.set("access_token", access_token)
// 			.expect(200)
// 			.then((resp) => {
// 				expect(resp.body).toEqual(
// 					expect.objectContaining({
// 						totalItems: expect.any(Number),
// 						posts: expect.any(Array),
// 						totalPages: expect.any(Number),
// 						currentPage: expect.any(Number),
// 					})
// 				);

// 				done();
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});
// 	test("Berhasil mendapatkan Entitas Utama (tanpa access_token) tanpa menggunakan query filter parameter", (done) => {
// 		request(app)
// 			.get("/customer")
// 			.expect(200)
// 			.then((resp) => {
// 				expect(resp.body).toEqual(
// 					expect.objectContaining({
// 						totalItems: expect.any(Number),
// 						posts: expect.any(Array),
// 						totalPages: expect.any(Number),
// 						currentPage: expect.any(Number),
// 					})
// 				);

// 				done();
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});
// 	page = 0;
// 	test("Berhasil mendapatkan Entitas Utama (dengan access_token) dengan 1 query filter parameter", (done) => {
// 		request(app)
// 			.get(`/customer?page=${page}`)
// 			.set("access_token", access_token)
// 			.expect(200)
// 			.then((resp) => {
// 				expect(resp.body).toEqual(
// 					expect.objectContaining({
// 						totalItems: expect.any(Number),
// 						posts: expect.any(Array),
// 						totalPages: expect.any(Number),
// 						currentPage: page,
// 					})
// 				);

// 				done();
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});
// 	test("Berhasil mendapatkan Entitas Utama (tanpa access_token) dengan 1 query filter parameter", (done) => {
// 		request(app)
// 			.get(`/customer?page=${page}`)
// 			.expect(200)
// 			.then((resp) => {
// 				expect(resp.body).toEqual(
// 					expect.objectContaining({
// 						totalItems: expect.any(Number),
// 						posts: expect.any(Array),
// 						totalPages: expect.any(Number),
// 						currentPage: page,
// 					})
// 				);

// 				done();
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});
// 	page = 0;
// 	size = 10;
// 	author = 1;
// 	test("Berhasil mendapatkan  Entitas Utama (dengan access_token) dengan 3 query filter parameter", (done) => {
// 		request(app)
// 			.get(`/customer?page=${page}&size=${size}&author=${author}`)
// 			.set("access_token", access_token)
// 			.expect(200)
// 			.then((resp) => {
// 				expect(resp.body).toEqual(
// 					expect.objectContaining({
// 						totalItems: expect.any(Number),
// 						posts: expect.any(Array),
// 						totalPages: expect.any(Number),
// 						currentPage: page,
// 					})
// 				);
// 				expect(resp.body.posts.length).toBe(size);
// 				resp.body.posts.forEach((el, index) => {
// 					expect(resp.body.posts[index].authorId).toBe(author);
// 				});

// 				done();
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});
// 	test("Berhasil mendapatkan  Entitas Utama (tanpa access_token) dengan 3 query filter parameter", (done) => {
// 		request(app)
// 			.get(`/customer?page=${page}&size=${size}&author=${author}`)
// 			.expect(200)
// 			.then((resp) => {
// 				expect(resp.body).toEqual(
// 					expect.objectContaining({
// 						totalItems: expect.any(Number),
// 						posts: expect.any(Array),
// 						totalPages: expect.any(Number),
// 						currentPage: page,
// 					})
// 				);
// 				expect(resp.body.posts.length).toBe(size);
// 				resp.body.posts.forEach((el, index) => {
// 					expect(resp.body.posts[index].authorId).toBe(author);
// 				});

// 				done();
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});
// 	page = 0;
// 	defaultSize = 5;
// 	let getPostId = 0;
// 	test("Berhasil mendapatkan  Entitas Utama serta panjang yang sesuai (dengan access_token) ketika memberikan page tertentu (cek paginationnya)", (done) => {
// 		request(app)
// 			.get(`/customer?page=${page}`)
// 			.set("access_token", access_token)
// 			.expect(200)
// 			.then((resp) => {
// 				expect(resp.body).toEqual(
// 					expect.objectContaining({
// 						totalItems: expect.any(Number),
// 						posts: expect.any(Array),
// 						totalPages: expect.any(Number),
// 						currentPage: page,
// 					})
// 				);
// 				expect(resp.body.posts.length).toBe(defaultSize);
// 				getPostId = resp.body.posts[0].id;

// 				done();
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});
// 	test("Berhasil mendapatkan  Entitas Utama serta panjang yang sesuai (tanpa access_token) ketika memberikan page tertentu (cek paginationnya)", (done) => {
// 		request(app)
// 			.get(`/customer?page=${page}`)
// 			.expect(200)
// 			.then((resp) => {
// 				expect(resp.body).toEqual(
// 					expect.objectContaining({
// 						totalItems: expect.any(Number),
// 						posts: expect.any(Array),
// 						totalPages: expect.any(Number),
// 						currentPage: page,
// 					})
// 				);
// 				expect(resp.body.posts.length).toBe(defaultSize);

// 				done();
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});
// 	test("Berhasil mendapatkan 1  Entitas Utama sesuai dengan params id yang diberikan", (done) => {
// 		request(app)
// 			.get(`/customer/${getPostId}`)
// 			.expect(200)
// 			.set("access_token", access_token)
// 			.then((resp) => {
// 				expect(resp.body).toEqual(
// 					expect.objectContaining({
// 						id: expect.any(Number),
// 						title: expect.any(String),
// 						content: expect.any(String),
// 						imgUrl: expect.any(String),
// 						categoryId: expect.any(Number),
// 						authorId: expect.any(Number),
// 					})
// 				);
// 				done();
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});

// 	test("Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid", (done) => {
// 		request(app)
// 			.get(`/customer/-1`)
// 			.expect(404)
// 			.set("access_token", access_token)
// 			.then((resp) => {
// 				expect(resp.body.message).toContain("post not found");
// 				done();
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});
// });

// describe("Customer Bookmark ", () => {
// 	test("Berhasil mendapatkan list bookmark / favorite sesuai dengan user yang login", (done) => {
// 		request(app)
// 			.get(`/bookmark`)
// 			.set("access_token", access_token)
// 			.expect(200)
// 			.then((resp) => {
// 				expect(resp.body).toEqual(
// 					expect.objectContaining({
// 						id: expect.any(Number),
// 						email: expect.any(String),
// 						password: expect.any(String),
// 						role: expect.any(String),
// 						UserPost: expect.any(Object),
// 					})
// 				);
// 				done();
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});
// });

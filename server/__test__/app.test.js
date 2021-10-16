const request = require("supertest");
const app = require("../app");
const { User, Post, sequelize, Category } = require("../models/index");
let access_token = "";
const queryInterface = sequelize.getQueryInterface();

beforeAll(async () => {
	let arrayPost = [];
	let post = {};
	let UserData = {
		username: "Test Seeder",
		email: "testSeeder@gmail.com",
		password: "1234567890",
		role: "admin",
		phoneNumber: "089533",
		address: "kalidoni",
	};
	let categoryData = {
		name: "alam",
	};
	await User.create(UserData);

	for (let i = 0; i < 25; i++) {
		post.title = `title ${i + 1}`;
		post.content = `content ${i + 1}`;
		post.imgUrl =
			"https://www.bayustudio.com/wp-content/uploads/2020/01/versus.jpg";
		post.categoryId = 1;
		post.authorId = 1;
		post.fieldStatus = "active";
		post.createdAt = new Date();
		post.updatedAt = new Date();
		arrayPost.push(post);
	}

	await queryInterface.bulkInsert(
		"Categories",
		[
			{
				name: "Traveller",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Techonology",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "my Diary",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "programming",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{}
	);
	await queryInterface.bulkInsert("Posts", arrayPost, {});
});

afterAll(async () => {
	await Post.destroy({
		where: {},
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});

	await Category.destroy({
		where: {},
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
	await User.destroy({
		where: {},
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
});

describe("register customer", () => {
	test("Berhasil register", (done) => {
		let registerParams = {
			email: "satu@gmail.com",
			password: "1234567890",
		};
		request(app)
			.post("/customer/register")
			.send(registerParams)
			.expect(201)
			.then((resp) => {
				expect(resp.body.email).toBe(registerParams.email);
				expect(resp.body.id).toEqual(expect.any(Number));
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("Email tidak diberikan / tidak diinput", (done) => {
		let registerParams = {
			email: null,
			password: "1234567890",
		};
		request(app)
			.post("/customer/register")
			.send(registerParams)
			.expect(400)
			.then((resp) => {
				expect(resp.body.message).toContain("Email is required");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("Password tidak diberikan / tidak diinput", (done) => {
		let registerParams = {
			email: "dua@gmail.com",
			password: null,
		};
		request(app)
			.post("/customer/register")
			.send(registerParams)
			.expect(400)
			.then((resp) => {
				expect(resp.body.message).toContain("password is required");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("Email diberikan string kosong", (done) => {
		let registerParams = {
			email: "",
			password: "1234567890",
		};
		request(app)
			.post("/customer/register")
			.send(registerParams)
			.expect(400)
			.then((resp) => {
				expect(resp.body.message).toContain(
					"Email is Required",
					"Email is not type  Required"
				);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("Password diberikan string kosong", (done) => {
		let registerParams = {
			email: "tiga@gmail.com",
			password: "",
		};
		request(app)
			.post("/customer/register")
			.send(registerParams)
			.expect(400)
			.then((resp) => {
				expect(resp.body.message).toContain(
					"password is required",
					"length minimal 5"
				);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("Format Email salah / invalid", (done) => {
		let loginParams = {
			email: "gmail.com",
			password: "",
		};
		request(app)
			.post("/customer/register")
			.send(loginParams)
			.expect(400)
			.then((resp) => {
				expect(resp.body.message).toContain("Email is not type  Required");

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("Login Customer,", () => {
	test("Berhasil login", (done) => {
		let registerParams = {
			email: "satu@gmail.com",
			password: "1234567890",
		};
		request(app)
			.post("/customer/login")
			.send(registerParams)
			.expect(200)
			.then((resp) => {
				expect(resp.body).toEqual(
					expect.objectContaining({
						access_token: expect.any(String),
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
		let registerParams = {
			email: "satu@gmail.com",
			password: "123456789",
		};
		request(app)
			.post("/customer/login")
			.send(registerParams)
			.expect(401)
			.then((resp) => {
				expect(resp.body.message).toContain(
					"Error login user not found atau password not matched"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	test("Email yang di input tidak terdaftar di database", (done) => {
		let registerParams = {
			email: "notFound@gmail.com",
			password: "123456789",
		};
		request(app)
			.post("/customer/login")
			.send(registerParams)
			.expect(401)
			.then((resp) => {
				expect(resp.body.message).toBe(
					"Error login user not found atau password not matched"
				);

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

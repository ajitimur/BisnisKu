# Buku Kas EndPoint

### This app has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

### POST/user/register

> Register User

_Request Header_

```
not needed

```

_Request Body_

```
[
    {

        "username": "<user username>",
        "email": "<user email>",
        "password":"<user password>",
        "phoneNumber":<user phoneNumber>,
        "address":<user address>,
        "businessName":<user businessName>,
        "bankNumber":<user bankNumber>
    }
[
```

_Response (201)_

```
{
    "message": "User: imammiko Successfully created"
}
```

_Response (400 - Bad Request)_

```
[
    "Username is required",
    "Email is required",
    "Must be an email",
    "Password is required",
    "businessName is required",
    "bankNumber is required",
    "phoneNumber is required",
    "address is required"
]
```

_Response (400 - Bad Request)_

```
 [ 'Must be an email' ]
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/user/login

> Login User

_Request Header_

```
not needed

```

_Request Body_

```

    {
        "username": "<user username>",
        "password":"<user password>",
    }

```

_Response (200)_

```
{
    access_token: <user Token>,
	statuscode: 200,
	sg: "Login Succesful",
}
```

_Response (400 - Bad Request)_

```
[
    "Username is required",
    "Email is required",
    "Must be an email",
    "Password is required",
    "businessName is required",
    "bankNumber is required",
    "phoneNumber is required",
    "address is required"
]
```

_Response (400 - Bad Request)_

```
 [ 'Must be an email' ]
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### GET/product/:id

> product id

_Request Header_

```
access_token

```

_Request Body_

```
not nedeed


```

_Response (200)_

```
{
    "id": 4,
    "UserId": 6,
    "productName": "pepsodent",
    "quantity": 10,
    "unit": "pcs",
    "basePrice": 5000,
    "sellPrice": 7000,
    "createdAt": "2021-08-24T15:58:05.000Z",
    "updatedAt": "2021-08-24T15:58:05.000Z"
}
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### GET/product/all

> product All

_Request Header_

```
access_token

```

_Request Body_

```
not nedeed


```

_Response (200)_

```
[
    {
        "id": 5,
        "UserId": 6,
        "productName": "closeUp",
        "quantity": 5,
        "unit": "pcs",
        "basePrice": 5000,
        "sellPrice": 7000,
        "createdAt": "2021-10-17T03:09:19.271Z",
        "updatedAt": "2021-10-17T04:51:04.108Z"
    },
    {
        "id": 6,
        "UserId": 6,
        "productName": "pepsodent",
        "quantity": 2,
        "unit": "pcs",
        "basePrice": 5000,
        "sellPrice": 7000,
        "createdAt": "2021-10-17T05:02:23.046Z",
        "updatedAt": "2021-10-17T05:02:35.670Z"
    }
[
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/modal/bank

> Modal Bank

_Request Header_

```
access_token

```

_Request Body_

```

    {
       modal:1000000
    }

```

_Response (201)_

```
[
    {
        "id": 35,
        "AccountId": 11,
        "transactionType": "Debet",
        "amount": 1000000,
        "UserId": 6,
        "createdAt": "2021-10-16T14:33:57.877Z",
        "updatedAt": "2021-10-16T14:33:57.877Z",
        "description": null,
        "TransactionId": null
    },
    {
        "id": 36,
        "AccountId": 16,
        "transactionType": "Credit",
        "amount": 1000000,
        "UserId": 6,
        "createdAt": "2021-10-16T14:33:57.877Z",
        "updatedAt": "2021-10-16T14:33:57.877Z",
        "description": null,
        "TransactionId": null
    }
]
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/modal/cash

> Modal cash

_Request Header_

```
access_token

```

_Request Body_

```

    {
       modal:1000000
    }

```

_Response (201)_

```
[
    {
        "id": 37,
        "AccountId": 11,
        "transactionType": "Debet",
        "amount": 1000000,
        "UserId": 6,
        "createdAt": "2021-10-16T15:18:06.612Z",
        "updatedAt": "2021-10-16T15:18:06.612Z",
        "description": null,
        "TransactionId": null
    },
    {
        "id": 38,
        "AccountId": 16,
        "transactionType": "Credit",
        "amount": 1000000,
        "UserId": 6,
        "createdAt": "2021-10-16T15:18:06.612Z",
        "updatedAt": "2021-10-16T15:18:06.612Z",
        "description": null,
        "TransactionId": null
    }
]
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/pembelian/hutang

> pembelian dengan Hutang product yang sudah ada sebelumnya

_Request Header_

```
access_token

```

_Request Body_

```

    {
       productName:"pepsodent",
       quantity:1,
       unit:"pcs",
       basePrice:5000,
       sellPrice:7000,
    }

```

_Response (200)_

```
[
    1,
    [
        {
            "id": 4,
            "UserId": 6,
            "productName": "pepsodent",
            "quantity": 1,
            "unit": "pcs",
            "basePrice": 5000,
            "sellPrice": 7000,
            "createdAt": "2021-08-24T15:58:05.000Z",
            "updatedAt": "2021-10-17T17:03:54.565Z"
        }
    ]
]
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/pembelian/hutang

> pembelian dengan Hutang dengan product belum ada sebelumnya

_Request Header_

```
access_token

```

_Request Body_

```

    {
       productName:"pepsodent",
       quantity:1,
       unit:"pcs",
       basePrice:5000,
       sellPrice:7000,
    }

```

_Response (200)_

```
[
    {
        "id": 10,
        "quantity": 1,
        "unit": "1222",
        "basePrice": 5000,
        "UserId": 6,
        "sellPrice": 7000,
        "productName": "new pepsodent",
        "updatedAt": "2021-10-17T17:15:09.148Z",
        "createdAt": "2021-10-17T17:15:09.148Z"
    },
    true
]
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/pembelian/bank

> pembelian dengan bank product yang sudah ada sebelumnya

_Request Header_

```
access_token

```

_Request Body_

```

    {
       productName:"pepsodent",
       quantity:1,
       unit:"pcs",
       basePrice:5000,
       sellPrice:7000,
    }

```

_Response (200)_

```
[
    1,
    [
        {
            "id": 4,
            "UserId": 6,
            "productName": "pepsodent",
            "quantity": 1,
            "unit": "pcs",
            "basePrice": 5000,
            "sellPrice": 7000,
            "createdAt": "2021-08-24T15:58:05.000Z",
            "updatedAt": "2021-10-17T17:03:54.565Z"
        }
    ]
]
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/pembelian/bank

> pembelian dengan bank dengan product belum ada sebelumnya

_Request Header_

```
access_token

```

_Request Body_

```

    {
       productName:"pepsodent",
       quantity:1,
       unit:"pcs",
       basePrice:5000,
       sellPrice:7000,
    }

```

_Response (200)_

```
[
    {
        "id": 10,
        "quantity": 1,
        "unit": "1222",
        "basePrice": 5000,
        "UserId": 6,
        "sellPrice": 7000,
        "productName": "new pepsodent",
        "updatedAt": "2021-10-17T17:15:09.148Z",
        "createdAt": "2021-10-17T17:15:09.148Z"
    },
    true
]
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/pembelian/cash

> pembelian dengan cash product yang sudah ada sebelumnya

_Request Header_

```
access_token

```

_Request Body_

```

    {
       productName:"pepsodent",
       quantity:1,
       unit:"pcs",
       basePrice:5000,
       sellPrice:7000,
    }

```

_Response (200)_

```
[
    1,
    [
        {
            "id": 4,
            "UserId": 6,
            "productName": "pepsodent",
            "quantity": 1,
            "unit": "pcs",
            "basePrice": 5000,
            "sellPrice": 7000,
            "createdAt": "2021-08-24T15:58:05.000Z",
            "updatedAt": "2021-10-17T17:03:54.565Z"
        }
    ]
]
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/pembelian/cash

> pembelian dengan cash dengan product belum ada sebelumnya

_Request Header_

```
access_token

```

_Request Body_

```

    {
       productName:"pepsodent",
       quantity:1,
       unit:"pcs",
       basePrice:5000,
       sellPrice:7000,
    }

```

_Response (200)_

```
[
    {
        "id": 10,
        "quantity": 1,
        "unit": "1222",
        "basePrice": 5000,
        "UserId": 6,
        "sellPrice": 7000,
        "productName": "new pepsodent",
        "updatedAt": "2021-10-17T17:15:09.148Z",
        "createdAt": "2021-10-17T17:15:09.148Z"
    },
    true
]
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/pengeluaran/cash

> pengeluaran dengan cash

_Request Header_

```
access_token

```

_Request Body_

```

    {
       amount:100000,
       description:listrik

    }

```

_Response (200)_

```
{
    "message": "transaction created"
}
```

_Response (404 )_

```
{
	msg:"insufficient money"
}
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/pengeluaran/bank

> pengeluaran dengan bank

_Request Header_

```
access_token

```

_Request Body_

```

    {
       amount:100000,
       description:listrik

    }

```

_Response (200)_

```
{
    "message": "transaction created"
}
```

_Response (404 )_

```
{
	msg:"insufficient money"
}
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/penjualan/cash

> penjualan dengan cash

_Request Header_

```
access_token

```

_Request Body_

```
{
    "customer":{
        "id":1,
        "name":"joko",
        "email":"joko@gmail.com",
        "phoneNumber":"0899999"

    },
    "product":{
        "id":4,
        "productName": "odol",
		"sellQuantity": 1,
		"amount":7000,
        "dueDate": "2021-08-24 22:58:05"
    }
}

```

_Response (201)_

```
[
    {
        "id": 423,
        "AccountId": 11,
        "transactionType": "Debet",
        "amount": 7000,
        "UserId": 6,
        "createdAt": "2021-10-17T18:03:36.381Z",
        "updatedAt": "2021-10-17T18:03:36.381Z",
        "description": null,
        "TransactionId": null
    },
    {
        "id": 424,
        "AccountId": 13,
        "transactionType": "Credit",
        "amount": 5000,
        "UserId": 6,
        "createdAt": "2021-10-17T18:03:36.381Z",
        "updatedAt": "2021-10-17T18:03:36.381Z",
        "description": null,
        "TransactionId": null
    },
    {
        "id": 425,
        "AccountId": 18,
        "transactionType": "Debet",
        "amount": 5000,
        "UserId": 6,
        "createdAt": "2021-10-17T18:03:36.381Z",
        "updatedAt": "2021-10-17T18:03:36.381Z",
        "description": null,
        "TransactionId": null
    },
    {
        "id": 426,
        "AccountId": 17,
        "transactionType": "Debet",
        "amount": 7000,
        "UserId": 6,
        "TransactionId": 46,
        "createdAt": "2021-10-17T18:03:36.381Z",
        "updatedAt": "2021-10-17T18:03:36.381Z",
        "description": null
    }
]
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### POST/penjualan/piutang

> penjualan dengan piutang

_Request Header_

```
access_token

```

_Request Body_

```
{
    "customer":{
        "id":1,
        "name":"joko",
        "email":"joko@gmail.com",
        "phoneNumber":"0899999"

    },
    "product":{
        "id":4,
        "productName": "odol",
		"sellQuantity": 1,
		"amount":7000,
        "dueDate": "2021-08-24 22:58:05"

    }
}

```

_Response (201)_

```
[
    {
        "id": 451,
        "AccountId": 14,
        "transactionType": "Debet",
        "amount": 7000,
        "UserId": 6,
        "createdAt": "2021-10-17T18:08:49.312Z",
        "updatedAt": "2021-10-17T18:08:49.312Z",
        "description": null,
        "TransactionId": null
    },
    {
        "id": 452,
        "AccountId": 13,
        "transactionType": "Credit",
        "amount": 5000,
        "UserId": 6,
        "createdAt": "2021-10-17T18:08:49.312Z",
        "updatedAt": "2021-10-17T18:08:49.312Z",
        "description": null,
        "TransactionId": null
    },
    {
        "id": 453,
        "AccountId": 18,
        "transactionType": "Debet",
        "amount": 5000,
        "UserId": 6,
        "createdAt": "2021-10-17T18:08:49.312Z",
        "updatedAt": "2021-10-17T18:08:49.312Z",
        "description": null,
        "TransactionId": null
    },
    {
        "id": 454,
        "AccountId": 17,
        "transactionType": "Debet",
        "amount": 7000,
        "UserId": 6,
        "TransactionId": 48,
        "createdAt": "2021-10-17T18:08:49.312Z",
        "updatedAt": "2021-10-17T18:08:49.312Z",
        "description": null
    }
]
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

### GET/reports/labaRugi

> product All

_Request Header_

```
access_token

```

_Request Body_

```
not nedeed


```

_Response (200)_

```
{
    "balancePenjualan": 0,
    "balanceHpp": 0,
    "balanceBeban": 0,
    "balanceLabaRugi": 0
}
```

_Response (500 - internal Server Error)_

```
{
  statuscode: 500 "Internal Server Error"
}
```

---

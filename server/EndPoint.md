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
    "productName": "odol",
    "quantity": 10,
    "unit": "1222",
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
        "id": 4,
        "UserId": 6,
        "productName": "odol",
        "quantity": 10,
        "unit": "1222",
        "basePrice": 5000,
        "sellPrice": 7000,
        "createdAt": "2021-08-24T15:58:05.000Z",
        "updatedAt": "2021-08-24T15:58:05.000Z"
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

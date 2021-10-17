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

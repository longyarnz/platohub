# InfoSpread Data API

## Author
* Name: Ayodele Olalekan
* Email: longyarnz@gmail.com

This is a simple Wallet API. 

## Building Blocks

It was built with the following technology:
* [NodeJS](https://nodejs.org)
* [Express](https://expressjs.com)
* [MongoDB](https://mongodb.com)
* [Mongoose](https://mongoosejs.com)

## Using The API

The API database is hosted on MongoDB.

### Data Schema

```js
  const User = new Schema({
    email: String,
    password: String,
  });

  const Wallet = new Schema({
    label: String,
    accounts: [
      {
        type: String,
        balance: Number,
      }
    ],
    created_by: UserID
  });

  const Transaction = new Schema({
    type: String,
    amount: Number,
    wallet: WalletID,
    account: Number,
  });
```

### API (https://rapi.herokuapp.com)

#### **Sign Up**

```js
  fetch('https://rapi.herokuapp.com/auth/create', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
```
Response from the query will be:
```json
  {
    "text": "User log-in successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZTU5YmIzY2M5M2ExMDAyMWY4ODhkYiIsImlhdCI6MTU0MTc3NDI2MH0.Mtw5n1HWcyQLN5XhdNGov5v4E1pfBVvH08_Oa5dbMPc"
  }
```

#### **Login**

```js
  fetch('https://rapi.herokuapp.com/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
```
Response from the query will be:
```json
  {
    "text": "User log-in successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZTU5YmIzY2M5M2ExMDAyMWY4ODhkYiIsImlhdCI6MTU0MTc3NDI2MH0.Mtw5n1HWcyQLN5XhdNGov5v4E1pfBVvH08_Oa5dbMPc"
  }
```

#### **Get a User Wallet**

```js
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZTU5YmIzY2M5M2ExMDAyMWY4ODhkYiIsImlhdCI6MTU0MTc3NDI2MH0.Mtw5n1HWcyQLN5XhdNGov5v4E1pfBVvH08_Oa5dbMPc";
  fetch('https://rapi.herokuapp.com/wallet/:walletId', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
```
Response from the query will be an object:
```json
  {
    "label": ":walletName",
    "_id": "5be5d92c958bc200343d8b76",
    "created_by": "5be59bb3cc93a10021f888db",
    "accounts": [],
    "date_created": "2018-11-09T18:59:56.414Z",
    "__v": 0
  }

```
#### **Get all User Wallets**

```js
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZTU5YmIzY2M5M2ExMDAyMWY4ODhkYiIsImlhdCI6MTU0MTc3NDI2MH0.Mtw5n1HWcyQLN5XhdNGov5v4E1pfBVvH08_Oa5dbMPc";
  fetch('https://rapi.herokuapp.com/wallet', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
```
Response from the query will be an Array of objects:
```json
  [{
    "label": ":walletName",
    "_id": "5be5d92c958bc200343d8b76",
    "created_by": "5be59bb3cc93a10021f888db",
    "accounts": [],
    "date_created": "2018-11-09T18:59:56.414Z",
    "__v": 0
  }]
```

#### **Create a Wallet**

```js
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZTU5YmIzY2M5M2ExMDAyMWY4ODhkYiIsImlhdCI6MTU0MTc3NDI2MH0.Mtw5n1HWcyQLN5XhdNGov5v4E1pfBVvH08_Oa5dbMPc";
  fetch('https://rapi.herokuapp.com/wallet/:walletName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
```
Response from the query will be:
```json
  {
    "label": ":walletName",
    "_id": "5be5d92c958bc200343d8b76",
    "created_by": "5be59bb3cc93a10021f888db",
    "accounts": [],
    "date_created": "2018-11-09T18:59:56.414Z",
    "__v": 0
  }
```

#### **Create a Wallet Account**

```js
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZTU5YmIzY2M5M2ExMDAyMWY4ODhkYiIsImlhdCI6MTU0MTc3NDI2MH0.Mtw5n1HWcyQLN5XhdNGov5v4E1pfBVvH08_Oa5dbMPc";
  fetch('https://rapi.herokuapp.com/wallet/:walletId/account/:type', {
    // :type can be 'debit' for debit account or 'credit' for credit account
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
```
Response from the query will be a new Account:
```json
  {
    "type": ":type",
    "balance": 0,
    "_id": "5be556d2b250e235c0ad6363"
  }
```

#### **Get Account Balance**

```js
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZTU5YmIzY2M5M2ExMDAyMWY4ODhkYiIsImlhdCI6MTU0MTc3NDI2MH0.Mtw5n1HWcyQLN5XhdNGov5v4E1pfBVvH08_Oa5dbMPc";
  fetch('https://rapi.herokuapp.com/wallet/:walletId/account/:accountId/balance', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
```
Response from the query will be:
```json
  {
    "balance": 0,
  }
```
# API Documentation

## 1️⃣ Getting started

To get the server running locally:

🚫 adjust these scripts to match your project

- Clone this repo
- **npm install** to install all required dependencies
- **npm start** to start the local server

You can use postman to run tests.

Test Account:

```
email: test@test.com
password: 123456
```

## 2️⃣ Endpoints

The Heroku URL --> https://net-giver-asset-mngr.herokuapp.com/api/

## Assets Endpoints

| Method | Endpoint          | Access Control     | Description                              |
| ------ | ------------------| -------------------|------------------------------------------|
| GET    | `/assets/`        | Get all assets     | Returns all assets behind a token.       |
| GET    | `/assets/:id`     | Get One Asset      | Returns one asset behind a token         |
| POST   | `/assets/`        | Adds One Asset     | Adds One Asset behind a token            |
| PUT    | `/assets/:id`     | Updates One Asset  | Updates one asset                        |
| DELETE | `/assets/:id`     | Deletes One Asset  | Deletes One Asset behind a token.        |

### Assets Data Model

```
{
        "id": 1,  // Auto Increment
        "name": "Laptop",  // String *Required
        "category": "Electronic", // String *Optional
        "description": "A Macbook laptop", // String *Optional
        "check_in": false, // Boolean *Required
        "location_id": 1, // Foreign Key for Locations Table *Required
        "user_id": 1 // Foreign key for Users Table *Required
}
```

## History Endpoints

| Method | Endpoint           | Access Control      | Description                              |
| ------ | -------------------| --------------------|------------------------------------------|
| GET    | `/history/`        | Get all History     | Returns all history behind a token.      |
| GET    | `/history/:id`     | Get One history     | Returns one history behind a token       |
| POST   | `/history/`        | Adds One history    | Adds One history behind a token          |


### History Data Model

```
{
    "id": 2, // Auto Increment
    "time_in": "4:00", // timestamp *Required
    "time_out": "4:01", // timestamp *Required
    "user_id": 2, // Foreign Key for Users Table *Required
    "asset_id": 2 // Foreign Key for Assets Table *Required
}
```

## Locations Endpoints

| Method | Endpoint            | Access Control     | Description                              |
| ------ | --------------------| -------------------|------------------------------------------|
| GET    | `/location/`        | Get all locations     | Returns all locations behind a token.       |
| GET    | `/location/:id`     | Get One location      | Returns one location behind a token         |
| POST   | `/location/`        | Adds One location     | Adds One location behind a token            |
| PUT    | `/location/:id`     | Updates One location  | Updates one location                        |
| DELETE | `/location/:id`     | Deletes One location  | Deletes One location behind a token.        |


### Locations Data Model

```
{
    "id": 2, // Auto Increment
    "name": "Universal Studios" // String *Required *Unique
}
```
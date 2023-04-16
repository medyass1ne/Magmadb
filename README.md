<img src="/banner.png">
<p>
    <a href="https://www.npmjs.com/package/magmadb"><img src="https://img.shields.io/npm/v/magmadb.svg?cacheSeconds=3600&style=for-the-badge" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/magmadb"><img src="https://img.shields.io/npm/l/magmadb.svg?cacheSeconds=3600&style=for-the-badge" alt="NPM license" /></a>
    <a href="https://www.npmjs.com/package/magmadb"><img src="https://img.shields.io/npm/dt/magmadb.svg?cacheSeconds=3600&style=for-the-badge" alt="NPM downloads" /></a>
    <a href="https://www.npmjs.com/package/magmadb"><img src="https://img.shields.io/bundlephobia/min/magmadb?color=%237559ff&label=Size&style=for-the-badge" alt="NPM size" /></a>
</p>

**Magmadb** is a package that offers a user-friendly solution for storing and accessing data in a low to medium volume environment, suitable for individuals with varying levels of expertise. The data is stored locally and persistently in json format, and the package also provides a variety of convenient features to enhance the user experience.

> A MAJOR BUG HAS BEEN FIXED, MAGMADB NOW WORKS PERFECTLY!

- **Persistent Storage** - Data doesn't disappear through restarts
- **Works out of the box** - No need to set up a database server, all the data is stored locally in the same project
- **Beginner Friendly** - Originally created for use in tutorials or in small projects
- & more...

## Installation
```bash
npm i magmadb
```

```js
//Importing Magmadb
const MagmaDatabase = require("magmadb");

//Create a new database named "db1"
const db = new MagmaDatabase("db1");
//Create a new collection named "accounts" inside "db1" to store user account data 
const accounts = db.CreateCollection("accounts");

//Now we want to create a user account
//Create a new data document inside the collection "accounts"
accounts.CreateData({
    id: 38437838728397,
    name: "Jacob",
    email: "example@domain.com",
    password: "password123"
});

//Now for looking up a user inside a collection
//Find a document inside "accounts" by its id
const jacob = accounts.GetData({ id: 38437838728397 });
console.log(jacob);
/*
This will return the following object:
{
    id: 38437838728397,
    name: "Jacob",
    email: "example@domain.com",
    password: "password123"
}
*/

//Now Jacob wants to change his email from to "example4@domain.net"
//First we get Jacob's account to update his email
const jacob = accounts.GetData({ id: 38437838728397 });
//Then we call the function Collection.UpdateData() to make changes to Jacob's account
//Our Collection here is "accounts" so:
accounts.UpdateData(jacob, {
    email: "example4@domain.net"
});
console.log(jacob);
/*
This will return the following object:
{
    id: 38437838728397,
    name: "Jacob",
    email: "example4@domain.net",
    password: "password123"
}
As you can see Jacob's email has been changed from "example@domain.com" to "example4@domain.net"
*/

//Lets create another account so we can have multiple documents inside our collection
accounts.CreateData({
    id: 49845168798135,
    name: "Walter",
    email: "example2@domain.com",
    password: "password123"
});

//You can also get all documents in a collection using Collection.GetAllData();
const allAccounts = accounts.GetAllData();
console.log(allAccounts);
/*
This will return the following Array of documents:
[
    {
        id: 38437838728397,
        name: "Jacob",
        email: "example@domain.com",
        password: "password123"
    },
    {
        id: 49845168798135,
        name: "Walter",
        email: "example2@domain.com",
        password: "password123"
    }
]
*/

//Lets try finding all users with the password "password123"
let usersWithSamePassword = accounts.Find({ password: "password123" });
console.log(usersWithSamePassword);
/*
This will return the following Array of documents:
[
    {
        id: 38437838728397,
        name: "Jacob",
        email: "example@domain.com",
        password: "password123"
    },
    {
        id: 49845168798135,
        name: "Walter",
        email: "example2@domain.com",
        password: "password123"
    }
]
Because Jacob and Walter has the same password ("password123")
*/

//Jacob wants to get his account deleted! Let's make his wish true.
//Lets get Jacobs account by his id
const jacob = accounts.GetData({ id: 38437838728397 });
accounts.DeleteData(jacob) //Here called Collection.DeleteData(jacob) to delete Jacob's account from the database.
//Now we check if Jacob's account is deleted by console logging all accounts
console.log(accounts.GetAllData());
/*
This will return the following Array of documents:
[
    {
        id: 49845168798135,
        name: "Walter",
        email: "example2@domain.com",
        password: "password123"
    }
]
//Jacob is out!
*/

//If you want to delete the whole accounts collection from your database use Database.DeleteCollection(collection)
//in our case here, Database is "db" and Collection is "accounts"
db.DeleteCollection(accounts);
//lets try console logging "accounts" after deleting it
console.log(accounts.GetAllData()); //This will return undefined
```
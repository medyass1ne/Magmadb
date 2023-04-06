const Database = require("./Components/Database");

module.exports = function() {
    const magma = new Database("Magma");
    const accounts = magma.CreateCollection("accounts");
    accounts.CreateData({
        id: 38437838728397,
        name: "nathir",
        password: "password"
    });
    accounts.CreateData({
        id: 45768659181532,
        name: "yessin",
        password: "104104104"
    });

    const yessin = accounts.GetData({ id: 45768659181532 });
    accounts.UpdateData(yessin, {
        name: "cool",
    })
}
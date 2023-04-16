const Database = require("./Components/Database");

module.exports = function() {
    const magma = new Database("Magma");
    const accounts = magma.CreateCollection("accounts");
    accounts.CreateData({
        id: 38437838728397,
        name: "Jacob",
        password: "password"
    });
    accounts.CreateData({
        id: 45768659181532,
        name: "Marcus",
        password: "104104104"
    });

    const jacob = accounts.Find({ id: 45768659181532 });
    //magma.DeleteCollection(accounts);
    /* accounts.UpdateData(jacob, {
        name: "cool",
    }) */
    // console.log(jacob);
}
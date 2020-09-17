const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
    ac.grant("user")
        .readOwn("profile")
        .updateOwn("profile")
        .createOwn("action")
        .readOwn("action")
        .updateOwn("action")
        .deleteOwn("action")
        .readAny("resource")

    ac.grant("admin")
        .extend("user")
        .readAny("profile", ['*', '!password'])
        .deleteAny("profile")
        .readAny("action")
        .updateAny("action")
        .createAny("resource")
        .readAny("resource")
        .updateAny("resource")
        .deleteAny("resource")

    return ac;
})();
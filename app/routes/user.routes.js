const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/test/whatsnew",controller.whatsnew);
  // app.post("/api/delete", controller.delete);
  app.post("/api/test/checkToken",controller.checkToken);
  app.post("/api/test/permission",controller.getPermission);
  app.post("/api/test/request",controller.getRequest);
  app.post("/api/test/checkaccess",controller.checkaccess);
  app.post("/api/test/changestatus",controller.changeStatus);
  app.post("/api/test/checkblocked",controller.checkBlocked);
  app.post("/api/test/uploadimg",controller.uploadimg);
  app.get("/api/test/all", controller.allAccess);
  app.post("/api/test/hideapps",controller.hideapps);
  app.get("/api/test/alluser",controller.allUsers);
  app.get("/api/test/getwhats",controller.sendwhats);
  app.get("/api/test/color",controller.getColor);
  app.post("/api/test/deletewhats",controller.deletewhats);
  app.post("/api/test/changepwd",controller.changePassword);
  app.post("/api/test/changecolor",controller.setColor);
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.post("/api/test/changemail",controller.changemail);
  app.get("/api/test/mod",[authJwt.verifyToken, authJwt.isModerator],controller.moderatorBoard);
  app.get("/api/test/getapps",controller.getApps);
  app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);
  app.get("/api/test/getPiedata",controller.piechartCount);
  app.get("/api/test/getcount",controller.Count);
};

const { authJwt } = require("../middlewares");
const controller = require("../controllers/comment.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/all", controller.test);
  app.post("/api/insert", controller.insert);
  app.post("/api/view", controller.view);
  app.post("/api/delete", controller.delete);
  app.post("/api/update", controller.update);
  app.post("/api/count", controller.count);
  app.post("/api/archive", controller.archive);
  app.post("/api/restore", controller.restore);
  app.post("/api/archiveOne", controller.archiveOne);
  app.post("/api/restoreOne", controller.restoreOne);
  // app.get("/api/user", [authJwt.verifyToken], controller.userBoard);

  // app.get(
  //   "/api/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};
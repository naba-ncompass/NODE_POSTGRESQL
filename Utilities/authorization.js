// const jwt = require("jsonwebtoken");
// const config = require("../Config/config");
// const responsehandler = require("./response_handler")

// function verifyToken(req, res, next){
//   try {
//     token = req.rawHeaders[1].split(" ")[1] || req.headers["access_token"];
//     if (!token) {
//       return res.status(401).json(responsehandler.makeErrorResponse("A token is required for authentication"));   // 401 stands for unauthentication
//     }
//   } catch (err) {
//     return res.status(401).json(responsehandler.makeErrorResponse(err.name));
//   }
//   return next();
// };

// function getDecodedPh(req,res){
//   const token = req.rawHeaders[1].split(" ")[1] || req.headers["access_token"];
//   decoded = jwt.verify(token, config.token);
//   return decoded.PHONE_NO;

// }


// module.exports =  {
//   verifyToken,
//   getDecodedPh
// };

const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  define: {
    timestamps: false
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.uc3 = require("./db")(sequelize, Sequelize);

module.exports = db;











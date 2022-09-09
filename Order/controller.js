// const executor = require("../Utilities/db");
// const config = require("../Config/config");
// const errorHandle = require('../Utilities/error_handler')
// const responsehandler = require("../Utilities/response_handler");
// const auth = require('../Utilities/authorization');
// const md5 = require("md5");
// const jwt = require('jsonwebtoken')

// const readcustomer = async (req, res, next) => {
//     try {
//         executor.connection.query(`select * from customer`, (err, res) => {
//             if(!err)
//             {
//                 console.log(res.rows);
//             }else{
//                 console.log(err.message);
//             }
//             client.end()
//         })
//         return res.status(200).json(responsehandler.makeResponse("query successful!!", result));
//     }
//     catch (err) {
//         let errorInstance = errorHandle.errorHandle(500, "Internal server error", err)
//         next(errorInstance)
//     }
// };

// const readcustomerid = async (req, res, next) => {
//     try {
//         let decoded = auth.getDecodedPh(req,res);
//         const query = `select customer.CUST_NAME,customer.CUST_CITY,customer.PHONE_NO from customer where customer.PHONE_NO = ${decoded} `;
//         const  result = await executor.executeQuery(query)
//         return res.status(200).json(responsehandler.makeResponse("query successful!!", result));
//     }
//     catch (err) {
//         let errorInstance = errorHandle.errorHandle(500, "Internal server error", err)
//         next(errorInstance)
//     }
// };

// const readordersid = async (req, res, next) => {
//     try {
//         let decoded = auth.getDecodedPh(req,res);
//         const  query = `select customer.CUST_CODE from customer where customer.PHONE_NO =${decoded} `;
//         const  result = await executor.executeQuery(query)
//         console.log(result[0].CUST_CODE)
//         let CUST_CODE = result[0].CUST_CODE;
//         const query2 = `select orders.ORDER_NUM, orders.AMOUNT, orders.ORDER_DATE from orders where orders.CUST_CODE = '${CUST_CODE}' `;
//         console.log(query2)
//         const  result2 = await executor.executeQuery(query2)
//         return res.status(200).json(responsehandler.makeResponse("query successful!!", result2));
//     }
//     catch (err) {
//         return res.status(500).json(responsehandler.makeErrorResponse("Internal server error ", err.message));

//     }
// };

// const placeorder = async (req, res) => {
//     try {
//         let decoded = auth.getDecodedPh(req,res);
//         const  query = `select customer.CUST_CODE from customer where customer.PHONE_NO =${decoded} `;
//         const  result = await executor.executeQuery(query)
//         console.log(result[0].CUST_CODE)
//         let ORDER_NUM = req.body.ORDER_NUM;
//         let AGENT_CODE = req.body.AGENT_CODE;
//         let CUST_CODE = result[0].CUST_CODE;
//         let AMOUNT = req.body.AMOUNT;
//         let ORDER_DATE = req.body.ORDER_DATE;
//         const inputData = [ORDER_NUM,AGENT_CODE, AMOUNT, ORDER_DATE];
//         // const inputData = [PHONE_NO];
//         const  query2 = `insert into orders (ORDER_NUM,CUST_CODE,AGENT_CODE,AMOUNT,ORDER_DATE) VALUES (?,'${CUST_CODE}',?,?,?) `;
//         console.log(query2)
//         const  result2 = await executor.executeQuery(query2, inputData)
//         console.log(query2)
//         return res.status(200).json(responsehandler.makeResponse("PLACED AN ORDER sucessfully"));
//     } catch (error) {
//         return res.status(500).json(responsehandler.makeErrorResponse("error while inserting Customer data", error.message));
//     }
// };

// const signupcustomer = async (req, res) => {
//     try {
//         const  CUST_CODE = req.body.CUST_CODE;
//         const  CUST_NAME = req.body.CUST_NAME;
//         const  CUST_CITY = req.body.CUST_CITY;
//         const  PHONE_NO = req.body.PHONE_NO;
//         const  PASSWORD= req.body.PASSWORD;
//         const  passwordDigit = md5(PASSWORD);
//         const  AGENT_CODE = req.body.AGENT_CODE;
//         const  inputData = [[[CUST_CODE, CUST_NAME, CUST_CITY, PHONE_NO, passwordDigit,AGENT_CODE]]];
//         const  query = `insert into customer(CUST_CODE, CUST_NAME, CUST_CITY, PHONE_NO, PASSWORD, AGENT_CODE) values ?`;
//         const  result = await executor.executeQuery(query, inputData)
//         const tokens = jwt.sign(
//             { PHONE_NO },
//             config.token,
//             {
//                 expiresIn: "5s",
//             }
//         );
//         return res.status(200).json(responsehandler.makeResponse("signup sucessfull", tokens));

//     } catch (error) {
//         return res.status(500).json(responsehandler.makeErrorResponse("error while inserting Customer data", error.message));
//     }
// };

// const updatecustomerdetail = async (req, res) => {
//     try {
//         let col = req.body.col;
//         let detail = req.body['detail'];
//         let decoded = auth.getDecodedPh(req,res);
//         const inputData = [[detail],];
//         const  query = `update customer set ${col} = '${detail}' where customer.PHONE_NO = ${decoded} ; `
//         const  result = await executor.executeQuery(query, inputData[0])
//         return res.status(200).json(responsehandler.makeResponse(" Details of the customer is Updated",result));
//     } catch (error) {
//         return res.status(500).json(responsehandler.makeErrorResponse("error while updating Customer data", error.message));
//     }
// };

// const deletecustomer = async (req, res) => {
//     try {
//         let decoded = auth.getDecodedPh(req,res);
//         const  query = `delete from customer where PHONE_NO = ${decoded} `;
//         result = await executor.executeQuery(query)
//         return res.status(200).json(responsehandler.makeResponse(result.affectedRows + " rows affected"));
//     } catch (error) {
//         return res.status(500).json(responsehandler.makeErrorResponse("error while deleting Customer data", error.message));
//     }
// };

// const signincustomer = async (req, res) => {
//     try {
//         //console.log(req.body)
//         const  PHONE_NO = req.body.PHONE_NO;
//         const  PASSWORD = req.body.PASSWORD;
//         const  passwordDigit = md5(PASSWORD);
//         const inputData = [PHONE_NO];
//         if (!(PHONE_NO && PASSWORD)) {
//             res.status(400).json(responsehandler.makeErrorResponse("PHONE NO OR PASSWORD IS MISSING", error.message));
//         }
//         else if (PHONE_NO && passwordDigit) {
//             const  query = `SELECT password from customer WHERE PHONE_NO = ?`;
//             let result = await executor.executeQuery(query, inputData)
//             if (Object.keys(result).length == 0) {
//                 errorCode = 403;
//                 throw new Error("username not valid");
//             } else {
//                 if (passwordDigit == result[0].password) {
//                     const tokens = jwt.sign(
//                         { PHONE_NO },
//                         config.token,
//                         {
//                             expiresIn: "30m",
//                         }
//                     );
//                     return res.status(200).json(responsehandler.makeResponse("signed in sucessfull", tokens));
//                 }
//                 else {
//                     throw new Error("password not valid");
//                 }
//             }
//         }
//         else {
//             return res.status(500).json(responsehandler.makeErrorResponse("error while signing in Customer data", error.message));
//         }
//     } catch (error) {
//         return res.status(500).json(responsehandler.makeErrorResponse("error while signing in Customer data", error.message));
//     }
// };

// module.exports = {
//     readcustomer,
//     readcustomerid,
//     placeorder,
//     signupcustomer,
//     updatecustomerdetail,
//     deletecustomer,
//     signincustomer,
//     readordersid
// };

const db = require("../Utilities/authorization");
const uc3Table = db.uc3;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    const uc3 = {
      time: req.body.time,
      device: req.body.device,
      consumption: req.body.consumption
    };
    uc3Table.create(uc3)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the uc3."
        });
      });
};

exports.findAll = (req, res) => {
    uc3Table.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving uc3."
        });
      });
};


exports.deleteAll = (req, res) => {
    uc3Table.destroy({
      where: {},
      truncate: true
    })
      .then(nums => {
        res.send({ message: `${nums} uc3 were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all uc3."
        });
      });
};


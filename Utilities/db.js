// const pg = require('pg');
// const config = require('../Config/config');
// const responsehandler = require("../Utilities/response_handler");

// async function connection() {
//     return new Promise(function (resolve, reject) {
//         const client = new Client({
//             host: 'localhost',
//             user: 'postgres',
//             port: 5000,
//             password: 'Naba@2001',
//             database: 'nodecrud',
//           })
//           client.connect();
//     });
// }

// module.exports = {
//     connection
// };

module.exports = (sequelize, Sequelize) => {
    const uc3 = sequelize.define("uc3",{
        // timestamps: false,
        time: {
        type: Sequelize.STRING
      },
      device: {
        type: Sequelize.STRING
      },
      consumption: {
        type: Sequelize.FLOAT 
      }
    //   ,
    //   createdAt: false,
    //     updatedAt:false
     
    });
    uc3.removeAttribute('id');

    return uc3;
  };
  
// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const controller = require('./controller');
// const authorization = require('../Utilities/authorization');

// router.use(bodyParser.json());
// router.use(express.static('public'));

// // get all orders
// router.get('/read',   controller.create);



// module.exports = router;

module.exports = app => {
    const controller = require("./controller");
    const validator = require('../trail')
    var router = require("express").Router();
  
    // Create a new uce
    router.post("/insert",validator.Post, controller.create);
    router.get("/read", controller.findAll);
    router.delete("/deleteall", controller.deleteAll);
    
    app.use("/", router);
  };
  
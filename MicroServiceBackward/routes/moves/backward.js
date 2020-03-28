var express = require('express');
var router = express.Router();
var engineRouter = require('../../models/engine');
/* GET contact listing. */
router.get('/', (req, res, next) => {
   var opResult = engineRouter.fnChangeDirection("backward");
   if (typeof(opResult) == "object"){
     if (opResult.hasOwnProperty("status") && opResult.hasOwnProperty("message")){
       res.setHeader('Content-Type', 'application/json');
       res.json( {'status' : ((opResult.status == "OK")? 'OK' :'Fail'), 'action': 'Moving Remote Car', 'message': opResult.message });
     }
   }
 });

module.exports = router;

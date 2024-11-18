var express = require('express');
var router = express.Router();

var empList = [];
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/post', function(req, req, next)
{
  var empList = new Person(req.body.name, req.body.hours);
  empList.push(emp);
  res.send(req);
})

module.exports = router;

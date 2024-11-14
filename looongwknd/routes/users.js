var express = require('express');
var router = express.Router();

var personList = [];
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/post', function(req, req, next)
{
  var person = new Person(req.body.username, req.body.password);
  personList.push(person);
  res.send(req);
})

module.exports = router;

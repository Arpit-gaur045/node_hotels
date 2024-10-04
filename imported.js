const exported=require('./exported')

console.log(exported.ans);

console.log(exported.add(7,3))

//--------------------------------
var _ = require('lodash');

var data=['person','person',1,2,1,2,'name','2'];
var filter=_.uniq(data);
console.log(filter);
var moment = require('moment');

/*
var date = new Date();
var months = ['Ene', 'Feb'];
console.log(date.getMonth());
*/

/*
var date = moment();
date.add(100, 'year').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));

*/
var timestamp = moment().valueOf();
console.log(timestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
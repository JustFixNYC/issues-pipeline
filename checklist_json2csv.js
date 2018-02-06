let checklist = require('./checklist.json').checklist;

let formatted = {};

for(area in checklist) {

  for(issue in checklist[area]) {

    let key = 'checklist.' + area + '.' + issue;
    let value = checklist[area][issue];

    if(value.charAt(0) == '@') {
      value = formatted[value.substring(2)];
    }

    formatted[key] = value;

    // read to stdout or render as csv here
    console.log(key + ' ' + value);



  }
}

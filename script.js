//daily working hours is in.... hour
//teachers list is in ...teacher
//class room names are in ...rooms

function teachers(name) {
  this.name = name;
  this.avail = [
    [true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true],
  ];
}

function teacherAvail(avail, i, j) {
  return avail[i][j];
}
t = new teachers("samyan");
console.log(t.name);

//daily working hours is in.... hour
//teachers list is in ...teacher
//class room names are in ...rooms
// course names are in coursesNames
//lectures with weekly ch like 1+1+1,2+2
w_days = 5;
w_hours = 8;
teacher = ["samyan", "atif", "talia", "tauqeer", "rubina"];
m = teacher.length;
rooms = ["1.1", "1.2"];
n = rooms.length;
coursesNames = ["samyan", "atif", "talia", "tauqeer", "rubina"];
k = coursesNames.length;
console.log(k);
lectures = ["2+1", "3+1", "1+1+1", "2+2", "3"];
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

function course(name, teach, code, classes, meetTimes, pointer) {
  this.name = name;
  this.teach = teach;
  this.code = code;
  this.classes = classes;
  this.meetTimes = meetTimes;
  this.pointer = pointer;
}

schedule = [
  ["none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
];


function generate() {
  t_name;
  c_name;
  current_subj = 0; //to loop through all subjects
  current_teach = 0;
  day = -1;
  ch = 0;
  credit_h = true;
  classes = total_classes; //Locha
  hour;
  room = 0;
  if (total_classes == 0) {
    return;

    for (i = 0; i < w_hours; i++) {
      if (total_classes > 0) {
        if (w_hours == 0) {
          day++;
        }
        if (classes == 0) {
          return;
        }
        //.............need to rename some names.....
        if (credit_h) {
          ch = c[current_subj].getCreditHour();
          credit_h = false;
        }
        if (hour + ch > w_hours) continue;

        if (hour == 4 || (hour < 4 && ch + hour > 4)) continue;

        c_name = c[current_subj].name;
        t_name = c[current_subj].teach;
        current_teach = c[current_subj].getTeacher(t_name);
        t_name = t[current_teach].name;

        if (ch > 0 && t[current_teach].ifavail(day, hour)) {
          sch[day][hour] = c[current_subj].name;
          t[current_teach].avail[day][hour] = false;
          ch--;
        } else {
          classes--;
          if (current_subj < k - 1) current_subj++;
          else {
            current_subj = 0;
          }
          credit_h = true;
          hour--;
        }
      }
    }
  }
}

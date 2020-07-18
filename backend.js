//daily working hours is in.... hour
//teachers list is in ...teacher
//class room names are in ...rooms
// course names are in coursesNames
//lectures with weekly ch like 1+1+1,2+2
total_classes = 0;
w_days = 5;
w_hours = 8;
teacher = ["samyan", "atif", "talia", "tauqeer", "rubina"];
m = teacher.length;
rooms = ["1.1", "1.2"];
n = rooms.length;
coursesNames = ["aoa", "db", "os", "taf", "mc"];
k = coursesNames.length;
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

t = [];
c = 0;
while (c < m) {
  a = new teachers(teacher[c]);
  t.push(a);
  c++;
}

function getTeacherInd(name) {
  tr = 0;
  while (t_name != t[tr].name) tr++;
  return tr;
}

function course(name, teach, classes) {
  this.name = name;
  this.teach = teach;
  this.classes = classes;
  this.meetTimes = 0;
}

c = 0;
courses = [];
while (c < k) {
  a = new course(coursesNames[c], teacher[c], lectures[c]);
  courses.push(a);
  for (let index = 0; index < a.classes.length; index += 2) {
    a.meetTimes += parseInt(a.classes[index]);
  }
  total_classes += a.meetTimes;
  c++;
}
schedule = [
  ["none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
];

function generate() {
  t_name = "";
  c_name = "";
  current_subj = 0; //to loop through all subjects
  current_teach = 0;
  day = -1;
  ch = 0;
  credit_h = true;
  classes = total_classes;
  hour = 0;
  room = 0;
  pointer = 0;

  if (total_classes == 0) {
    return;
  }
  while (classes > 0) {
    day++;
    for (hour = 0; hour < w_hours; hour++) {
      if (credit_h == true) {
        if (pointer < courses[current_subj].classes.length) {
          ch = courses[current_subj].classes[pointer];
          pointer += 2;
        } else {
          ch = 0;
        }
        credit_h = false;
      }
      if (hour + ch > w_hours) {
        continue;
      }

      if (hour == 4 || (hour < 4 && ch + hour > 4)) {
        continue;
      }

      c_name = courses[current_subj].name;
      t_name = courses[current_subj].teach;
      current_teach = courses[current_subj].getTeacherInd(t_name);
      t_name = t[current_teach].name;

      if (ch > 0 && t[current_teach].avail[day][hour]) {
        schedule[day][hour] = courses[current_subj].name;
        t[current_teach].avail[day][hour] = false;
        ch--;
        continue;
      } else if (classes == 0) {
        console.table(schedule);
        return;
      } else {
        classes--;
        if (ch > 0) {
          // && courses[current_subj].pointer == c[current_subj].meetTimes) {
          //           classes++;
          //            c[0].pointer;
        } else if (current_subj < k - 1) {
          current_subj++;
        } else if (current_subj == k - 1) {
          current_subj = 0;
        }
        credit_h = true;
        hour--;
      }

      //handle diff classes of same subject
    }

    if (day == w_days - 1) {
      console.table(schedule);

      day = -1;
      hour = 0;
      schedule = [
        ["none", "none", "none", "none", "none", "none", "none"],
        ["none", "none", "none", "none", "none", "none", "none"],
        ["none", "none", "none", "none", "none", "none", "none"],
        ["none", "none", "none", "none", "none", "none", "none"],
        ["none", "none", "none", "none", "none", "none", "none"],
      ];
    }
  }
}

generate();

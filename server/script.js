//daily working hours is in.... hour
//teachers list is in ...teacher
//class room names are in ...rooms
// course names are in coursesNames
//lectures with weekly ch like 1+1+1,2+2z
break_period = -1;
total_classes = 0;
w_days = 5;
w_hours = 2;
teacher = ["talia", "tauqeer", "aoa", "mc", "db", "dbase"];
m = teacher.length;
rooms = ["1.1", "1.2", "1.3", "1.4"];
n = rooms.length;
coursesNames = ["os", "taf", "aoa", "mc", "db", "dbase"];
k = coursesNames.length;
lectures = [
  "2+1+2+1+2+1+0",
  "1+2+1+2+1+2+0",
  "2+2+2+0+0+0+0",
  "1+1+1+1+1+1+1",
  "1+1+1+1+1+1+0",
  "2+1+0+0+0+0+0",
];
function teachers(name) {
  this.name = name;
  this.avail = [
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
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
  while (name != t[tr].name) tr++;
  return tr;
}

function getCreditHour(ml) {
  courses[ml].lectures--;
}

function course(name, teach, classes) {
  this.name = name;
  this.teach = teach;
  this.classes = classes;
  this.meetTimes = 0;
  this.pointer = 0;
  this.lectures = 0;
  this.classess = [];
}

c = 0;
courses = [];
while (c < k) {
  a = new course(coursesNames[c], teacher[c], lectures[c]);
  for (let index = 0; index < a.classes.length; index += 2) {
    a.meetTimes += parseInt(a.classes[index]);
    a.classess.push(parseInt(a.classes[index]));
    a.lectures++;
  }
  courses.push(a);
  total_classes += a.meetTimes;
  c++;
}
schedule = [
  ["none", "none", "none", "none", "break", "none", "none", "none"],
  ["none", "none", "none", "none", "break", "none", "none", "none"],
  ["none", "none", "none", "none", "break", "none", "none", "none"],
  ["none", "none", "none", "none", "break", "none", "none", "none"],
  ["none", "none", "none", "none", "break", "none", "none", "none"],
];

function validateExit() {
  flag = true;
  for (i = 0; i < k; i++)
    if (courses[i].pointer < courses[i].lectures) {
      flag = false;
    }
  return flag;
}

function getCreditHour(current_subj) {
  if (courses[current_subj].pointer < courses[current_subj].lectures) {
    return courses[current_subj].classess[courses[current_subj].pointer++];
  } else {
    return 0;
  }
}

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
        ch = getCreditHour(current_subj);
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
      current_teach = getTeacherInd(t_name);
      t_name = t[current_teach].name;

      if (ch > 0 && t[current_teach].avail[day][hour] == true) {
        schedule[day][hour] = courses[current_subj].name;
        t[current_teach].avail[day][hour] = false;
        ch--;
        continue;
      } else if (classes == 0) {
        console.table(schedule);
        var table = "";
        var rows = 5;
        var cols = 8;
        table +=
          "<tr><th>8-9</th><th>9-10</th><th>10-11</th><th>11-12</th><th>12-1</th><th>1-2</th><th>2-3</th><th>3-4</th></tr >";
        for (var r = 0; r < rows; r++) {
          table += "<tr>";
          for (let index = 0; index < cols; index++) {
            table += "<td>" + schedule[r][index] + "</td>";
          }
          table += "</tr>";
        }
        document.write("<table>" + table + "</table>");
        if (validateExit()) {
          return;
        } else {
          classes++;
          current_subj = 0;
          continue;
        }
      } else {
        classes--;
        if (
          ch > 0 &&
          courses[current_subj].pointer == courses[current_subj].lectures
        ) {
          classes++;
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
      var table = "";
      var rows = 5;
      var cols = 8;
      table +=
        "<tr><th>8-9</th><th>9-10</th><th>10-11</th><th>11-12</th><th>12-1</th><th>1-2</th><th>2-3</th><th>3-4</th></tr >";
      for (var r = 0; r < rows; r++) {
        table += "<tr>";
        for (let index = 0; index < cols; index++) {
          table += "<td>" + schedule[r][index] + "</td>";
        }
        table += "</tr>";
      }
      document.write("<table>" + table + "</table>");
      document.write("</br>");
      document.write("</br>");
      document.write("</br>");
      day = -1;
      hour = 0;
      schedule = [
        ["none", "none", "none", "none", "break", "none", "none", "none"],
        ["none", "none", "none", "none", "break", "none", "none", "none"],
        ["none", "none", "none", "none", "break", "none", "none", "none"],
        ["none", "none", "none", "none", "break", "none", "none", "none"],
        ["none", "none", "none", "none", "break", "none", "none", "none"],
      ];
    }
  }
}

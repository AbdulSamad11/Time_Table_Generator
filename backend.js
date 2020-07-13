w_hours = 8;
w_days = 5;
k = 2;
n = 2;
m = 2;
teachers_list = [];
teachers_list.push("samyan");
teachers_list.push("atif");
courses_list = [];
courses_list.push("aoa");
courses_list.push("db");

classes_list = [];
classes_list.push(3);
classes_list.push(2);
classes_list.push(1);
classes_list.push(1);

function teachers(name) {
  this.name = name;
  avail = [
    [true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true],
  ];
}
t = [];
teacher = new teachers("samyan");
t.push(teacher);
teacher = new teachers("atif");
t.push(teacher);


function course(name, teach, code, classes, meetTimes, pointer) {
  this.name = name;
  this.teach = teach;
  this.code = code;
  this.classes = classes;
  this.meetTimes = meetTimes;
  this.pointer = pointer;
}
courses = [];
a = new course("aoa", t[0].name, 0, 2, 2, 0);
courses.push(a);
a = new course("db", t[1].name, 0, 2, 2, 0);
courses.push(a);


schedule = [
  ["none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none"],
];

//need to test
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

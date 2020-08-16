//daily working hours is in.... hour
//teachers list is in ...teacher
//class room names are in ...rooms
// course names are in coursesNames
//break period is in breakk
//import { exit } from "process";

//lectures with weekly ch like 1+1+1,2+2z
// let break_period = -1;
// w_hours = 8;
w_hours = parseInt(localStorage.getItem("w_hour"));
let break_period = parseInt(localStorage.getItem("breakk")) - 1;
total_classes = 0;
w_days = 5;
// teacher = ["talia", "tauqeer", "samyan", "rubina", "atif", "awais"];
teacher = localStorage.getItem("teacher").split(",");
rooms = localStorage.getItem("roomNames").split(",");
courses = localStorage.getItem("course");
// coursesNames = ["os", "taf", "aoa", "mc", "db", "dbase"];
coursesNames = courses.split(",");

m = teacher.length;
n = rooms.length;
k = coursesNames.length;

//if rooms zero
if (n == 0) {
  exit(0);
}

//...........................will change as already implemented in breakk
// break_period = Math.floor(w_hours / 2);

//set maxed from left
let maxPeriod = break_period;

//set maxed from right
let maxed = w_hours - break_period - 1;
if (maxed > maxPeriod) maxPeriod = maxed;

lectures = [];
lectures = localStorage.getItem("lectures").split(",");

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

//setting tables
function Table() {
  this.sch = new Array(w_hours);
  for (let index = 0; index < w_days; index++) {
    this.sch[index] = new Array(w_days);
  }
  for (var i = 0; i < w_days; i++)
    for (var j = 0; j < w_hours; j++) {
      if (j != break_period) {
        this.sch[i][j] = "none";
      } else this.sch[i][j] = "break";
    }

  this.availSingleSlot = false;
  this.availMultipleSlots = false;
  this.availSingleDay = 0;
  this.availSingleHour = 0;
}

tab = new Array(n);
for (let index = 0; index < n; index++) {
  a = new Table();
  tab[index] = a;
}

function set(tabNo, day, hour, c_name) {
  tab[tabNo].sch[day][hour] = c_name;
}

function availSingle(tabNo, day, hour) {
  tab[tabNo].availSingleDay = day;
  tab[tabNo].availSingleHour = hour;
}

function ifAvailSingle(tabNo) {
  return tab[tabNo].availSingleSlot;
}

function setSingle(tabNo) {
  tab[tabNo].availSingleSlot = true;
}

function desetSingle(tabNo) {
  tab[tabNo].availSingleSlot = false;
}

function getSingleDay(tabNo) {
  return tab[tabNo].availSingleDay;
}

function getSingleHour(tabNo) {
  return tab[tabNo].availSingleHour;
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
let lecNo = 0;
courses = [];
while (c < k) {
  lecNo++;
  a = new course(coursesNames[c], teacher[c], lectures[c]);
  if (lecNo < localStorage.getItem("lectures").split(",").length + 1)
    aa = lectures[c].length;
  else aa = 0;
  // console.log(lectures[c].length);

  for (let index = 0; index < aa; index += 2) {
    a.meetTimes += parseInt(a.classes[index]);
    lecc = parseInt(a.classes[index]);
    if (lecc <= maxPeriod) a.classess.push(lecc);
    else {
    }
    a.lectures++;
  }
  courses.push(a);
  total_classes += a.meetTimes;
  // if (a.meetTimes == 0) {
  //   total_classes++;
  // }
  c++;
}
schedule = new Array(w_days);
for (let index = 0; index < w_days; index++) {
  schedule[index] = new Array(w_hours);
}

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

//for teacher
function ifAvail(current_teach, i, j, h) {
  for (let k = 0; k < h; k++) {
    if (t[current_teach].avail[i][j + k] == false) {
      return false;
    }
  }
  return true;
}
let allocated = 0;

function init() {
  for (var i = 0; i < w_days; i++)
    for (var j = 0; j < w_hours; j++) {
      if (j != break_period) {
        schedule[i][j] = "none";
      } else schedule[i][j] = "break";
    }
}
function show(tableNo, roomNo) {
  let showHour = localStorage.getItem("startHour");
  let table = "";
  table += "<tr>";
  for (let index = 0; index < w_hours; index++) {
    if (showHour == 13) {
      showHour = 1;
    }
    if (showHour + 1 == 13) {
      table += "<th>" + showHour++ + "-" + 1 + "</th>";
    } else table += "<th>" + showHour++ + "-" + showHour + "</th>";
  }
  table += "</tr >";

  //table += "<tr><th>8-9</th><th>9-10</th><th>10-11</th><th>11-12</th><th>12-1</th><th>1-2</th><th>2-3</th><th>3-4</th></tr >";
  for (let r = 0; r < w_days; r++) {
    table += "<tr>";
    for (let index = 0; index < w_hours; index++) {
      // table += "<td>" + schedule[r][index] + "</td>";
      table += "<td>" + tab[tableNo].sch[r][index] + "</td>";
    }
    table += "</tr>";
  }
  // console.log(tab[tableNo].sch);
  document.write("</br>");
  document.write("<center> <h3>ROOM--" + rooms[roomNo] + "</h3></center>");
  document.write("</br>");
  document.write("<table>" + table + "</table>");
  document.write("</br>");
  document.write("</br>");
  document.write("</br>");
  table = "";
}

function generate() {
  t_name = "";
  c_name = "";
  let current_subj = 0; //to loop through all subjects
  let current_teach = 0;
  let day = 0;
  let ch = 0;
  let credit_h = true;
  let classes = total_classes;
  let hour = 0;
  let room = 0;
  let availTrack = true;
  let track = [0, 0, 0];
  let trackIndex = 0;
  let roomNo = 0;
  let fill = false;
  let singles = [0, 0];
  let current = false;
  let tableNo = 0;
  let tracked = true;
  let loopHour = -1;
  let loopDay = -1;

  if (total_classes == 0) {
    return;
  }
  init();
  while (true) {
    for (hour = 0; hour < w_hours; hour++) {
      //validate break
      if (hour == break_period) {
        continue;
      }
      tracked = true;
      if (credit_h == true) {
        current = true;
        ch = getCreditHour(current_subj); //change
        if (ch == 0) {
          classes--;
          // if (current_subj == k - 1) current_subj = 0;
          // else {
          //   current_subj++;
          //   credit_h = true;
          //   hour--;
          //   continue
          // }
        }
        if (
          ch > 0 &&
          track[0] == ch &&
          ifAvail(current_teach, track[1], track[2], ch) == true &&
          schedule[track[1]][track[2]] == "none"
        ) {
          c_name = courses[current_subj].name;
          t_name = courses[current_subj].teach;
          current_teach = getTeacherInd(t_name);
          t_name = t[current_teach].name;
          let tempHour = track[2];
          while (ch > 0) {
            schedule[track[1]][tempHour] = courses[current_subj].name;

            set(tableNo, track[1], tempHour, c_name);
            t[current_teach].avail[track[1]][tempHour] = false;
            allocated++;
            tempHour++;
            classes--;
            ch--;
          }
          track[0] = 0;
          track[1] = 0;
          track[2] = 0;
          availTrack = true;
          trackIndex = 0;
          tracked = false;
        }

        if (tracked == true) {
          credit_h = false;

          if (ch == 1 && tableNo > 0 && ifAvailSingle(tableNo - 1)) {
            c_name = courses[current_subj].name;
            t_name = courses[current_subj].teach;
            current_teach = getTeacherInd(t_name);
            t_name = t[current_teach].name;
            let tempDay = getSingleDay(tableNo - 1);
            let tempHour = getSingleHour(tableNo - 1);
            if (ifAvail(current_teach, tempDay, tempHour, ch)) {
              set(tableNo - 1, tempDay, tempHour, c_name);
              desetSingle(tableNo - 1);
              t[current_teach].avail[tempDay][tempHour] = false;
              classes--;
              allocated++;
              ch--;
            } else fill = true;
          }
          if (ch == 1) {
            fill = true;
          }
        }
      }
      if (tracked == true) {
        tracked = false;
        if (hour < break_period && ch + hour > break_period) {
          if (4 - hour == 1) {
            singles[0] = day;
            singles[1] = hour;
          }
          if (availTrack || schedule[track[1]][track[2]] != "none") {
            track[0] = break_period - hour;
            track[1] = day;
            track[2] = hour;
            availTrack = false;
          }
          current = true;
          continue;
        }

        if (hour + ch > w_hours && day == w_days - 1) {
          courses[current_subj].pointer--;
          if (current_subj < k - 1) {
            current_subj++;
          } else if (current_subj == k - 1) {
            current_subj = 0;
          }
          credit_h = true;
          hour--;
          continue;
        }
        //credit hour should not cross working hours
        if (hour + ch > w_hours) {
          if (availTrack == true || schedule[track[1]][track[2]] != "none") {
            track[0] = w_hours - hour;
            track[1] = day;
            track[2] = hour;
          }
          availTrack = false;
          current = true;
          continue;
        }

        c_name = courses[current_subj].name;
        t_name = courses[current_subj].teach;
        current_teach = getTeacherInd(t_name);
        t_name = t[current_teach].name;

        if (fill == true && ch == 1) {
          for (let i = 0; i <= day; i++)
            for (let j = 0; j < w_hours; j++) {
              if (i == day && j == hour) {
                j = 20;
                i = 20;
                continue;
              }
              if (
                schedule[i][j] == "none" &&
                (schedule[i][j - 1] != "none" ||
                  schedule[i][j + 1] != "none" ||
                  schedule[singles[0]][singles[1]] != "none")
              ) {
                singles[0] = i;
                singles[1] = j;
              }
            }
        }

        if (
          current == true &&
          fill == true &&
          singles[1] > 0 &&
          c_name != schedule[singles[0]][singles[1] - 1] &&
          ch == 1 &&
          schedule[singles[0]][singles[1]] == "none"
        ) {
          schedule[singles[0]][singles[1]] = courses[current_subj].name;
          set(tableNo, singles[0], singles[1], c_name);
          allocated++;
          t[current_teach].avail[singles[0]][singles[1]] = false;
          classes--;
          ch--;
          fill = false;
          singles[0] = 0;
          singles[1] = 0;
        }
      }
      tracked = true;

      //default
      if (ch > 0 && ifAvail(current_teach, day, hour, ch) == true) {
        current = false;
        schedule[day][hour] = courses[current_subj].name;
        set(tableNo, day, hour, c_name);
        t[current_teach].avail[day][hour] = false;
        ch--;
        classes--;
        allocated++;
        continue;
      } else if (ch > 0 && !ifAvail(current_teach, day, hour, ch)) {
        courses[current_subj].pointer--;
        if (current_subj < k - 1) {
          current_subj++;
        } else if (current_subj == k - 1) {
          current_subj = 0;
        }
        credit_h = true;
        hour--;
        continue;
      } else if (classes <= 0) {
        //  console.table(schedule);
        // var table = "";
        // var rows = 5;
        // var cols = 8;
        // table +=
        //   "<tr><th>8-9</th><th>9-10</th><th>10-11</th><th>11-12</th><th>12-1</th><th>1-2</th><th>2-3</th><th>3-4</th></tr >";
        // for (var r = 0; r < rows; r++) {
        //   table += "<tr>";
        //   for (let index = 0; index < cols; index++) {
        //     table += "<td>" + schedule[r][index] + "</td>";
        //   }
        //   table += "</tr>";
        // }
        // document.write("<table>" + table + "</table>");
        if (roomNo >= n) {
          // roomNo++;
          show(tableNo, roomNo++);
          console.table(schedule);
          return;
        }
        if (validateExit()) {
          // roomNo++;
          console.table(schedule);
          // console.log("nice")
          console.log(allocated);
          show(tableNo, roomNo++);

          return;
        } else {
          classes = classes + k;
          // current_subj = 0;
          if (loopHour == hour && loopDay == 2 * day) {
            hour++;
          }
          loopHour = hour;
          loopDay = day;
          hour--;
          continue;
        }
      }
      // else {
      //   classes++;
      //   current_subj = 0;
      //   continue;
      // }
      else {
        if (
          ch > 0 &&
          courses[current_subj].pointer == courses[current_subj].lectures
        ) {
          classes = classes + k;
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
      if (roomNo == n) {
        console.table(schedule);

        show(tableNo, roomNo++);
        return;
      }

      console.table(schedule);

      show(tableNo, roomNo++);
      day = 0;
      hour = 0;
      if (schedule[singles[0]][singles[1]] == "none") {
        availSingle(tableNo, singles[0], singles[1]);
        setSingle(tableNo);
      }
      singles[0] = 0;
      singles[1] = 0;
      track[0] = 0;
      track[1] = 0;
      track[2] = 0;
      tableNo++;
      init();
    } else day++;
  }
}

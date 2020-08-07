teacher = [];
function getTeacher() {
  t = document.getElementById("myInput").value;
  teacher.push(t);
  localStorage.setItem("teacher", teacher);
  //  document.getElementById("name").innerHTML = teacher;
  document.getElementById("myInput").value = "";
}

function showTeacherr() {
  teacher = localStorage.getItem("teacher").split(",");
  fLen = teacher.length;

  text = "<ul>";
  for (i = 0; i < fLen; i++) {
    text += "<li>" + teacher[i] + "</li>";
  }
  text += "</ul>";

  document.getElementById("name").innerHTML = text;
}

function resetTeacher() {
  teacher=[];
  localStorage.removeItem("teacher");
  document.getElementById("name").innerHTML = "";
  showTeacherr();
  // showCourse();
}

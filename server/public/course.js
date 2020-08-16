coursesNames = [];
lectures = [];
teacher = [];
function addCourse() {
  crc = document.getElementById("crsName").value;
  coursesNames.push(crc);
  localStorage.setItem("course", coursesNames);
  document.getElementById("crsName").value = "";

  lecc = document.getElementById("lec").value;
  lectures.push(lecc);
  localStorage.setItem("lectures", lectures);
  document.getElementById("lec").value = "";

  t = document.getElementById("tchr").value;
  teacher.push(t);
  localStorage.setItem("teacher", teacher);
  document.getElementById("tchr").value = "";
}

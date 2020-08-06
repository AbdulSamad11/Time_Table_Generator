coursesNames = [];
// coursesNames = [];
function getCourse() {
  Name = document.getElementById("myInput").value;
  coursesNames.push(Name);
  localStorage.setItem("course", coursesNames);
  // document.getElementById("name").innerHTML = coursesNames;
  document.getElementById("myInput").value = "";
}

lectures = [];
function getLectures() {
  Name = document.getElementById("myInput1").value;
  lectures.push(Name);
  localStorage.setItem("lectures", lectures);
  // document.getElementById("name1").innerHTML = lectures;
  document.getElementById("myInput1").value = "";
}

function showCourse() {
  coursesNames = localStorage.getItem("course").split(",");
  fLen = coursesNames.length;
  text = "<ul>";
  for (i = 0; i < fLen; i++) {
    text += "<li>" + coursesNames[i] + "</li>";
  }
  text += "</ul>";
  console.log(lectures);
  document.getElementById("name").innerHTML = text;
}
function resetCourse() {
  localStorage.removeItem("course");
  document.getElementById("name").innerHTML = "";
  // showCourse();
}

function showLectures() {
  lectures = localStorage.getItem("lectures").split(",");
  fLen = lectures.length;
  text = "<ul>";
  for (i = 0; i < fLen; i++) {
    text += "<li>" + lectures[i] + "</li>";
  }
  text += "</ul>";

  document.getElementById("name1").innerHTML = text;
}
function resetLectures() {
  lectures = "";
  localStorage.setItem("lectures", lectures);
  document.getElementById("name1").innerHTML = "";
  showCourse();
}

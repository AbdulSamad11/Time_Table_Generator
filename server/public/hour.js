let w_hour = 0;
// let w_hour = 0;
function getHour() {
  w_hour = document.getElementById("myInput").value;
  document.getElementById("break").value = Math.floor(w_hour / 2);
  document.getElementById("name").innerHTML =
    "Daily working hours added: " + w_hour;
  localStorage.setItem("w_hour", w_hour);
  // document.getElementById("myInput").value = "";
}
let breakk;
// let breakk = -1;
function getBreak() {
  breakk = document.getElementById("break").value;
  localStorage.setItem("breakk", breakk);
  document.getElementById("write").innerHTML = "Break Period is: " + breakk;
  // document.getElementById("break").value = "";
}
// document.write(hour + 10);
function getStart() {
  startHour = document.getElementById("startHour").value;
  localStorage.setItem("startHour", startHour);
  document.getElementById("writeHour").innerHTML =
    "Working Hour will start from: " + startHour;
}
function showHour() {
  document.getElementById("name").innerHTML = localStorage.getItem("w_hour");
}
function resetHour() {
  localStorage.removeItem("w_hour");
  document.getElementById("name").innerHTML = "";
  showHour();
}
function showBreak() {
  document.getElementById("write").innerHTML = localStorage.getItem("breakk");
}
function resetBreak() {
  localStorage.removeItem("breakk");
  document.getElementById("write").innerHTML = "";
  showBreak();
}
function showStart() {
  document.getElementById("writeHour").innerHTML = localStorage.getItem("startHour");
}
function resetStart() {
  localStorage.removeItem("startHour");
  showStart();
}

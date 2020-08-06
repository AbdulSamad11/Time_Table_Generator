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

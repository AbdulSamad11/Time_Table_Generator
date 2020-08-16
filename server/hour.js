let w_hour = 0;
// let w_hour = 0;
function getHour() {
  w_hour = document.getElementById("wh").value;
  localStorage.setItem("w_hour", w_hour);
  document.getElementById("wh").value="";

  breakk = document.getElementById("br").value;
  localStorage.setItem("breakk", breakk);
  document.getElementById("br").value = "";

  let startHour = document.getElementById("strt").value;
  localStorage.setItem("startHour", startHour);
  document.getElementById("strt").value = "";
}
}

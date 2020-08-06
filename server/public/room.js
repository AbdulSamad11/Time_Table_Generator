let rooms = [];
function getRoom() {
  roomName = document.getElementById("myInput").value;
  rooms.push(roomName);
  localStorage.setItem("roomNames", rooms);
  document.getElementById("name").innerHTML = rooms;
  document.getElementById("myInput").value = "";
}


function showRooms() {
  rooms = localStorage.getItem("roomNames").split(",");
  fLen = rooms.length;
  text = "<ul>";
  for (i = 0; i < fLen; i++) {
    text += "<li>" + rooms[i] + "</li>";
  }
  text += "</ul>";

  document.getElementById("name").innerHTML = text;
}
function resetRooms() {
  rooms = "";
  localStorage.setItem("roomNames", rooms);
  document.getElementById("name").innerHTML = "";
  showCourse();
}

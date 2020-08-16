let rooms = [];
function getRoom() {
  roomName = document.getElementById("rmInput").value;
  rooms.push(roomName);
  localStorage.setItem("roomNames", rooms);
  document.getElementById("rmInput").value = "";
}


const dgram = require('dgram');

var socket;
const udp = setTimeout(function() {
  console.log("----SOCKET---- setup")

  const opts = { type: 'udp4', reuseAddr: true }
  socket = dgram.createSocket(opts);

  console.log("----SOCKET---- setup done")
}, 75)

function sendUdpCommand({ command, ipaddress, port }) {
  console.log("----SOCKET---- send udp")

  socket.send(command, 0, command.length, port, ipaddress, function(err, bytes) {
    console.log(`----SOCKET---- sent udp ${command}`)
    if (err) {
      node.error("udp : "+err, command);
    }
  });
}

module.exports = {
  socket,
  udp,
  sendUdpCommand
}
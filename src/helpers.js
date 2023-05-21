const dgram = require('dgram');
const net = require('net');

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

function sendTcpCommand({ command, ipaddress, port }) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    client.connect(port, ipaddress, function() {
      client.write(command + '\n');
    });
    
    client.on('data', function(data) {
      const body = data.toString('utf-8');
      console.log('Received: ' + body);
      client.destroy();
      return resolve(body);
    });

    client.on('error', function(err) {
      console.log('Connection errored');
      return reject(err);
    })
    
    client.on('close', function() {
      console.log('Connection closed');
      return reject("Closed");
    });
  });
}

module.exports = {
  socket,
  udp,
  sendUdpCommand,
  sendTcpCommand
}
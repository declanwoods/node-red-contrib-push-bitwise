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
      console.log(`Connected to ${ipaddress}:${port}`)
      client.write(command + '\r\n');
    });
    
    client.on('data', function(data) {
      const body = data.toString('utf-8');
      if (body.startsWith("bwr:")) {
        console.log('Received: ' + body);
        client.write('bwc:tcpclose:\r\n');
        client.destroy();
        return resolve(body)
      };
    });

    client.on('error', function(err) {
      console.log('Connection errored');
      return reject(err);
    })
    
    client.on('close', function() {
      return;
    });
  });
}

module.exports = {
  socket,
  udp,
  sendUdpCommand,
  sendTcpCommand
}
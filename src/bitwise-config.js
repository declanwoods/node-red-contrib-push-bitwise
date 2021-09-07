
module.exports = function(RED) {
  const dgram = require('dgram');

  function BitwiseConfigNode(config) {
    RED.nodes.createNode(this, config)

    node = this
    node.ipaddress = config.ipaddress
    node.port = config.port

    node.tout = setTimeout(function() {
      console.log(`startup`);
      const opts = { type: 'udp4', reuseAddr: true }
      const socket = dgram.createSocket(opts);

      node.on('input', function(msg, send, done) {
        const message = msg.command;
        console.log(`RECEIVED ${message}`);

        socket.send(message, 0, message.length, node.port, node.ipaddress, function(err, bytes) {
          console.log(`SENT ${message} ${bytes}`);
          if (err) {
            node.error("udp : "+err, msg);
          }
          message = null;
          nodeDone();
        });

        if (done) {
          done();
        }
      })

      node.on('close', function() {
        if (node.tout) { 
          clearTimeout(node.tout); 
        }

        try {
          socket.close();
        } catch (err) {}

        node.status({});
      })
    }, 75)
  }

  RED.nodes.registerType('bitwise-config', BitwiseConfigNode)
}
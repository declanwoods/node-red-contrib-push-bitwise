const { sendUdpCommand, sendTcpCommand } = require('./helpers')

module.exports = function(RED) {
  function BitwiseReadNode(config) {
    RED.nodes.createNode(this, config);
    const configNode = RED.nodes.getNode(config.confignode)

    this.on('input', function(msg, send, done) {
      const inputtype = config.inputtype;
      const input = msg.input || config.input;

      const ipaddress = configNode.ipaddress;
      const port = configNode.tcpport;
      const command = `bwc:get:${inputtype}:${input}:`;

      const response = sendTcpCommand({ ipaddress, port, command });

      send(response);

      if (done) {
        done()
      }
    });
  }

  RED.nodes.registerType("bitwise-read", BitwiseReadNode);
}
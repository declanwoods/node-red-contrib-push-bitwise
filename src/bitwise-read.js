const { sendUdpCommand, sendTcpCommand } = require('./helpers')

module.exports = function(RED) {
  function BitwiseReadNode(config) {
    RED.nodes.createNode(this, config);
    const configNode = RED.nodes.getNode(config.confignode)

    this.on('input', async function(msg, send, done) {
      const inputtype = config.inputtype;
      const input = msg.input || config.input;

      const ipaddress = configNode.ipaddress;
      const port = configNode.tcpport;
      const command = `bwc:get:${inputtype}:${input}:`;

      const response = await sendTcpCommand({ ipaddress, port, command });

      msg.payload = response
      send(msg);

      if (done) {
        done()
      }
    });
  }

  RED.nodes.registerType("bitwise-read", BitwiseReadNode);
}
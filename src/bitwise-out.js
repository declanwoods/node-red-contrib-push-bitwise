const { sendUdpCommand } = require('./helpers')

module.exports = function(RED) {
  function BitwiseOutNode(config) {
    RED.nodes.createNode(this, config);
    const configNode = RED.nodes.getNode(config.confignode)

    this.on('input', function(msg, send, done) {
      const outputtype = config.outputtype;
      const relay = msg.relay || config.relay;
      const state = msg.state || msg.duration || config.state;

      const ipaddress = configNode.ipaddress;
      const port = configNode.port;
      const command = `bwc:set:${outputtype}:${relay}:${state}:`;

      sendUdpCommand({ ipaddress, port, command })

      if (done) {
        done()
      }
    });
  }

  RED.nodes.registerType("bitwise-out", BitwiseOutNode);
}
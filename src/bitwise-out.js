const { sendUdpCommand } = require('./helpers')

module.exports = function(RED) {
  function BitwiseOutNode(config) {
    RED.nodes.createNode(this, config);
    const configNode = RED.nodes.getNode(config.confignode)

    this.on('input', function(msg, send, done) {
      const outputtype = config.outputtype;
      const output = msg.output || config.output;
      const state = msg.state || msg.duration || config.state;

      const ipaddress = configNode.ipaddress;
      const port = configNode.udpport;
      const command = `bwc:set:${outputtype}:${output}:${state}:`;

      sendUdpCommand({ ipaddress, port, command })

      if (done) {
        done()
      }
    });
  }

  RED.nodes.registerType("bitwise-out", BitwiseOutNode);
}
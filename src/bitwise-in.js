// const { sendUdpCommand } = require('./helpers')

module.exports = function(RED) {
  function BitwiseInNode(config) {
    RED.nodes.createNode(this, config);
    const configNode = RED.nodes.getNode(config.confignode)

    const outputtype = config.outputtype;
    const input = config.input;

    const ipaddress = configNode.ipaddress;
    const port = configNode.udpport;
    const command = `bwc:get:${outputtype}:${input}:`;
  }

  RED.nodes.registerType("bitwise-in", BitwiseInNode);
}
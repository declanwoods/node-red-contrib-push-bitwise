module.exports = function(RED) {
  function RelayOutNode(config) {
    RED.nodes.createNode(this, config);
    const configNode = RED.nodes.getNode(config.confignode)

    this.on('input', function(msg, send, done) {
      const relay = msg.relay || config.relay;
      const state = msg.state || config.state;

      const command = `bwc:set:relay:${relay}:${state}:`;

      console.log(`${command}`);

      configNode.send({ command })

      if (done) {
        done()
      }
    });
  }

  RED.nodes.registerType("bitwise-relay-out", RelayOutNode);
}

module.exports = function(RED) {
  function BitwiseConfigNode(config) {
    RED.nodes.createNode(this, config)

    node = this
    node.ipaddress = config.ipaddress
    node.port = config.port
  }

  RED.nodes.registerType('bitwise-config', BitwiseConfigNode)
}

module.exports = function(RED) {
  function BitwiseConfigNode(config) {
    RED.nodes.createNode(this, config)

    node = this
    node.ipaddress = config.ipaddress
    node.tcpport = config.tcpport
    node.udpport = config.udpport
  }

  RED.nodes.registerType('bitwise-config', BitwiseConfigNode)
}
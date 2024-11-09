const VoterRegistry = artifacts.require('./VoterRegistry.sol');

module.exports = function(deployer) {
  deployer.deploy(VoterRegistry);
}; 
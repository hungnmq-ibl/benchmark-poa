var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "cherry sibling song west cause buddy culture come slide city educate trend"; // this is your seed phrase of MetaMask wallet
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    private: {
      host: 'localhost',
      port: 8545,
      gas: "5000000",
      network_id: '15', // Match any network id
      from: '0xDda6eF2fF259928c561b2D30F0caD2C2736Ce8b6'
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/VKIfNFfyGp3cwoGxqGyZ")
      },
      network_id: 3,
      // from:"0xEBc3D75CCB8325Cb016af7d1A46e0458A48d7a44",
      gas:"2700000" // Gas limit used for deploys
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/VKIfNFfyGp3cwoGxqGyZ")
      }, 
      network_id: 4,
      // from:"0xEBc3D75CCB8325Cb016af7d1A46e0458A48d7a44", this is your Account 1 in MetaMask Wallet
      gas: "2700000" // Gas limit used for deploys
    }
  }
}
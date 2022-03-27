const Tether = artifacts.require('Tether');
const Rwd = artifacts.require('Rwd');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(Tether);
    const tether = await Tether.deployed();
    await deployer.deploy(Rwd);
    const rwd = await Rwd.deployed();
    await deployer.deploy(DecentralBank,rwd.address,tether.address);
    const decentralBank = await DecentralBank.deployed();
    await rwd.transfer(decentralBank.address,'1000000000000000000000000');
    await tether.transfer(accounts[1],'1000000000000000000')
};
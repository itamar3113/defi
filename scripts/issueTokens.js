const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function issueRewards(callback){
    let decentralBank = await DecentralBank.deployed()
    await decentralBank.issueToken()
    console.log('Tokens had been issued successfully')
    callback()
}
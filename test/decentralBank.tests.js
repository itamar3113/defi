const Tether = artifacts.require('Tether');
const Rwd = artifacts.require('Rwd');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DecentralBank', (accounts) => {

    let tether, rwd, decentralBank;

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        tether = await Tether.new();
        rwd = await Rwd.new();
        decentralBank = await DecentralBank.new(rwd.address, tether.address);

        await rwd.transfer(decentralBank.address, tokens('1000000'));

        await tether.transfer(accounts[1], tokens('100'), { from: accounts[0] });
    })

    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name();
            assert.equal(name, 'Tether');
        })
    })

    describe('Reward token Deployment', async () => {
        it('matches name successfully', async () => {
            const rwdName = await rwd.name()
            assert.equal(rwdName, 'Reward Token');
        })
    })

    describe('Decentral Bank Deployment', async () => {
        it('matches name successfully', async () => {
            const bankName = await decentralBank.name()
            assert.equal(bankName, 'Decentral Bank');
        })

        it('bank has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address);
            assert.equal(balance, tokens('1000000'))
        })
    })

    describe('Yield Farming', async () => {
        it('reward tokens for staking', async () => {
            let result = await tether.balanceOf(accounts[1])
            assert.equal(result, tokens('100'));

            await tether.approve(decentralBank.address, tokens('100'), { from: accounts[1] })
            await decentralBank.depositTokens(tokens('100'), { from: accounts[1] })

            result = await tether.balanceOf(accounts[1])
            assert.equal(result, tokens('0'));

            let bankResult = await tether.balanceOf(decentralBank.address)
            assert.equal(bankResult, tokens('100'));

            let isStaking = await decentralBank.isStaking(accounts[1]);
            assert.equal(isStaking, true)

            await decentralBank.issueToken({from: accounts[1]}).should.be.rejected;

            await decentralBank.unStakeTokens({from: accounts[1]});

            result = await tether.balanceOf(accounts[1])
            assert.equal(result, tokens('100'));

            bankResult = await tether.balanceOf(decentralBank.address)
            assert.equal(bankResult, tokens('0'));

            isStaking = await decentralBank.isStaking(accounts[1]);
            assert.equal(isStaking, false)

        })
    })
})

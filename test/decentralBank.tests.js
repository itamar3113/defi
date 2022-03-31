const Tether = artifacts.require('Tether');
const Rwd = artifacts.require('Rwd');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DecentralBank', (accounts) => {

    let tether, rwd;

    before(async () => {
        tether = await Tether.new();
        rwd = await Rwd.new();
    })

    describe('Mocka Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name();
            assert.equal(name, 'Tether'); 
        })
    })

        describe('Reward token', async () => {
            it('matches name successfully', async () => {
                const rwdName = await rwd.name()
                assert.equal(rwdName, 'Reward Token');
            })
        })
    })

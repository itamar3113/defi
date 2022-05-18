import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import Rwd from "../truffle_abis/Rwd.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import Main from "./Main";
import ParticleSetting from "./ParticleSetting";

class App extends Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethreuem) {
      window.web3 = new Web3(window.ethereuem);
      await window.ethereuem.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected.");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    //Get the account dinamiclly
    const account = web3.eth.getAccounts();
    this.setState({ account: "0x9C04f23C49f6cA5625137603807FC7976a69523b" });
    const networkId = await web3.eth.net.getId();

    //load tether contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      this.setState({ tether });
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tetherBalance: tetherBalance.toString() });
    } else {
      window.alert("Tether contract not deployed - no detected network");
    }

    //load rwd contract
    const rwdData = Rwd.networks[networkId];
    if (rwdData) {
      const rwd = new web3.eth.Contract(Rwd.abi, tetherData.address);
      this.setState({ rwd });
      let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
      this.setState({ rwdBalance: rwdBalance.toString() });
    } else {
      window.alert("Rwd contract not deployed - no detected network");
    }

    //load decentral bank contract
    const decentralBankData = DecentralBank.networks[networkId];
    if (decentralBankData) {
      const decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        decentralBankData.address
      );
      this.setState({ decentralBank });
      let stakingBalance = await decentralBank.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert("decentralBank contract not deployed - no detected network");
    }
    this.setState({ loading: false });
  }

  //staking function
  stakeTokens = (amount) => {
    this.setState({ loading: true });
    this.state.tether.methods
      .approve(this.state.decentralBank._address, amount)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        console.log("b")
        this.state.decentralBank.methods
          .depositTokens(amount)
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            this.setState({ loading: false });

          });
      });
  };

  unstakeTokens = () => {
    this.setState({ loading: true });
   this.state.decentralBank.methods
      .unstakeTokens()
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };

  tokens(number) {
    return Web3.utils.toWei(number, "ether");
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "0X0",
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: "0",
      rwdBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }
  render() {
    let content;
    {
      this.state.loading
        ? (content = (
            <p id="loader" className="text-center" style={{ margin: "30px" }}>
              Loading...
            </p>
          ))
        : (content = (
            <Main
              tetherBalance={this.state.tetherBalance}
              rwdBalance={this.state.rwdBalance}
              stakingBalance={this.state.stakingBalance}
              stakeTokens={this.stakeTokens}
              unstakeTokens ={this.unstakeTokens}
            />
          ));
    }
    return (
      <div className="App" style={{ position: "relative" }}>
        <div style={{ position: "absolute" }}>
          <ParticleSetting />
        </div>
        <Navbar account={this.state.account} />
        <div className="container-fkuid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto">
              <div>{content}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

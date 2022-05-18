import React, { Component } from "react";
import tether from "../tether.png";
import "./Main.css";

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                USDT: {window.web3.utils.fromWei(this.props.stakingBalance)}
              </td>
              <td>RWD: {window.web3.utils.fromWei(this.props.rwdBalance)}</td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2" style={{ opacity: ".9" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              let amount = this.input.value;
              amount = window.web3.utils.toWei(amount, "Ether");
              this.props.stakeTokens(amount);
            }}
            className="mb-3"
          >
            <div>
              <label className="float-left">
                <b>Stake Tokens</b>
              </label>
              <span className="float-right">
                Balance: {window.web3.utils.fromWei(this.props.tetherBalance)}
              </span>
              <div className="input-group mb-4">
                <input
                  ref={(input) => {
                    this.input = input;
                  }}
                  type="text"
                  placeholder="0"
                  required
                />
                <div className="input-group open">
                  <div className="input-group text">
                    <img src={tether} alt="tether" height="32" />
                    &nbsp;&nbsp;&nbsp;USDT{" "}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Depodsit
              </button>
            </div>
          </form>
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={(event) => {
              event.preventDefault(this.props.unstakeTokens());
            }}
          >
            Withdrow
          </button>
          <div className="card-body text-center">Airdrop</div>
        </div>
      </div>
    );
  }
}

export default Main;

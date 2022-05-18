import React, { Component } from "react";
import './Navbar.css'
import bank from '../bank.png'



class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top shdow p-0">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0">
        <img src={bank} width={50} height={30} className='d-inline-block alling-top' alt="bank" /></a>
        DApp Yield Staking (Decentralized Banking)
        <ul className="navbar-nav px-3">
            <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
                <small>Account Number: {this.props.account}</small>
            </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

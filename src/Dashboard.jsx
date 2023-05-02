import React, { useState, useEffect } from "react";
import axios from "axios";
import './Dashboard.css';
import InvestmentDashboard from "./build/contracts/InvestmentDashboard.json";
import Web3 from "web3";

const web3 = new Web3("HTTP://127.0.0.1:7545");
const investmentDashboard = new web3.eth.Contract(
  InvestmentDashboard.abi,
  "0xcd0EEE7454D795220A639F6a8165DAafb613fdbd"
);

const Dashboard = () => {
  const [coinData, setCoinData] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0); 
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [redeemAmount, setRedeemAmount] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP&tsyms=USD,EUR&api_key=62f841e41cbe58c5b230d2ef5f2b8a4cd5f87bc497f48b489584c9cb83ab3421`
      )
      .then((response) => {
        setCoinData(response.data.DISPLAY);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeposit = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await investmentDashboard.methods.deposit(web3.utils.toWei("1")).send({ from: accounts[0] });
      setDepositAmount(depositAmount + 1);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleWithdraw = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await investmentDashboard.methods.withdraw(web3.utils.toWei("1")).send({ from: accounts[0] });
      setWithdrawAmount(withdrawAmount + 1);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleRedeem = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await investmentDashboard.methods.redeem(web3.utils.toWei("1")).send({ from: accounts[0] });
      setRedeemAmount(redeemAmount + 1);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="background">
      <h1>Investment Dashboard</h1>
      <div className="coin-container">
        {Object.keys(coinData).map((coin) => (
          <div className="coin" key={coin}>
            <h2>{coin}</h2>
            <div className="coin-data">
              <div className="coin-price">
                <p>Price:</p>
                <p>{coinData[coin].USD.PRICE}</p>
              </div>
              <div className="coin-supply">
                <p>Supply:</p>
                <p>{coinData[coin].USD.SUPPLY}</p>
              </div>
              <div className="coin-returns">
                <p>Daily Returns:</p>
                <p>{coinData[coin].USD.CHANGEPCT24HOUR}%</p>

              </div>
              <div className="coin-tvl">
                <p>TVL:</p>
                <p>{coinData[coin].USD.TOTALVOLUME24H}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={handleWithdraw}>Withdraw</button>
        <button onClick={handleRedeem}>Redeem</button>
      </div>
      <div className="transaction-container">
        <div className="transaction">
          <h3>Deposit Amount:</h3>
          <p>{depositAmount}</p>
        </div>
        <div className="transaction">
          <h3>Withdraw Amount:</h3>
          <p>{withdrawAmount}</p>
        </div>
        <div className="transaction">
          <h3>Redeem Amount:</h3>
          <p>{redeemAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { Waves } from './components/Waves/Waves';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState('');

  const checkWalletConnection = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Please install metamask!');
      return;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        console.log('No authorized account found');
        return;
      }

      const account = accounts[0];
      console.log(account);
      setCurrentAccount(account);
    } catch (error) {}
  };

  const handleConnectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <div className="main-container">
      <div className="data-container">
        <div className="header">
          👋 Wave to your friends using the Ethereum blockchain!
        </div>
        {currentAccount ? (
          <Waves currentAccount={currentAccount} />
        ) : (
          <Button onClick={handleConnectWallet}>Connect Wallet</Button>
        )}
      </div>
    </div>
  );
};

export default App;

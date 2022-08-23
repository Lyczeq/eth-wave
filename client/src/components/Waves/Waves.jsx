import dayjs from 'dayjs';
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';

import abi from '../../utils/WavePortal.json';
import './Waves.css';

const contractAddress = '0x027493A6c3880cBc0c372A9D39Cc1ea69eEe89d5';
const contractABI = abi.abi;

export function Waves({ currentAccount }) {
  const [waves, setWaves] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getWaves = useCallback(async () => {
    const { ethereum } = window;

    if (!ethereum) return;

    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tempWaves = await wavePortalContract.getWaveMessages();
      const waves = (tempWaves || []).map(wave => ({
        address: wave.userAddress,
        message: wave.message,
        timestamp: new Date(wave.timestamp * 1000),
      }));
      setWaves(waves);
    } catch (e) {
      alert('Something went wrong!');
    }
  }, [currentAccount]);

  const getReadableDate = seconds => {
    if (!seconds) return 'Undefined date';
    const date = dayjs(seconds).format('HH:mm DD/MM:YYYY');
    return date;
  };

  const handleWave = async () => {
    try {
      const { ethereum } = window;
      setIsLoading(true);
      setErrorMessage('');

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();

        const waveTxn = await wavePortalContract.wave(message, {
          gasLimit: 300000,
        });

        await waveTxn.wait();
        await getWaves();
      } else {
        alert("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setErrorMessage('Transaction failed!');
    } finally {
      setMessage('');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWaves();
  }, [currentAccount]);

  useEffect(() => {
    const onNewWave = (from, timestamp, message) => {
      setWaves(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };

    const { ethereum } = window;
    let wavePortalContract;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      wavePortalContract.on('NewWave', onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off('NewWave', onNewWave);
      }
    };
  }, []);

  return (
    <div className="waves-wrapper">
      <input
        type="text"
        placeholder="Enter a message"
        className="message-input"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      {isLoading ? <p>Loading...</p> : null}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="wave-button" onClick={handleWave}>
        Wave at Me
      </button>
      {(waves || []).map((wave, index) => (
        <div key={index} className="wave">
          <div>Address: {wave.address}</div>
          <div>Date: {getReadableDate(wave.timestamp)}</div>
          <div>Message: {wave.message}</div>
        </div>
      ))}
    </div>
  );
}

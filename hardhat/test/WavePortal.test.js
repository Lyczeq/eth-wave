const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('WavePortal Contract', () => {
  let WAVE_PORTAL;
  beforeEach(async () => {
    const WavePortal = await ethers.getContractFactory('WavePortal');
    WAVE_PORTAL = await WavePortal.deploy();
    await WAVE_PORTAL.deployed();
  });

  it('Should deploy smart contract with an empty wave list.', async () => {
    expect(await WAVE_PORTAL.getTotalWaves()).equals(0);
  });

  it('Should add a wave to the smart contract.', async () => {
    const waveMessage = await WAVE_PORTAL.wave('Hello there!');

    expect(await WAVE_PORTAL.getTotalWaves()).equals(1);
  });

  it('Should return array with 1 wave.', async () => {
    const message = 'test';
    await WAVE_PORTAL.wave(message);

    const waves = await WAVE_PORTAL.getWaveMessages();
    const firstWave = waves[0];
    expect(firstWave?.message).equals(message);
  });

  it('Should return two messages from two users', async () => {
    const [_, randomPerson] = await hre.ethers.getSigners();
    const firstMessage = 'test';
    const secondMessage = 'test2';

    await WAVE_PORTAL.wave(firstMessage);
    await WAVE_PORTAL.connect(randomPerson).wave(secondMessage);
    const wavesMessages = ((await WAVE_PORTAL.getWaveMessages()) || []).map(
      wave => wave.message
    );
    expect(wavesMessages).includes(firstMessage, secondMessage);
  });
});

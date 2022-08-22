const main = async () => {
  // compiles the contract and prepares the files to work with it under the artifacts directory
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');

  const [owner, randomPerson] = await hre.ethers.getSigners();

  // Hardhat creates a local Ethereum network only for that contract. When the script is finished, the network is destroyed. Every time the contract is rum there is a fresh blockchain.
  const waveContract = await waveContractFactory.deploy();

  // wait until contract is deployed
  await waveContract.deployed();
  console.log('Contract deployed to:', waveContract.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave('test');
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randomPerson).wave("test2");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();

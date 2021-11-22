import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { tokenIPFSs } from '../data/exampleNFT';

task('mint', 'mint NFT').setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
  const [deployer] = await hre.ethers.getSigners();
  const { execute } = hre.deployments;

  for (let ipfs of tokenIPFSs) {
    await execute(
      'ThreeSpace',
      { from: deployer.address, log: true },
      'safeMint',
      deployer.address,
      ipfs
    );
    console.log(`mint success`);
  }
});

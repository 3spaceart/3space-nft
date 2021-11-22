import { ThreeSpace, ThreeSpaceNameChangeToken } from '../../typechain';
import { waffle, deployments, ethers } from 'hardhat';
import { Wallet } from 'ethers';

import ThreeSpaceArtifact from '../../artifacts/contracts/ThreeSpace.sol/ThreeSpace.json';
import ThreeSpaceNameChangeTokenArtifact from '../../artifacts/contracts/test/ThreeSpaceNameChangeToken.sol/ThreeSpaceNameChangeToken.json';

export class TestEnv {
  threeSpace: ThreeSpace;
  nameChamgeToken: ThreeSpaceNameChangeToken;

  constructor(threeSpace: ThreeSpace, nameChangeToken: ThreeSpaceNameChangeToken) {
    this.threeSpace = threeSpace;
    this.nameChamgeToken = nameChangeToken;
  }

  public static async setup(deployer: Wallet) {
    await deployments.fixture(['nameChangeToken', 'threeSpace']);

    const threeSpaceNameChangeToken = (await ethers.getContract(
      'ThreeSpaceNameChangeToken',
      deployer
    )) as ThreeSpaceNameChangeToken;
    const threeSpace = (await ethers.getContract('ThreeSpace', deployer)) as ThreeSpace;

    return new TestEnv(threeSpace, threeSpaceNameChangeToken);
  }
}

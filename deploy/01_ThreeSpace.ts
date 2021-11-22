import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'ethers';

const threeSpace: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const emptyRegistryAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
  const nameChangePrice = ethers.utils.parseEther('100');

  const threeSpace = await deploy('ThreeSpace', {
    from: deployer,
    args: [emptyRegistryAddress, emptyRegistryAddress, nameChangePrice],
    proxy: {
      owner: deployer,
      proxyContract: 'OpenZeppelinTransparentProxy',
      methodName: 'initialize',
    },
    log: true,
  });

  if (hre.network.live) {
    console.log('Token deployed to:', threeSpace.address);
    await hre.run('etherscan-verify', {
      network: hre.network.name,
    });
  }
};

export default threeSpace;

threeSpace.tags = ['threeSpace'];

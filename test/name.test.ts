import { Wallet } from '@ethersproject/wallet';
import { expect } from 'chai';
import { ethers } from 'ethers';
import { waffle } from 'hardhat';
import { TestEnv } from './utils/fixture';

describe('ThreeSpace.nameChange functionalities', async () => {
  let admin: Wallet;
  let testEnv: TestEnv;

  async function fixture() {
    return await TestEnv.setup(admin);
  }

  before(async () => {
    [admin] = waffle.provider.getWallets();
  });

  beforeEach(async () => {
    testEnv = await waffle.loadFixture(fixture);
  });

  context('nameChange', async () => {
    beforeEach('set', async () => {
      await testEnv.nameChamgeToken.faucet();
      await testEnv.nameChamgeToken
        .connect(admin)
        .approve(testEnv.threeSpace.address, ethers.utils.parseEther('10000'));
      await testEnv.threeSpace.connect(admin).safeMint(admin.address, 'uri');
    });

    it('success', async () => {
      await expect(testEnv.threeSpace.connect(admin).changeName(0, 'new name'))
        .to.be.emit(testEnv.threeSpace, 'NameChange')
        .withArgs(0, 'new name')
        .to.be.emit(testEnv.nameChamgeToken, 'Transfer')
        .withArgs(
          testEnv.threeSpace.address,
          ethers.constants.AddressZero,
          await testEnv.threeSpace.nameChangePrice()
        );
    });
  });
});

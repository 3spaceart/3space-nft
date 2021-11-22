// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

/**
 * @notice This ERC20 is only for the test.
 */
contract ThreeSpaceNameChangeToken is ERC20 {
  constructor() ERC20('ThreeSpaceNameChangeToken', 'SPACENCT') {
    _mint(msg.sender, 1e30 / 2);
    _mint(address(this), 1e30 / 2);
  }

  /**
   * @notice The faucet is for testing ThreeSpace functions
   */
  function faucet() external {
    _transfer(address(this), msg.sender, 10000 * 1e18);
  }

  function burn(uint256 amount) external {
    _burn(msg.sender, amount);
  }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IREC is ERC20, Ownable {
    enum Source { Solar, Wind, Hydro, Geothermal }
    mapping(address => mapping(Source => uint256)) public userSourceBalances;
    uint256 public constant PRICE_PER_IREC = 0.000001 ether;

    event Bought(address indexed buyer, Source source, uint256 quantity, uint256 totalCost);
    event Sold(address indexed seller, Source source, uint256 quantity, uint256 totalReceived);
    event Burned(address indexed user, Source source, uint256 quantity);

    constructor() ERC20("International Renewable Energy Certificate", "IREC") Ownable(msg.sender) {}

    function mint(address to, Source source, uint256 quantity) external onlyOwner {
        _mint(to, quantity);
        userSourceBalances[to][source] += quantity;
    }

    function burn(Source source, uint256 quantity) external {
        require(userSourceBalances[msg.sender][source] >= quantity, "Insufficient I-REC balance for this source");
        require(balanceOf(msg.sender) >= quantity, "Insufficient total I-REC balance");
        _burn(msg.sender, quantity);
        userSourceBalances[msg.sender][source] -= quantity;
        emit Burned(msg.sender, source, quantity);
    }

    function buy(Source source, uint256 quantity) external payable {
        uint256 totalCost = quantity * PRICE_PER_IREC;
        require(msg.value >= totalCost, "Insufficient ETH sent");
        _mint(msg.sender, quantity);
        userSourceBalances[msg.sender][source] += quantity;
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
        emit Bought(msg.sender, source, quantity, totalCost);
    }

    function sell(Source source, uint256 quantity) external {
        require(userSourceBalances[msg.sender][source] >= quantity, "Insufficient I-REC balance for this source");
        require(balanceOf(msg.sender) >= quantity, "Insufficient total I-REC balance");
        uint256 totalReceived = quantity * PRICE_PER_IREC;
        require(address(this).balance >= totalReceived, "Contract has insufficient ETH to pay");
        _burn(msg.sender, quantity);
        userSourceBalances[msg.sender][source] -= quantity;
        payable(msg.sender).transfer(totalReceived);
        emit Sold(msg.sender, source, quantity, totalReceived);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        Source source = Source.Solar;
        for (uint256 i = 0; i < 4; i++) {
            Source currentSource = Source(i);
            if (userSourceBalances[msg.sender][currentSource] >= amount) {
                source = currentSource;
                break;
            }
        }
        require(userSourceBalances[msg.sender][source] >= amount, "Insufficient I-REC balance for any source");
        userSourceBalances[msg.sender][source] -= amount;
        userSourceBalances[to][source] += amount;
        return super.transfer(to, amount);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        payable(owner()).transfer(balance);
    }

    function getSourceBalance(address user, Source source) external view returns (uint256) {
        return userSourceBalances[user][source];
    }

    receive() external payable {}
}
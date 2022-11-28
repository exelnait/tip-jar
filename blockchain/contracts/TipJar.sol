// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

import 'hardhat/console.sol';

contract TipJar {
    uint public totalTips;

    address payable public owner;

    struct Tip {
        address sender;
        string message;
        string name;
        uint timestamp;
        uint amount;
    }
        
    Tip[] tips;

    event NewTip(address indexed from, string message, string name, uint amount);
    event NewWithdraw(uint amount);

    constructor() {
        /*
        * msg в данном случае — это именно те данные, которые были переданы виртуальной машине вместе с транзакцией,
        * содержащей весь код этого контракта. 
        * msg.sender — это автор данной транзакции, которая размещает этот код.
        */
        owner = payable(msg.sender);
    }
    
    // передать транзакцией определенное количество чаевых на аккаунт контракта. 
    function sendTip(string memory _message, string memory _name) public payable {
        require(msg.sender.balance >= msg.value, 'Insufficient balance');
        
         /*
         * В данном случае смарт-контракт, получая чаевые, оставляет их у себя на балансе,
         * но в массив tips записывает, кто именно был отправителем чаевых, чтобы знать, кому они принадлежат.
         */
        totalTips += 1;
        tips.push(Tip(msg.sender, _message, _name, block.timestamp, msg.value));

        emit NewTip(msg.sender, _message, _name, msg.value);
    }

    /* 
    * Есть модификатор view. Это означает, что сам метод никак не меняет переменные своего класса
    * и он фактически является только методом чтения. Отдельная транзакция не создается для вызова этого метода,
    * комиссия не платится, а все вычисления выполняются локально, после чего пользователь получает результат.
    */
    function getAllTips() public view returns (Tip[] memory) {
        return tips;
    }

    modifier onlyOwner {
        require(msg.sender == owner, 'Only owner can withdraw');
        _;
    }

    /*
     * Здесь идет проверка, достаточно ли монет на балансе пользователя, который вызывает этот метод, чтобы их отправить.
     * Если их достаточно, тогда сам смарт-контракт возвращает вызывающему это количество монет.
     */
    function withdraw() public onlyOwner {
        uint amount = address(this).balance;
        require(amount > 0, 'Insufficient balance');

        (bool success, ) = owner.call{value: amount}('');
        require(success, 'Windraw failed');

        emit NewWithdraw(amount);
    }
}
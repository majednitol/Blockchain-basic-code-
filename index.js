const sha256 = require("crypto-js/sha256");


// create  block model

class Block {
    constructor(timeStamp, transactions, preHash = "") {
        this.timeStamp = timeStamp;
        this.transactions = transactions;
        this.preHash = preHash;
        this.hash = this.genarateHash()
        this.nonce = 0;

    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.genarateHash()
        }
        console.log("mining done :" + this.hash);
    }
    // generate hash for evey block
    genarateHash() {
        return sha256(this.timeStamp + JSON.stringify(this.transactions) + this.preHash + this.nonce).toString()
    }

}

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
// create blockChain model
class BlockChain {
    constructor() {
        // setting default 1st block in chain
        this.chain = [this.genesisBlock()]
        this.difficulty = 5// joto difficulty beshi hobe blockchain create hote toto smy lagbe ar complex hash generate korbe 
        this.pendingTransactions = [];
        this.miningReward = 10
    }

    // create genesis block (1st block)
    genesisBlock() {
        return new Block("123-7", "genesis", "0000")
    }
    // finding last block in chain
    letestBlock() {
        return this.chain[this.chain.length - 1]
    }
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }
    minePendingTransaction(minerAddress) {
        let block = new Block(Date.now(), this.pendingTransactions)
        block.mineBlock(this.difficulty)
        this.chain.push(block)
        this.pendingTransactions = [
            new Transaction(null, minerAddress, this.miningReward)
        ]

    }
    // adding new Block in chain
    addBlock(NewBlock) {
        NewBlock.preHash = this.letestBlock().hash
        NewBlock.mineBlock(this.difficulty)
        this.chain.push(NewBlock)
    }
    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]
            if (currentBlock.hash !== currentBlock.genarateHash()) {
                return false

            }
            if (currentBlock.preHash !== previousBlock.hash) {
                return false
            }

        }
        return true
    }
    getBalanceOfAddress(address) {
        let balance = 0
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount
                }
                if (trans.toAddress === address) {
                    balance += trans.amount

                }
            }
        }
        return balance
    }
}


// createing  block by passing block data

const blockChain = new BlockChain()
blockChain.createTransaction(new Transaction('address1', 'address2', 200))
blockChain.createTransaction(new Transaction('address2', 'address1', 150))
blockChain.minePendingTransaction('majed-address')
// console.log(blockChain);
console.log("account one :" + blockChain.getBalanceOfAddress("address1") + " ETH");
console.log("account two :" + blockChain.getBalanceOfAddress("address2") + " ETH");
console.log("account three :" + blockChain.getBalanceOfAddress("majed-address") + " ETH");
// reward always given in 2nd mining 
blockChain.minePendingTransaction('majed-address')
console.log("miningReward for mining creator:" + blockChain.getBalanceOfAddress("majed-address") + " ETH");
console.log("account three :" + blockChain.getBalanceOfAddress("majed-address") + " ETH");

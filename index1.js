const sha256 = require("crypto-js/sha256")

class Block {
    constructor(timeStamp, transactions, preHash) {
        this.timeStamp = timeStamp
        this.transactions = transactions
        this.preHash = preHash
        this.hash = this.calCulateHash(),
            this.nonce = 0
    }

    miningBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.calCulateHash()

        }
        console.log("minig done :" + this.hash);
    }
    calCulateHash() {
        return sha256(this.timeStamp + JSON.stringify(this.transactions) + this.preHash + this.nonce).toString()
    }
}
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.genesisBlock()],
            this.difficulty = 2
        this.pendingTransactions = []
    }
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction)
    }
    genesisBlock() {
        return new Block("1233", "genesisBlock", "0000")

    }
    // letestBlock() {
    //     return this.chain[this.chain.length - 1]
    // }
    // addNewBlock(NewBlock) {
    //     NewBlock.preHash = this.letestBlock().hash
    //     NewBlock.miningBlock(this.difficulty)
    //     this.chain.push(NewBlock)
    // }
    // isValid() {
    //     for (let i = 1; i < this.chain.length; i++) {

    //         const currentBlock = this.chain[i]
    //         const previousBlock = this.chain[i - 1]
    //         if (currentBlock.hash !== currentBlock.calCulateHash()) { return false }
    //         if (currentBlock.preHash !== previousBlock.hash) { return false }
    //         return true
    //     }
    // }
    minePendingTransaction() {
        let block = new Block(Date.now(), this.pendingTransactions)
        block.miningBlock(this.difficulty)
        this.chain.push(block)
        this.pendingTransactions= []
    }
    getBalanceOfAddress(address) {
        let balance = 0
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress=== address) {
                  balance -= trans.amount
                }
                if (trans.toAddress===address) {
                   balance += trans.amount 
                }
            }
        }
        return balance
    }
}

const blockchain = new BlockChain()


blockchain.createTransaction(new Transaction("address1", "address2", 200))
blockchain.createTransaction(new Transaction("address2", "address1", 150))
blockchain.minePendingTransaction()
console.log(blockchain.getBalanceOfAddress("address1"))
console.log(blockchain.getBalanceOfAddress("address2"))

// const blockchain = new BlockChain()
// const block = new Block("1233", { amout: 1 })
// blockchain.addNewBlock(block)
// console.log(blockchain);
// const block2 = new Block("1233", { amout: 1 })
// blockchain.addNewBlock(block2)
// console.log(blockchain);
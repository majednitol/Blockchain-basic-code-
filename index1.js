const sha256 = require("crypto-js/sha256")

class Block {
    constructor(timeStamp, data, preHash) {
        this.timeStamp = timeStamp
        this.data = data
        this.preHash = preHash
        this.hash = this.calCulateHash()
    }
    calCulateHash() {
        return sha256(this.timeStamp + JSON.stringify(this.data) + this.preHash).toString()
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.genesisBlock()]
    }
    genesisBlock() {
        return new Block("1233", "genesisBlock", "0000")

    }
    letestBlock() {
        return this.chain[this.chain.length - 1]
    }
    addNewBlock(NewBlock) {
        NewBlock.preHash = this.letestBlock().hash
        NewBlock.hash = NewBlock.calCulateHash()
        this.chain.push(NewBlock)
    }
}

const blockchain = new BlockChain()
const block = new Block("1233", { amout: 1 })
blockchain.addNewBlock(block)
console.log(blockchain);
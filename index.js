const sha256 = require("crypto-js/sha256");


// create  block model

class Block {
    constructor(timeStamp, data, preHash = "") {
        this.timeStamp = timeStamp;
        this.data = data;
        this.preHash = preHash;
        this.hash = this.genarateHash()


    }
    // generate hash for evey block
    genarateHash() {
        return sha256(this.timeStamp + JSON.stringify(this.data) + this.preHash).toString()
    }

}
// create blockChain model
class BlockChain {
    constructor() {
        // setting default 1st block in chain
        this.chain = [this.genesisBlock()]
    }

    // create genesis block (1st block)
    genesisBlock() {
        return new Block("1233-7", "genesis", "0000")
    }
    // finding last block in chain
    letestBlock() {
        return this.chain[this.chain.length - 1]
    }
    // adding new Block in chain
    addBlock(NewBlock) {
        NewBlock.preHash = this.letestBlock().hash
        NewBlock.hash = NewBlock.genarateHash()
        this.chain.push(NewBlock)
    }
    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]
            if (currentBlock.hash !== currentBlock.genarateHash()) {
                return false

            }
            if (currentBlock.preHash !== previousBlock.hash) { return false }
            return true
        }
    }
}
// createing  block by passing block data

const blockChain = new BlockChain()
const block = new Block("1233-7", { amout: 1 })
blockChain.addBlock(block)
console.log(blockChain.isValid());

blockChain.chain[1].data = "hacked"
console.log(blockChain.isValid());
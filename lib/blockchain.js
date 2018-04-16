/**
 * blockchain
 * Created by lintry on 2018/4/16.
 */

const Block = require('./block')
class BlockChain {
    constructor(genesis) {
        if (!genesis) {
            throw new Error('genesis is not exists!')
        }
        if (!(genesis instanceof Block)) {
            throw new Error('genesis is not a block')
        }
        if (!genesis.isValidBlock()) {
            throw new Error('genesis is not a valid block')
        }

        this.chain = [genesis]
    }

    get() {
        return this.chain
    }

    get latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    isValidNewBlock(newBlock, prevBlock) {
        if (!newBlock || !prevBlock) {
            console.log('params can not be empty')
            return false
        }

        if (newBlock.index !== prevBlock.index + 1) {
            console.log('new block has invalid index')
            return false
        }

        if (newBlock.prev_hash !== prevBlock.hash) {
            console.log('new block has invalid previous hash')
            return false
        }

        let {index, prev_hash, timestamp, data, hash, nonce} = newBlock
        const block = new Block(index, prev_hash, timestamp, data, hash, nonce)
        if (!block.isValidBlock()) {
            console.log('new block has invalid hash')
            return false
        }
        return true
    }

    append(block) {
        if (this.isValidNewBlock(block, this.latestBlock)) {
            this.chain.push(block)
        }
    }

}

module.exports = BlockChain
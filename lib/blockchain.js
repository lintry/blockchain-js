/**
 * blockchain
 * Created by lintry on 2018/4/16.
 */

const Block = require('./block')

class BlockChain {
    constructor (genesis) {
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

    /**
     * 返回当前区块链
     * @return {*[]|*}
     */
    get () {
        return this.chain
    }

    /**
     * 返回最新的区块
     * @return {*}
     */
    get latestBlock () {
        return this.chain[this.chain.length - 1]
    }

    /**
     * 验证两个区块之间的关系
     * @param newBlock
     * @param prevBlock
     * @return {boolean}
     */
    isValidNewBlock (newBlock, prevBlock) {
        if (!newBlock || !prevBlock) {
            console.warn('params can not be empty')
            return false
        }

        if (newBlock.index !== prevBlock.index + 1) {
            console.warn('new block has invalid index')
            return false
        }

        if (newBlock.prev_hash !== prevBlock.hash) {
            console.warn('new block has invalid previous hash')
            return false
        }

        const block = new Block(newBlock)
        if (!block.isValidBlock()) {
            console.warn('new block has invalid hash')
            return false
        }
        return true
    }

    /**
     * 验证子链是否合法
     * @param sub_chain
     * @return {boolean}
     */
    isValidChain (sub_chain) {
        let current_block = sub_chain[0]
        let i = 1, size = sub_chain.length
        for(; i < size; i++) {
            let block = sub_chain[i]
            if (this.isValidNewBlock(block, current_block)) {
                current_block = block
            } else {
                console.warn(i + ' block is invalid', block.index)
                return false
            }
        }
        return (i === size)
    }

    /**
     * 添加区块到链
     * @param blocks 一个区块或子链
     */
    append (blocks) {
        let sub_chain
        if (blocks instanceof Block) {
            sub_chain = [blocks]
        } else if (Array.isArray(blocks) || !blocks.length) {
            sub_chain = blocks
        } else {
            throw new Error('block should be a Block instance or an array of Block instance/data')
        }

        if (!this.isValidNewBlock(sub_chain[0], this.latestBlock)) {
            throw new Error('first block is invalid')
        }

        if (!this.isValidChain(sub_chain)) {
            throw new Error('blocks to append is invalid')
        }

        this.chain = this.chain.concat(sub_chain)
    }

    /**
     * 更新区块链
     * @param chain
     */
    replaceChain (chain) {
        if (!Array.isArray(chain) || !chain.length) {
            throw new Error('replacement chain should be an array of Block instance/data')
        }

        let genesis = chain[0]
        if (JSON.stringify(genesis) !== JSON.stringify(this.chain[0])) {
            throw new Error('replacement chain is invalid')
        }
        if (chain.length <= this.chain.length) {
            throw new Error('replacement chain is shorter than original')
        }
        if (JSON.stringify(this.latestBlock) !== JSON.stringify(chain[this.chain.length-1])) {
            throw new Error('latest block is different from the same index of replacement ')
        }
        if (!this.isValidChain(chain)) {
            throw new Error('replacement chain is invalid')
        }

        this.chain = chain
    }

}

module.exports = BlockChain
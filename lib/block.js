/**
 * 定义区块
 * Created by lintry on 2018/4/16.
 */

const crypto = require('crypto')

function sha256 (text) {
    if (typeof text === 'number') {
        text = text.toString();
    }
    return crypto.createHash('sha256').update(text).digest('hex');
}

class Block {
    static get DIFFICULTY () {
        return 4
    }

    /**
     * 初始化区块
     * @param index
     * @param prev_hash
     * @param timestamp
     * @param data
     * @param hash
     * @param nonce
     */
    constructor (index = 0, prev_hash = '0', timestamp = Date.now(), data = '', hash = '', nonce = 0) {
        this.index = index
        this.prev_hash = prev_hash
        this.timestamp = timestamp
        this.data = data
        this.hash = hash
        this.nonce = nonce
    }

    /**
     * 计算某个区块的hash
     * @param block
     * @return {*}
     */
    work (block) {
        block = block || this
        while (true) {
            let hash = sha256(block.index + block.prev_hash + block.timestamp + block.data + (++block.nonce))
            if (this.isValidHash(hash)) {
                block.hash = hash
                return block
            }
        }
    }

    /**
     * 创世区块
     * @return {*}
     */
    static get genesis () {
        let genesis = new Block(0, '0', Date.now(), 'First Block in the world!')
        return genesis.work()
    }

    /**
     * 验证区块Hash的有效性
     * @param hash
     * @return {boolean}
     */
    isValidHash (hash) {
        hash = hash || this.hash
        return new RegExp('^0{' + Block.DIFFICULTY + '}').test(hash)
    }

    /**
     * 验证区块的有效性
     * @return {boolean}
     */
    isValidBlock () {
        let hash = sha256(this.index + this.prev_hash + this.timestamp + this.data + this.nonce)
        return (hash === this.hash && this.isValidHash(hash))
    }

    /**
     * 从当前区块挖掘一个新的区块
     * @param data
     * @return {*}
     */
    dig (data) {
        let new_block = new Block(this.index + 1, this.hash, Date.now(), data, 0)
        return new_block.work()
    }

}

module.exports = Block
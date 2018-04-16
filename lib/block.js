/**
 * 定义区块
 * Created by lintry on 2018/4/16.
 */

const crypto = require('crypto')

/**
 * 计算hash值
 * @param block
 * @return {*}
 */
function sha256 (block) {
    let text = [block.index, block.prev_hash, block.timestamp, block.data, block.nonce].sort().join('')
    return crypto.createHash('sha256').update(text).digest('hex');
}

class Block {
    static get DIFFICULTY () {
        return 4
    }

    /**
     * 初始化区块
     * @param newBlock
     */
    constructor (newBlock) {
        if (!newBlock) {
            throw new Error('params can not be empty')
        }
        let {index, prev_hash, timestamp, data, hash, nonce} = newBlock
        this.index = index || 0
        this.prev_hash = prev_hash || '0'
        this.timestamp = timestamp || Date.now()
        this.data = data || ''
        this.hash = hash || ''
        this.nonce = nonce || 0
    }

    /**
     * 从某个区块计算下一个区块的hash
     * @param block
     * @return {*}
     */
    work (block) {
        block = block || this
        while (true) {
            block.nonce++ // nonce初始从0开始
            let hash = sha256(block)
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
        let genesis = new Block({
            index: 0,
            prev_hash: '0',
            timestamp: Date.now(),
            data: 'First Block in the world!',
            hash: '',
            nonce: 0
        })
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
        let hash = sha256(this)
        return (hash === this.hash && this.isValidHash(hash))
    }

    /**
     * 从当前区块挖掘一个新的区块
     * @param data
     * @return {*}
     */
    dig (data) {
        let new_block = new Block({
            index: this.index + 1,
            prev_hash: this.hash,
            timestamp: Date.now(),
            data,
            hash: '',
            nonce: 0
        })
        return new_block.work()
    }

}

module.exports = Block
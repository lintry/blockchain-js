/**
 * 创建创世区块
 * Created by lintry on 2018/4/16.
 */

const Block = require('../lib/block')


const genesis = Block.genesis

console.log('Genesis block is', genesis)

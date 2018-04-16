/**
 * 模拟挖矿
 * Created by lintry on 2018/4/16.
 */

const Block = require('../lib/block')
const chalk = require('chalk')

const genesis = new Block({
    index: 0,
    prev_hash: '0',
    timestamp: 1523873300662,
    data: 'First Block in the world!',
    hash: '000099819b66c5f9aabb01110e1db09abb4f63036b8e8768791cb71d316b6c3b',
    nonce: 2725
})
console.log(chalk.cyan('this genesis is '), genesis.isValidBlock())

const found = new Block({
    index: 1,
    prev_hash: '000099819b66c5f9aabb01110e1db09abb4f63036b8e8768791cb71d316b6c3b',
    timestamp: 1523873300809,
    data: 'I have a pen✏️',
    hash: '00009147aa804135985297fb75d9a515240e7c0abed7132baa1350a0641f0665',
    nonce: 103432
})

console.log(chalk.cyan('this block is '), found.isValidBlock())

const dig = found.dig('I have an apple🍎️')

console.log(chalk.magenta('I got '), dig)
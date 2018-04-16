/**
 * blockchain
 * Created by lintry on 2018/4/16.
 */

const Block = require('../lib/block')
const BlockChain = require('../lib/blockchain')
const chalk = require('chalk')

const genesis = new Block({
    index: 0,
    prev_hash: '0',
    timestamp: 1523873300662,
    data: 'First Block in the world!',
    hash: '000099819b66c5f9aabb01110e1db09abb4f63036b8e8768791cb71d316b6c3b',
    nonce: 2725
})

const bc = new BlockChain(genesis)

const found = new Block({
    index: 1,
    prev_hash: '000099819b66c5f9aabb01110e1db09abb4f63036b8e8768791cb71d316b6c3b',
    timestamp: 1523873300809,
    data: 'I have a pen✏️',
    hash: '00009147aa804135985297fb75d9a515240e7c0abed7132baa1350a0641f0665',
    nonce: 103432
})

// 添加现有的区块
bc.append(found)
console.log('append a new block', bc.get().length)

let sub_chain = [genesis, found]
const ppat = [
    'PPAP',
    'I have a pen✏️',
    'I have an apple🍎️️',
    'Um~ apple pen',
    'I have a pen✏️',
    'I have a pineapple️🍍',
    'Um~ pineapple️ pen',
    'Apple pen, pineapple️ pen',
    'Um~ ✏️🍍🍎️✏️'
]
// 在现有区块上连续挖掘几个新区块
for ( let i = 2; i <= 6; i++) {
    sub_chain.push(sub_chain[sub_chain.length - 1].dig(ppat[i]))
}

// 添加一部分新区块
bc.append(sub_chain.slice(2, 4))
console.log(chalk.cyan('append some blocks'), bc.get().length)

// 把所有的新区块产生的链替换原先的链
bc.replaceChain(sub_chain)

console.log(chalk.magenta('replace new chain'), bc.get())

const fork = new BlockChain(genesis)
fork.append(fork.latestBlock.dig('fork block 1'))
fork.append(fork.latestBlock.dig('fork block 2'))
console.log('fork a chain', fork)

try {
    console.log(chalk.yellow('Ready to append sub chain to fork, it will be fail'), fork.get().length, sub_chain.length)
    fork.append(sub_chain.slice(2, 4))
} catch (e) {
    console.error(chalk.red(e.message))
}

try {
    console.log(chalk.yellow('Ready to replace chain to fork, it will be fail'), fork.get().length, sub_chain.length)
    fork.replaceChain(sub_chain)
} catch (e) {
    console.error(chalk.red(e.message))
}

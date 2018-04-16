/**
 * blockchain
 * Created by lintry on 2018/4/16.
 */

const Block = require('../lib/block')
const BlockChain = require('../lib/blockchain')

const genesis = new Block(0,
    '0',
    1523859505912,
    'First Block in the world!',
    '0000d4e1bc1da1efc882323f4521275efa40b38ae19648db8adf0c758d8df1a0',
    32058)

const bc = new BlockChain(genesis)

const found = new Block(1,
    '0000d4e1bc1da1efc882323f4521275efa40b38ae19648db8adf0c758d8df1a0',
    1523859579993,
    'I have a pen✏️',
    '0000524134d00f6dde40aa14dc25c52f2f5b9fe13b25f4d8ac5060f38eca333d',
    51142)

// 添加现有的区块
bc.append(found)
console.log('append a new block', bc.get().length)

let sub_chain = [genesis, found]

// 在现有区块上连续挖掘几个新区块
for ( let i = 2; i <= 6; i++) {
    sub_chain.push(sub_chain[sub_chain.length - 1].dig('hello new block: No.' + i))
}

// 添加一部分新区块
bc.append(sub_chain.slice(2, 4))
console.log('append some blocks', bc.get().length)

// 把所有的新区块产生的链替换原先的链
bc.replaceChain(sub_chain)

console.log('replace new chain', bc.get().length)

const fork = new BlockChain(genesis)
fork.append(fork.latestBlock.dig('fork block 1'))
fork.append(fork.latestBlock.dig('fork block 2'))
console.log('fork a chain', fork)

try {
    console.log('Ready to append sub chain to fork, it will be fail', fork.get().length, sub_chain.length)
    fork.append(sub_chain.slice(2, 4))
} catch (e) {
    console.error(e.message)
}

try {
    console.log('Ready to replace chain to fork, it will be fail', fork.get().length, sub_chain.length)
    fork.replaceChain(sub_chain)
} catch (e) {
    console.error(e.message)
}

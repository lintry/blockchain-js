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

bc.append(found)

const latest = bc.latestBlock

const newbie = latest.dig('hello new block')

bc.append(newbie)

console.log(bc.get())

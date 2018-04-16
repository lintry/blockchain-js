/**
 * 创建创世区块
 * Created by lintry on 2018/4/16.
 */

const Block = require('../lib/block')
const chalk = require('chalk')

const genesis = Block.genesis

console.log(chalk.cyan('Genesis block is'), genesis)

console.log(chalk.blue('dig new block'), genesis.dig('I have a pen✏️'))
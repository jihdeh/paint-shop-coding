#!/usr/bin/env node

const fileParser = require('./fileParser')
const getBestPaintCombination = require('./getBestPaintCombination')

const inputFile = process.argv[2]

if (!inputFile) {
  console.error('Missing input file argument')
  console.log(usage)
  process.exit(1)
}

try {
  const data = fileParser(inputFile)
  const result = getBestPaintCombination(data)

  console.log(result)
} catch (err) {
  console.error(err)
  process.exit(1)
}

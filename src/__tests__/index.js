const { spawn } = require('child_process')
const { join } = require('path')

describe('Check files and get solutions', () => {
  const cases = [
    ['testscenario1.txt', 'G G G G M'],
    ['testscenario2.txt', 'No solution exists'],
    ['testscenario3.txt', 'G M G M G'],
    ['testscenario4.txt', 'M M']
  ]

  cases.forEach(([file, expectedOutput], index) => {
    test(`Test case ${index}`, done => {
      const executable = join(__dirname, '..', 'index.js')
      const fileRead = spawn(executable, [ join(__dirname, '..', '..', 'testcases', file) ])

      let output = ''
      fileRead.stdout.on('data', function (data) {
        output += data
      })

      fileRead.on('exit', function (code) {
        expect(output.trim()).toEqual(expectedOutput)
        done()
      })

      fileRead.stdin.write('')
      fileRead.stdin.end()
      done()
    })
  })
})

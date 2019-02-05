const calculateResult = require('..')

test('If solution is not valid return no solution exists', done => {
  const customerColorInterest = [
    [{ color: 3, finish: 'G' }],
    [{ color: 3, finish: 'M' }]
  ]

  const expectedSolution = 'No solution exists'

  const solution = calculateResult({ numberOfColors: 3, customerColorInterest })
  expect(solution).toEqual(expectedSolution)

  done()
})

test('If solution is valid return result', done => {
  const customerColorInterest = [
    [{ color: 1, finish: 'G' }, { color: 2, finish: 'G' }],
    [{ color: 3, finish: 'M' }]
  ]

  const expectedSolution = 'G G M'

  const solution = calculateResult({ numberOfColors: 3, customerColorInterest })
  expect(solution).toEqual(expectedSolution)

  done()
})

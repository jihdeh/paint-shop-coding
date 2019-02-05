const structureCustomerColorInterest = require('../structureCustomerColorInterest')

test('It should sort customer preference and return result with fixedPaint fields', done => {
  const customerColorInterest = [
    [{ color: 2, finish: 'M' }, { color: 1, finish: 'M' }, { color: 1, finish: 'G' }],
    [{ color: 2, finish: 'G' }]
  ]

  const expectedPreparedCustomerColorInterest = [
    [{ color: 1, finish: 'G' }, { color: 1, finish: 'M' }, { color: 2, finish: 'M' }],
    [{ color: 2, finish: 'G', fixedPaint: true }]
  ]

  const preparedcustomerColorInterest = structureCustomerColorInterest(customerColorInterest)
  expect(preparedcustomerColorInterest).toEqual(expectedPreparedCustomerColorInterest)
  done()
})

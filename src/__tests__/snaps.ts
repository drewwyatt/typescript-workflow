import {} from 'models'

test('I can take a snapshot of an arbitrary string', () => {
  expect('wow').toMatchSnapshot(`"wow"`)
})

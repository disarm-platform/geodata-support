// tslint:disable:no-expression-statement
import test from 'ava'
import { unique_fields } from './summarise';

test('simple unique fields', t => {
  const properties_array = [{id: 1}, {id: 2}]
  const actual = unique_fields(properties_array)
  const expected = ['id']
  t.deepEqual(actual, expected)
})

test('more fields unique fields', t => {
  const properties_array = [{id: 1, egg: 2}, {id: 2, face: 3}]
  const actual = unique_fields(properties_array)
  const expected = ['id', 'egg', 'face']
  t.deepEqual(actual, expected)
})


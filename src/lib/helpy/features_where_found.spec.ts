// tslint:disable:no-expression-statement
import test from 'ava';
import { features_where_found } from './features_where_found';

test('real simpler', t => {
  const properties_array = [{id: 1}, {id: 2}]
  const actual = features_where_found('id', properties_array)
  const expected = [{id: 1}, {id: 2}]
  t.deepEqual(actual, expected)
})
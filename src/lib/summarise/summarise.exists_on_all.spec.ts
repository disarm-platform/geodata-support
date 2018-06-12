// tslint:disable:no-expression-statement
import test from 'ava';
import { exists_on_all_features } from './summarise';

test('does exist on all', t => {
  const properties_array = [{id: 1}, {id: 2}];
  const actual = exists_on_all_features('id', properties_array);
  const expected = true;
  t.is(actual, expected)
})

test('does NOT exist on all', t => {
  const properties_array = [{id: 1}, {other_id: 2}];
  const actual = exists_on_all_features('id', properties_array);
  const expected = false;
  t.is(actual, expected)
})



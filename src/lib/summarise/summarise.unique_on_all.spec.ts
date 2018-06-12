// tslint:disable:no-expression-statement
import test from 'ava';
import { unique_on_all } from './summarise';

test('is unique on all', t => {
  const properties_array = [{id: 1}, {id: 2}];
  const actual = unique_on_all('id', properties_array);
  const expected = true;
  t.is(actual, expected)
})

test('is NOT unique on all', t => {
  const properties_array = [{id: 1}, {id: 1}];
  const actual = unique_on_all('id', properties_array);
  const expected = false;
  t.is(actual, expected)
})

test('is unique when not given', t => {
  const properties_array = [{id: 1}, {other_id: 1}];
  const actual = unique_on_all('id', properties_array);
  const expected = true;
  t.is(actual, expected)
})
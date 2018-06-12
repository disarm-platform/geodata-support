// tslint:disable:no-expression-statement
import test from 'ava';
import { EFieldType} from '../summarise/summarise';
import { get_type } from './get_type';

test('consistent number type', t => {
  const properties_array = [{id: 1}, {id: 2}];
  const actual = get_type('id', properties_array);
  const expected = EFieldType.Number;
  t.is(actual, expected)
})

test('consistent number type with missing properties', t => {
  const properties_array = [{id: 1}, {id: 2}, {other_id: 'x'}];
  const actual = get_type('id', properties_array);
  const expected = EFieldType.Number;
  t.is(actual, expected)
})

test('consistent string type', t => {
  const properties_array = [{id: '1'}, {id: '2'}];
  const actual = get_type('id', properties_array);
  const expected = EFieldType.String;
  t.is(actual, expected)
})

test('consistent boolean type', t => {
  const properties_array = [{id: true}, {id: false}];
  const actual = get_type('id', properties_array);
  const expected = EFieldType.Boolean;
  t.is(actual, expected)
})

test('unreliable type', t => {
  const properties_array = [{id: '1'}, {id: 2}];
  const actual = get_type('id', properties_array);
  const expected = EFieldType.Unreliable;
  t.is(actual, expected)
})

test('unknown type', t => {
  const properties_array = [{id: {}}, {id: {}}];
  const actual = get_type('id', properties_array);
  const expected = EFieldType.Unreliable;
  t.is(actual, expected)
})

test('unknown and inconsistent type', t => {
  const properties_array = [{id: {}}, {id: 2}];
  const actual = get_type('id', properties_array);
  const expected = EFieldType.Unreliable;
  t.is(actual, expected)
})


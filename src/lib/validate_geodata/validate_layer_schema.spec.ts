// tslint:disable:no-expression-statement
import test from 'ava';
import { EValidationStatus } from '../../config_types/TValidationResponse';
import { validate_layer_schema } from './validate_layer_schema';

test('validation passes with simplest valid geojson', t => {
  const simplest_valid_geojson = {
    features: [],
    type: 'FeatureCollection'
  };

  const actual = validate_layer_schema(simplest_valid_geojson);
  const expected = EValidationStatus.Green;

  t.deepEqual(actual.status, expected);
});

test('must have a type', t => {
  const simplest_valid_geojson = {
    features: []
  };

  // @ts-ignore
  const actual = validate_layer_schema(simplest_valid_geojson);
  const expected = EValidationStatus.Red;

  t.is(actual.status, expected);
});

test('must have a features', t => {
  const simplest_valid_geojson = {
    type: 'FeatureCollection'
  };

  // @ts-ignore
  const actual = validate_layer_schema(simplest_valid_geojson);
  const expected = EValidationStatus.Red;

  t.is(actual.status, expected);
});

test('broken geojson', t => {
  const broken_geojson = {
    feature: [],
    type: 'Something else'
  };
  // @ts-ignore
  const actual = validate_layer_schema(broken_geojson);
  t.is(actual.status, EValidationStatus.Red);
  t.is(actual.message, 'Schema validation errors');
});
import test from 'ava';
import { EValidationStatus } from './validate';
import { validate_schema } from './validate_schema';

test('validation passes with simplest valid geojson', t => {
  const simplest_valid_geojson = {
    features: [],
    type: 'FeatureCollection'
  };

  const actual = validate_schema(simplest_valid_geojson);
  const expected = EValidationStatus.Green;

  t.deepEqual(actual.status, expected);
});

test('must have a type', t => {
  const simplest_valid_geojson = {
    features: []
  };

  const actual = validate_schema(simplest_valid_geojson);
  const expected = EValidationStatus.Red;

  t.is(actual.status, expected);
});

test('must have a features', t => {
  const simplest_valid_geojson = {
    type: 'FeatureCollection'
  };

  const actual = validate_schema(simplest_valid_geojson);
  const expected = EValidationStatus.Red;

  t.is(actual.status, expected);
});


/* tslint:disable */
import test from 'ava';
import { validate_geodata } from './validate_geodata';
import { EValidationStatus } from './TValidationResponse';

test('passes simplest valid geojson', (t) => {
  const simplest_valid_geojson = {
    features: [],
    type: 'FeatureCollection'
  };

  const actual = validate_geodata(simplest_valid_geojson);
  t.is(actual.status, EValidationStatus.Green);
  t.is(actual.message, 'Geodata is valid against schema and custom rules');
});

test('broken config', t => {
  const broken_geojson = {
    feature: [],
    type: 'Something else'
  };
  // @ts-ignore
  const actual = validate_geodata(broken_geojson);
  t.is(actual.status, EValidationStatus.Red);
  t.is(actual.message, 'Geodata has invalid schema');
});


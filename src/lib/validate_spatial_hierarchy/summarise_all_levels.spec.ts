// tslint:disable:no-expression-statement
import test from 'ava';
import { summarise_all_levels } from './summarise_all_levels';
import { EFieldType } from '../../config_types/TGeodataSummary';
import { TGeodata } from '../../config_types/TGeodata';

const base_feature = {
  'type': 'Feature',
  'properties': {},
  'geometry': { 'type': 'Polygon', 'coordinates': [[[1, 1], [1, 2], [2, 2], [1, 1]]] }
};

test('works with empty features', t => {
  const geodata = {
    villages: {
      type: 'FeatureCollection',
      features: []
    },
    constituencies: {
      type: 'FeatureCollection',
      features: []
    }
  }
  const actual = summarise_all_levels(geodata)
  const expected = {villages: [], constituencies: []}
  t.deepEqual(actual, expected)
});

test('works with not-empty features', t => {
  const geodata = {
    villages: {
      'type': 'FeatureCollection',
      'features': [
        { ...base_feature, properties: { id: 1 } }
      ]
    }
  };
  const actual = summarise_all_levels(geodata as TGeodata);
  const expected = {villages: [{field_name: 'id', unique: true, exists_on_all: true, type: EFieldType.Number}]};
  t.deepEqual(actual, expected);
});
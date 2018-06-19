// tslint:disable:no-expression-statement
import test from 'ava';
import { TGeodataLayer } from '../../config_types/TGeodata';
import { summarise} from './summarise';
import { EFieldType, TFieldSummary } from '../../config_types/TGeodataSummary';

const base_feature = { properties: {}, type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[0, 0], [0, 0]]] } }

test('has unique id field', t => {
  const geodata_layer = {
    type: 'FeatureCollection', features: [
      { ...base_feature, properties: { id: 1 } },
      { ...base_feature, properties: { id: 2 } }
    ]
  }
  const actual = summarise(geodata_layer as TGeodataLayer)
  const expected: TFieldSummary[] = [{
    field_name: 'id',
    exists_on_all: true,
    unique: true,
    type: EFieldType.Number,
  }]

  t.deepEqual(actual, expected)
})

test('inconsistent id field', t => {
  const geodata_layer = {
    type: 'FeatureCollection', features: [
      { ...base_feature, properties: { id: 1 } },
      { ...base_feature, properties: { id: '2' } }
    ]
  }
  const actual = summarise(geodata_layer as TGeodataLayer)
  const expected: TFieldSummary[] = [{
    field_name: 'id',
    exists_on_all: true,
    unique: true,
    type: EFieldType.Unreliable
  }]

  t.deepEqual(actual, expected)
})

test('inconsistent and missing id field', t => {
  const geodata_layer = {
    type: 'FeatureCollection', features: [
      { ...base_feature, properties: { id: 1 } },
      { ...base_feature, properties: { id: '2' } },
      { ...base_feature, properties: {} }
    ]
  }

  const actual = summarise(geodata_layer as TGeodataLayer)
  const expected: TFieldSummary[] = [{
    field_name: 'id',
    exists_on_all: false,
    unique: true,
    type: EFieldType.Unreliable
  }]

  t.deepEqual(actual, expected)
})

test('id field not on all, but unique where exists', t => {
  const geodata_layer = {
    type: 'FeatureCollection', features: [
      { ...base_feature, properties: { id: 1 } },
      { ...base_feature, properties: { other_id: 2 } }
    ]
  }
  const actual = summarise(geodata_layer as TGeodataLayer)
  const expected: TFieldSummary[] = [{
    field_name: 'id',
    exists_on_all: false,
    unique: true,
    type: EFieldType.Number
  }, {
    field_name: 'other_id',
    exists_on_all: false,
    unique: true,
    type: EFieldType.Number
  }]

  t.deepEqual(actual, expected)
})

test('id field includes unknown type (e.g. function)', t => {
  const geodata_layer = {
    type: 'FeatureCollection', features: [
      { ...base_feature, properties: { id: 1 } },
      { ...base_feature, properties: { id: () => 2 } }
    ]
  }
  const actual = summarise(geodata_layer as TGeodataLayer)
  const expected: TFieldSummary[] = [{
    field_name: 'id',
    exists_on_all: true,
    unique: true,
    type: EFieldType.Unreliable
  }]

  t.deepEqual(actual, expected)
})

test('can summarise empty layers', t => {
  const geodata_layer = { type: 'FeatureCollection', features: [] };
  const actual = summarise(geodata_layer);
  const expected = [];
  t.deepEqual(actual, expected);
});
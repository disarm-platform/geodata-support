// tslint:disable:no-expression-statement
import test from 'ava';
import { TGeodataLayer } from '../../config_types/TGeodata';
import { EFieldType, summarise, TFieldSummary } from './summarise';


test('has unique id field', t => {
  const base_feature = {properties: {}, type: 'Feature',geometry: {type: 'Polygon', coordinates: [[[0,0],[0,0]]]}}
  const geodata_layer = {type: 'FeatureCollection', features: [
    {...base_feature, properties: {id: 1}},
    {...base_feature, properties: {id: 2}}
  ]} as TGeodataLayer
  const actual = summarise(geodata_layer)
  const expected = [{
    field_name: 'id',
    exists_on_all: true,
    unique: true,
    type: EFieldType.Number,
  } as TFieldSummary]

  t.deepEqual(actual, expected)
})

test('inconsistent id field', t => {
  const base_feature = {properties: {}, type: 'Feature',geometry: {type: 'Polygon', coordinates: [[[0,0],[0,0]]]}}
  const geodata_layer = {type: 'FeatureCollection', features: [
    {...base_feature, properties: {id: 1}},
    {...base_feature, properties: {id: '2'}}
  ]} as TGeodataLayer
  const actual = summarise(geodata_layer)
  const expected = [{
    field_name: 'id',
    exists_on_all: true,
    unique: true,
    type: EFieldType.Unreliable
  } as TFieldSummary]

  t.deepEqual(actual, expected)
})

test('inconsistent and missing id field', t => {
  const base_feature = {properties: {}, type: 'Feature',geometry: {type: 'Polygon', coordinates: [[[0,0],[0,0]]]}}
  const geodata_layer = {type: 'FeatureCollection', features: [
    {...base_feature, properties: {id: 1}},
    {...base_feature, properties: {id: '2'}},
    {...base_feature, properties: {}}
  ]} as TGeodataLayer

  const actual = summarise(geodata_layer)
  const expected = [{
    field_name: 'id',
    exists_on_all: false,
    unique: true,
    type: EFieldType.Unreliable
  } as TFieldSummary]

  t.deepEqual(actual, expected)
})

test('id field not on all, but unique where exists', t => {
  const base_feature = {properties: {}, type: 'Feature',geometry: {type: 'Polygon', coordinates: [[[0,0],[0,0]]]}}
  const geodata_layer = {type: 'FeatureCollection', features: [
    {...base_feature, properties: {id: 1}},
    {...base_feature, properties: {other_id: 2}}
  ]} as TGeodataLayer
  const actual = summarise(geodata_layer)
  const expected = [{
    field_name: 'id',
    exists_on_all: false,
    unique: true,
    type: EFieldType.Number
  } as TFieldSummary, {
    field_name: 'other_id',
    exists_on_all: false,
    unique: true,
    type: EFieldType.Number
  }]

  t.deepEqual(actual, expected)
})

test('id field includes unknown type (e.g. function)', t => {
  const base_feature = {properties: {}, type: 'Feature',geometry: {type: 'Polygon', coordinates: [[[0,0],[0,0]]]}}
  const geodata_layer = {type: 'FeatureCollection', features: [
    {...base_feature, properties: {id: 1}},
    {...base_feature, properties: {id: function(){}}}
  ]} as TGeodataLayer
  const actual = summarise(geodata_layer)
  const expected = [{
    field_name: 'id',
    exists_on_all: true,
    unique: true,
    type: EFieldType.Unreliable
  } as TFieldSummary]

  t.deepEqual(actual, expected)
})
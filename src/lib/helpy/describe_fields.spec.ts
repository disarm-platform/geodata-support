// tslint:disable:no-expression-statement
import test from "ava";
import { GeoJsonFeatureCollection } from "../../config_types/TGeoJSON";
import { all_property_fields, common_fields, describe_fields, unique_property_fields } from "./describe_fields";

const valid_geojson_with_unique_id = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1, not_all: "value" } },
    { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 2 } }
  ]
} as GeoJsonFeatureCollection;

test('list all fields from any features', t => {
  const actual = all_property_fields(valid_geojson_with_unique_id);
  const expected = ['id', 'not_all', 'id'];
  t.deepEqual(actual, expected);
});

test('unique fields from all features', t => {
  const actual = unique_property_fields(valid_geojson_with_unique_id);
  const expected = ['id', 'not_all'];
  t.deepEqual(actual, expected);
});

test('fields which exist on every feature', t => {
  const actual = common_fields(valid_geojson_with_unique_id);
  const expected = ['id'];
  t.deepEqual(actual, expected);
});

test('describe all fields', t => {
  const unique_fields = unique_property_fields(valid_geojson_with_unique_id)
  const actual = describe_fields(valid_geojson_with_unique_id, unique_fields);
  const expected = [{ name: 'id', type: 'number', count: 2 }, { name: 'not_all', type: 'string', count: 1 }];
  t.deepEqual(actual, expected);
});

test('describe empty properties', t => {
  const geojson = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: {}},
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: {}}
    ]
  } as GeoJsonFeatureCollection;
  const unique_fields = unique_property_fields(geojson)

  const actual = describe_fields(geojson, unique_fields);
  const expected = [];
  t.deepEqual(actual, expected);
});

test('describe common fields', t => {
  const fields = common_fields(valid_geojson_with_unique_id);
  const actual = describe_fields(valid_geojson_with_unique_id, fields);
  const expected = [{name: 'id', type: 'number', count: 2}];
  t.deepEqual(actual, expected);
});

test('describe fields with inconsistent types', t => {
  const geojson_with_inconsistent_types = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1, not_all: "value" } },
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: '2' } }
    ]
  } as GeoJsonFeatureCollection;
  const fields = common_fields(geojson_with_inconsistent_types);
  const actual = describe_fields(geojson_with_inconsistent_types, fields)
  const expected = [{name: 'id', type: 'inconsistent', count: 2}]
  t.deepEqual(actual, expected)
})
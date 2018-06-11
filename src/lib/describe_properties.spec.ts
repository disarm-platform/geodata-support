/* tslint:disable */
import test from "ava";
import { describe_properties } from "./describe_properties";
import { GeoJsonFeatureCollection } from "./support/TGeoJSON";


const valid_geojson_with_unique_id = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1, not_all: "value" } },
    { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 2 } }
  ]
} as GeoJsonFeatureCollection;


test('basic', t => {
  const single = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1, not_all: "value" } },
    ]
  } as GeoJsonFeatureCollection

  const actual = describe_properties(single)
  const expected = [{ name: 'id', type: 'number', on_all: true, unique: true }, { name: 'not_all', type: 'string', on_all: true, unique: true }];
  t.deepEqual(actual, expected);
});


test('less basic', t => {
  const actual = describe_properties(valid_geojson_with_unique_id)
  const expected = [{ name: 'id', type: 'number', on_all: true, unique: true }, { name: 'not_all', type: 'string', on_all: false, unique: true }];
  t.deepEqual(actual, expected);
});

//
// test('all properties', t => {
//   const actual = all_properties(valid_geojson_with_unique_id)
//   const expected = [{ id: 1, not_all: "value" }, { id: 2 }]
//   t.deepEqual(actual, expected);
// });
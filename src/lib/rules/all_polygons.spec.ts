import test from 'ava';
import { all_polygons } from './all_polygons';
import { GeoJsonFeatureCollection } from '../TGeoJSON';

const geojson_with_multipolygon = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1, not_all: "value" } },
    { type: 'Feature', geometry: { type: 'MultiPolygon', coordinates: [] }, properties: { id: 2 } }
  ]
} as GeoJsonFeatureCollection;

const geojson_without_multipolygon = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1, not_all: "value" } },
    { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 2 } }
  ]
} as GeoJsonFeatureCollection;

test('finds a multiPolygon', t => {
  const actual = all_polygons(geojson_with_multipolygon)
  const expected = false
  t.is(actual, expected)
});

test('passes with no MultiPolygon', t => {
  const actual = all_polygons(geojson_without_multipolygon)
  const expected = true
  t.is(actual, expected)
});
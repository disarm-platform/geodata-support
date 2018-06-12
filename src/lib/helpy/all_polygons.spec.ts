// tslint:disable:no-expression-statement
import test from 'ava';
import { GeoJsonFeatureCollection } from '../../config_types/TGeoJSON';
import { all_polygons } from './all_polygons';


test('passes with only Polygons', t => {
  const geojson = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1, not_all: "value" } },
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 2 } }
    ]
  } as GeoJsonFeatureCollection;
  
  const actual = all_polygons(geojson)
  const expected = true
  t.is(actual, expected)
});

test('no Lines allowed', t => {
  const geojson_with_line = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1, not_all: "value" } },
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 2 } },
      { type: 'Feature', geometry: { type: 'Line', coordinates: [] }, properties: { id: 2 } },
    ]
  } as GeoJsonFeatureCollection;
  
  const actual = all_polygons(geojson_with_line)
  const expected = false
  t.is(actual, expected)
});

test('no Points allowed', t => {
  const geojson_with_point = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1, not_all: "value" } },
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 2 } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [] }, properties: { id: 2 } },
    ]
  } as GeoJsonFeatureCollection;
  
  const actual = all_polygons(geojson_with_point)
  const expected = false
  t.is(actual, expected)
});

test('no MultiPolygons allowed', t => {
  const geojson_with_multipolygon = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1, not_all: "value" } },
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 2 } },
      { type: 'Feature', geometry: { type: 'MultiPolygon', coordinates: [] }, properties: { id: 2 } },
    ]
  } as GeoJsonFeatureCollection;
  
  const actual = all_polygons(geojson_with_multipolygon)
  const expected = false
  t.is(actual, expected)
});
import test from "ava";
import { GeoJsonFeatureCollection } from "../TGeoJSON";
import { id_field_unique } from './id_field_unique'

/* tslint:disable */
test('detect non-uniques', t => {
  const sample_geojson = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1 } },
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1 } }
    ]
  } as GeoJsonFeatureCollection
  
  const actual = id_field_unique(sample_geojson, 'id')
  t.false(actual)
})

test('detect uniques', t => {
  const sample_geojson = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1 } },
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 2 } }
    ]
  } as GeoJsonFeatureCollection
  
  const actual = id_field_unique(sample_geojson, 'id')
  t.true(actual)
})
import test from "ava";
import { GeoJsonFeatureCollection } from "./TGeoJSON";
import { describe_fields } from "./describe_fields";

test('get back a summary of fields available', t => {
  const sample_geojson = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1 } },
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }, properties: { id: 1 } }
    ]
  } as GeoJsonFeatureCollection

  const actual = describe_fields(sample_geojson)
  const expected = [{name: 'id'}]
  t.deepEqual(actual, expected, 'Difference');

});
/* tslint:disable */
import test from 'ava';
import { validate_geodata } from './validate_geodata';
import { EValidationStatus } from './TValidationResponse';
import { GeoJsonFeatureCollection } from '../../config_types/TGeoJSON';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';

const base_spatial_hierarchy = {
  levels: [{field_name: 'id'}], 
  markers: {planning_level_name: 'x', record_location_selection_level_name: 'x'}, 
  data_version: 0
} as TSpatialHierarchy


test('passes simplest valid geojson', (t) => {
  const simplest_valid_geojson = {
    features: [],
    type: 'FeatureCollection'
  };

  const actual = validate_geodata(simplest_valid_geojson, base_spatial_hierarchy);
  t.is(actual.status, EValidationStatus.Green);
  t.is(actual.message, 'Geodata is valid against schema and custom rules');
});

test('broken config', t => {
  const broken_geojson = {
    feature: [],
    type: 'Something else'
  };
  // @ts-ignore
  const actual = validate_geodata(broken_geojson, base_spatial_hierarchy);
  t.is(actual.status, EValidationStatus.Red);
  t.is(actual.message, 'Geodata has invalid schema');
});

test('break the uniqueID rule', t => {
  const non_unique_ids = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "id": 1
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                30.585937499999996,
                27.059125784374068
              ],
              [
                50.9765625,
                27.059125784374068
              ],
              [
                50.9765625,
                45.82879925192134
              ],
              [
                30.585937499999996,
                45.82879925192134
              ],
              [
                30.585937499999996,
                27.059125784374068
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": 1
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -19.335937499999996,
                15.623036831528264
              ],
              [
                0.703125,
                15.623036831528264
              ],
              [
                0.703125,
                35.17380831799959
              ],
              [
                -19.335937499999996,
                35.17380831799959
              ],
              [
                -19.335937499999996,
                15.623036831528264
              ]
            ]
          ]
        }
      }
    ]
  } as GeoJsonFeatureCollection

  const actual = validate_geodata(non_unique_ids, base_spatial_hierarchy);
  const expected = EValidationStatus.Red;

  t.is(actual.status, expected);
})
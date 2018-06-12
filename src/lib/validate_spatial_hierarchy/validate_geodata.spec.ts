/* tslint:disable */
import test from 'ava';
import { validate_geodata_layer } from './validate_geodata_layer';
import { EValidationStatus } from '../../config_types/TValidationResponse';
import { GeoJsonFeatureCollection } from '../../config_types/TGeoJSON';

test('passes simplest valid geojson', (t) => {
  const simplest_valid_geojson = {
    features: [],
    type: 'FeatureCollection'
  };

  const actual = validate_geodata_layer(simplest_valid_geojson);
  t.is(actual.status, EValidationStatus.Green);
  t.is(actual.message, 'Geodata is valid against schema and custom rules');
});

test('broken config', t => {
  const broken_geojson = {
    feature: [],
    type: 'Something else'
  };
  // @ts-ignore
  const actual = validate_geodata_layer(broken_geojson);
  t.is(actual.status, EValidationStatus.Red);
  t.is(actual.message, 'Geodata has invalid schema');
});

test('ignore unique_id rule - not part of this validation step', t => {
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

  const actual = validate_geodata_layer(non_unique_ids);
  const expected = EValidationStatus.Green;

  t.is(actual.status, expected);
})
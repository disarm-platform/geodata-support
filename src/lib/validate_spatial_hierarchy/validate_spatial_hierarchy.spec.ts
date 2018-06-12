// tslint:disable:no-expression-statement
import test from 'ava';
import { TGeodata, TGeodataLayer } from '../../config_types/TGeodata';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus } from '../../config_types/TValidationResponse';
import { validate_spatial_hierarchy } from './validate_spatial_hierarchy';

const base_feature = {
  'type': 'Feature',
  'properties': {},
  'geometry': { 'type': 'Polygon', 'coordinates': [[[1, 1], [1, 2], [2, 2], [1, 1]]] }
};

test('simple valid geodata and spatial_hierarchy', t => {
  const geodata: TGeodata = {
    villages: {
      'type': 'FeatureCollection',
      'features': [
        { ...base_feature, properties: { id: 1 } }
      ]
    } as TGeodataLayer
  };
  const spatial_hierarchy: TSpatialHierarchy = {
    data_version: 0,
    markers: {
      planning_level_name: 'level',
      record_location_selection_level_name: 'level',
      denominator_fields: {
        field1: 'field1'
      }
    },
    levels: [
      {
        name: 'villages',
        field_name: 'id',
        display_field_name: 'id'
      }
    ]
  };
  const actual = validate_spatial_hierarchy(spatial_hierarchy, geodata);
  const expected = EValidationStatus.Green;
  t.is(actual.status, expected);
});
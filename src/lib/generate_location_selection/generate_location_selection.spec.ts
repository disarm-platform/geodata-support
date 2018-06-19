// tslint:disable:no-expression-statement
import test from 'ava'
import { generate_location_selection } from './generate_location_selection';
import { TGeodata } from '../../config_types/TGeodata';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus } from '../../config_types/TValidationResponse';

test('returns valid location_selection', t => {
  const geodata: TGeodata = {
    villages: {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {id: 1, name: '1', grouping: 'group_1'},
          'geometry': { 'type': 'Polygon', 'coordinates': [[[1, 1], [1, 2], [2, 2], [1, 1]]] }
        },
        {
          'type': 'Feature',
          'properties': { id: 2, name: '2', grouping: 'group_2' },
          'geometry': { 'type': 'Polygon', 'coordinates': [[[1, 1], [1, 2], [2, 2], [1, 1]]] }
        }
      ]
    }
  }

  const spatial_hierarchy: TSpatialHierarchy = {
    data_version: 0,
    markers: {
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
      denominator_fields: {
        field1: 'id'
      }
    },
    levels: [
      {
        name: 'villages',
        field_name: 'id',
        display_field_name: 'name',
        group_by_field: 'grouping'
      }
    ]
  };

  const actual = generate_location_selection(spatial_hierarchy, geodata)
  const expected = {
    villages: [
      {
        id: 1,
        name: '1',
        category: 'group_1'
      },
      {
        id: 2,
        name: '2',
        category: 'group_2'
      }
    ]
  }

  t.deepEqual(actual, expected)
})

test('returns validation result when input is invalid', t => {
  const geodata: TGeodata = {
    villages: {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': { id: 1, name: '1', grouping: 'group_1' },
          'geometry': { 'type': 'Polygon', 'coordinates': [[[1, 1], [1, 2], [2, 2], [1, 1]]] }
        },
        {
          'type': 'Feature',
          'properties': { id: 2, name: '2', grouping: 'group_2' },
          'geometry': { 'type': 'Polygon', 'coordinates': [[[1, 1], [1, 2], [2, 2], [1, 1]]] }
        }
      ]
    }
  }

  const spatial_hierarchy: TSpatialHierarchy = {
    data_version: 0,
    markers: {
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
      denominator_fields: {
        field1: 'id'
      }
    },
    levels: [
      {
        name: 'structures', // error is here
        field_name: 'id',
        display_field_name: 'name',
        group_by_field: 'grouping'
      }
    ]
  };

  const actual = generate_location_selection(spatial_hierarchy, geodata)
  const expected = EValidationStatus.Red
  // @ts-ignore
  t.is(actual.status, expected)
})
// tslint:disable:no-expression-statement
import test from 'ava';
import { TGeodata, TGeodataLayer } from '../../config_types/TGeodata';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';
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
        display_field_name: 'id'
      }
    ]
  };
  const actual = validate_spatial_hierarchy(spatial_hierarchy, geodata);
  const expected = EValidationStatus.Green;
  console.log('actual.support_messages', actual.support_messages);
  t.is(actual.status, expected);
});

test('simple geodata and spatial_hierarchy but with some NotPolygons', t => {
  const geodata: TGeodata = {
    // @ts-ignore
    villages: {
      'type': 'FeatureCollection',
      'features': [
        { ...base_feature, properties: { id: 1 }, geometry: { type: 'Point', coordinates: [0, 0] } }
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
  const expected = {
    message: 'Some layers are not valid geodata: either schema failed or some Features are not Polygons',
    status: EValidationStatus.Red,
  } as TValidationResponse;
  t.is(actual.status, expected.status);
  t.is(actual.message, expected.message);
});

test('valid geodata, but fields in sh not found in geodata', t => {
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
        field_name: 'other_id',
        display_field_name: 'other_id'
      }
    ]
  };
  const actual = validate_spatial_hierarchy(spatial_hierarchy, geodata);
  const expected = {
    message: 'Some fields missing from the level definition',
    status: EValidationStatus.Red
  } as TValidationResponse;
  t.is(actual.status, expected.status);
  t.is(actual.message, expected.message);
});

test('valid geodata, but planning_level_name in markers is not', t => {
  const geodata = {
    villages: {
      'type': 'FeatureCollection',
      'features': [
        { ...base_feature, properties: { id: 1 } }
      ]
    }
  };

  const spatial_hierarchy: TSpatialHierarchy = {
    data_version: 0,
    markers: {
      planning_level_name: 'structures',
      record_location_selection_level_name: 'structures',
      denominator_fields: {
        field1: 'id'
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
  const actual = validate_spatial_hierarchy(spatial_hierarchy, geodata as TGeodata);
  const expected = EValidationStatus.Red;
  t.is(actual.status, expected);
})

test('simple valid geodata but with duplicate ids', t => {
  const geodata = {
    villages: {
      'type': 'FeatureCollection',
      'features': [
        { ...base_feature, properties: { id: 1, name: '1' } },
        { ...base_feature, properties: { id: 1, name: '2' } }
      ]
    }
  };
  const spatial_hierarchy: TSpatialHierarchy = {
    data_version: 0,
    markers: {
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
      denominator_fields: {
      }
    },
    levels: [
      {
        name: 'villages',
        field_name: 'id',
        display_field_name: 'name'
      }
    ]
  };
  const actual = validate_spatial_hierarchy(spatial_hierarchy, geodata as TGeodata);
  const expected = EValidationStatus.Red;
  t.is(actual.status, expected);
});
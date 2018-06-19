// tslint:disable:no-expression-statement
import test from 'ava';
import { EFieldType, TGeodataSummary } from '../../config_types/TGeodataSummary';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus } from '../../config_types/TValidationResponse';
import { valid_id_fields } from './valid_id_fields';

test('basic', t => {
  const sh: TSpatialHierarchy = {
    data_version: 0,
    levels: [
      {
        name: 'villages',
        field_name: 'id',
        display_field_name: 'id'
      }
    ],
    markers: {
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
      denominator_fields: {
        denominator_fields1: 'id'
      }
    }
  };

  const summary: TGeodataSummary = {
    villages: [
      {
        field_name: 'id',
        exists_on_all: true,
        unique: true,
        type: EFieldType.Number
      }
    ]
  };
  const actual = valid_id_fields(sh, summary).map(a => a.status);
  const expected = [EValidationStatus.Green];
  t.deepEqual(actual, expected);
});

test('fail with duplicate ids', t => {
  const sh: TSpatialHierarchy = {
    data_version: 0,
    levels: [
      {
        name: 'villages',
        field_name: 'id',
        display_field_name: 'id'
      }
    ],
    markers: {
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
      denominator_fields: {
        denominator_fields1: 'id'
      }
    }
  };

  const summary: TGeodataSummary = {
    villages: [
      {
        field_name: 'id',
        exists_on_all: true,
        unique: false,
        type: EFieldType.Number
      }
    ]
  };
  const actual = valid_id_fields(sh, summary).map(a => a.status);
  const expected = [EValidationStatus.Red];
  t.deepEqual(actual, expected);
});
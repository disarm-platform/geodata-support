// tslint:disable:no-expression-statement
import test from 'ava';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus } from '../../config_types/TValidationResponse';
import { markers_valid } from './markers_valid';
import { EFieldType } from '../../config_types/TGeodataSummary';
import { TGeodataSummary } from '../../config_types/TGeodataSummary';

test('planning_level_name is a level in geodata', t => {
  const geodata_summary = {
    villages: [{field_name: 'denominator_field', unique: true, exists_on_all: true, type: EFieldType.Number}]
  } as TGeodataSummary

  const sh = {
    data_version: 0,
    levels: [],
    markers: {
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
      denominator_fields: {
        denominator1: 'denominator_field'
      }
    }
  } as TSpatialHierarchy;

  const actual = markers_valid(sh, geodata_summary);
  const expected = EValidationStatus.Green;
  t.is(actual.status, expected)
});

test('planning_level_name is NOT a level in geodata', t => {
  const geodata_summary = {
    not_villages: [{field_name: 'denominator_field', unique: true, exists_on_all: true, type: EFieldType.Number}]
  } as TGeodataSummary

  const sh = {
    data_version: 0,
    levels: [],
    markers: {
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
      denominator_fields: {
        denominator1: 'denominator_field'
      }
    }
  } as TSpatialHierarchy;

  const actual = markers_valid(sh, geodata_summary);
  const expected = EValidationStatus.Red;
  t.is(actual.status, expected)
});

test('record_location_selection_level_name is a level in geodata', t => {
  const geodata_summary = {
    villages: [{field_name: 'denominator_field', unique: true, exists_on_all: true, type: EFieldType.Number}]
  } as TGeodataSummary

  const sh = {
    data_version: 0,
    levels: [],
    markers: {
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
      denominator_fields: {
        denominator1: 'denominator_field'
      }
    }
  } as TSpatialHierarchy;

  const actual = markers_valid(sh, geodata_summary);
  const expected = EValidationStatus.Green;
  t.is(actual.status, expected)
});

test('record_location_selection_level_name is NOT a level in geodata', t => {
  const geodata_summary = {
    not_villages: [{field_name: 'id', unique: true, exists_on_all: true, type: EFieldType.Number}]
  } as TGeodataSummary

  const sh = {
    data_version: 0,
    levels: [],
    markers: {
      planning_level_name: 'not_villages',
      record_location_selection_level_name: 'villages',
      denominator_fields: {
        denominator1: 'denominator_field'
      }
    }
  } as TSpatialHierarchy;

  const actual = markers_valid(sh, geodata_summary);
  const expected = EValidationStatus.Red;
  t.is(actual.status, expected)
});


test('denominator_fields exist on geodata', t => {
  const geodata_summary = {
    villages: [{field_name: 'denominator_field', unique: true, exists_on_all: true, type: EFieldType.Number}]
  } as TGeodataSummary

  const sh = {
    data_version: 0,
    levels: [],
    markers: {
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
      denominator_fields: {
        denominator1: 'denominator_field'
      }
    }
  } as TSpatialHierarchy;

  const actual = markers_valid(sh, geodata_summary);
  const expected = EValidationStatus.Green;
  t.is(actual.status, expected)
});

test('denominator_fields DO NOT exist on geodata', t => {
  const geodata_summary = {
    villages: [{field_name: 'denominator_field', unique: true, exists_on_all: true, type: EFieldType.Number}]
  } as TGeodataSummary

  const sh = {
    data_version: 0,
    levels: [],
    markers: {
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
      denominator_fields: {
        denominator1: 'different_denominator_field'
      }
    }
  } as TSpatialHierarchy;

  const actual = markers_valid(sh, geodata_summary);
  const expected = EValidationStatus.Red;
  t.is(actual.status, expected)
});
// tslint:disable:no-expression-statement
import test from 'ava';
import { TLevel } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus } from '../../config_types/TValidationResponse';
import { EFieldType, TFieldSummary } from '../summarise/summarise';
import { required_properties_on_sh_level } from './required_properties_on_sh_level';

test('basic', t => {
  const sh_level: TLevel = {
    field_name: 'id',
    display_field_name: 'display',
    name: 'name'
  };

  const layer_summary: TFieldSummary[] = [{
    field_name: 'id',
    exists_on_all: true,
    type: EFieldType.Number,
    unique: true
  }];

  const actual = required_properties_on_sh_level(sh_level, layer_summary);
  const expected = EValidationStatus.Green;

  t.is(actual.status, expected);
});

test('two, both present', t => {
  const sh_level: TLevel = {
    group_by_field: 'group_by_this',
    field_name: 'id',
    display_field_name: 'display',
    name: 'name'
  };

  const layer_summary: TFieldSummary[] = [{
    field_name: 'id',
    exists_on_all: true,
    type: EFieldType.Number,
    unique: true
  }, {
    field_name: 'group_by_this',
    exists_on_all: true,
    type: EFieldType.Number,
    unique: false
  }];

  const actual = required_properties_on_sh_level(sh_level, layer_summary);
  const expected = EValidationStatus.Green;

  t.is(actual.status, expected);
})

test('two, one missing', t => {
  const sh_level: TLevel = {
    group_by_field: 'group_by_this',
    field_name: 'id',
    display_field_name: 'display',
    name: 'name'
  };

  const layer_summary: TFieldSummary[] = [{
    field_name: 'id',
    exists_on_all: true,
    type: EFieldType.Number,
    unique: true
  }];

  const actual = required_properties_on_sh_level(sh_level, layer_summary);
  const expected = EValidationStatus.Red;

  t.is(actual.status, expected);
});
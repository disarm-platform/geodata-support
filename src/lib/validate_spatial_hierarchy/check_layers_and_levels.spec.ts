// tslint:disable:no-expression-statement
import test from 'ava';
import { EValidationStatus } from '../../config_types/TValidationResponse';
import { check_layers_and_levels } from './check_layers_and_levels';

test('simplest existing, match', t => {
  const geodata_layer_names = ['villages'];
  const sh_level_names = ['villages'];
  const actual = check_layers_and_levels(geodata_layer_names, sh_level_names);
  const expected = EValidationStatus.Green;
  t.is(actual.status, expected);
});

test('more that match, order does not matter', t => {
  const geodata_layer_names = ['villages', 'constituencies'];
  const sh_level_names = ['constituencies', 'villages'];
  const actual = check_layers_and_levels(geodata_layer_names, sh_level_names);
  const expected = EValidationStatus.Green;
  t.is(actual.status, expected);
});

test('some in geodata not in sh_levels', t => {
  const geodata_layer_names = ['villages', 'constituencies'];
  const sh_level_names = ['villages'];
  const actual = check_layers_and_levels(geodata_layer_names, sh_level_names);
  const expected = {
    message: 'Missing fields from spatial_hierarchy levels',
    status: EValidationStatus.Red
  };
  t.is(actual.status, expected.status);
  t.is(actual.message, expected.message);
});

test('some in sh_levels not in geodata', t => {
  const geodata_layer_names = ['villages'];
  const sh_level_names = ['villages', 'constituencies'];
  const actual = check_layers_and_levels(geodata_layer_names, sh_level_names);
  const expected = {
    message: 'Missing fields from geodata levels',
    status: EValidationStatus.Red
  };
  t.is(actual.status, expected.status);
  t.is(actual.message, expected.message);
});
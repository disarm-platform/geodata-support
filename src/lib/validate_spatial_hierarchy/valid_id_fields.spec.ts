// tslint:disable:no-expression-statement
import test from 'ava';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { TGeodataSummary } from './summarise_all_levels';
import { valid_id_fields } from './valid_id_fields';
import { EValidationStatus } from '../../config_types/TValidationResponse';

test('basic', t => {
  const sh = {} as TSpatialHierarchy;
  const summary = {} as TGeodataSummary;
  const actual = valid_id_fields(sh, summary);
  const expected = [EValidationStatus.Green]
  t.is(actual.map(a => a.status), expected)
});
import { flatten, get } from 'lodash';
import { TLevel } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';
import { TFieldSummary } from '../summarise/summarise';

export function required_properties_on_sh_level(spatial_hierarchy_level: TLevel, geodata_properties_summary: TFieldSummary[]): TValidationResponse {

  const required_fields = ['group_by_field', 'field_name']
    .map(n => get(spatial_hierarchy_level, n))
    .filter(i => i);

  const all_required_fields_exist = required_fields.map((field_name): TValidationResponse => {
    const found = geodata_properties_summary.find(s => s.field_name === field_name);
    if (found) {
      return {
        message: 'Found',
        status: EValidationStatus.Green,
        support_messages: []
      };
    } else {
      return {
        message: `${field_name} missing`,
        status: EValidationStatus.Red,
        support_messages: [`${field_name} missing from geodata properties`]
      };
    }
  });

  if (all_required_fields_exist.every(e => e.status === EValidationStatus.Green)) {
    return {
      message: 'All required fields exist',
      status: EValidationStatus.Green
    };
  } else {
    return {
      message: 'Missing fields',
      status: EValidationStatus.Red,
      support_messages: flatten(all_required_fields_exist.map(e => e.support_messages))
    };
  }
}
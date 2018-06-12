import { difference } from 'lodash';
import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';

export function check_layers_and_levels(geodata_layer_names, sh_level_names): TValidationResponse {
  const missing_from_geodata   = difference<string>(sh_level_names, geodata_layer_names);
  const missing_from_sh_levels = difference<string>(geodata_layer_names, sh_level_names);

  if (missing_from_geodata.length > 0) {
    return {
      message: 'Missing fields from geodata levels',
      status: EValidationStatus.Red,
      support_messages: missing_from_geodata
    };
  } else if (missing_from_sh_levels.length > 0) {
    return {
      message: 'Missing fields from spatial_hierarchy levels',
      status: EValidationStatus.Red,
      support_messages: missing_from_sh_levels 
    };
  } else if (missing_from_geodata.length === 0 && missing_from_sh_levels.length === 0) {
    return {
      message: 'Levels match geodata and spatial_hierarchy',
      status: EValidationStatus.Green
    };
  } else {
    return {
      message: 'Unknown status of match between geodata layers and spatial_hierarchy levels',
      status: EValidationStatus.Red
    }
  }
}
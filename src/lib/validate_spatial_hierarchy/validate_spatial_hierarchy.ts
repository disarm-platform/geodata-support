import { TGeodataLayer } from '../../config_types/TGeodata';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';

export function validate_spatial_hierarchy(_spatial_hierarchy: TSpatialHierarchy, _layer: TGeodataLayer): TValidationResponse {

  // Every property given in spatial_hierarchy exists in the geodata
  // const geodata_summary = summarise(layer)

  return {
    message: 'Invalid spatial_hierarchy',
    status: EValidationStatus.Red,
    support_messages: ['a']
  }
}
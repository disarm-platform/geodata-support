import { TGeodata } from '../../config_types/TGeodata';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { summarise } from '../summarise';
import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';

export function validate_spatial_hierarchy(spatial_hierarchy: TSpatialHierarchy, geodata: TGeodata): TValidationResponse {

  // Every property given in spatial_hierarchy exists in the geodata

  const geodata_summary = summarise(geodata)

  return {
    message: 'Invalid spatial_hierarchy',
    status: EValidationStatus.Red,
    support_messages: ['a']
  }
}
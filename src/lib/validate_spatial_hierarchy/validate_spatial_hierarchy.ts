import { TGeodata } from '../../config_types/TGeodata';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus, TValidationResponse } from '../validate/TValidationResponse';
import { summarise } from '../summarise';
import { GeoJsonFeatureCollection } from '../../config_types/TGeoJSON';

export function validate_spatial_hierarchy(spatial_hierarchy: TSpatialHierarchy, geodata: GeoJsonFeatureCollection): TValidationResponse {

  // Every property given in spatial_hierarchy exists in the geodata

  const geodata_summary = summarise(geodata)

  return {
    message: 'Invalid spatial_hierarchy',
    status: EValidationStatus.Red,
    support_messages: ['a']
  }
}
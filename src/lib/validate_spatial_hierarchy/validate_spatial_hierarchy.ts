import { flatten } from 'lodash';
import { TGeodata } from '../../config_types/TGeodata';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';
import { validate_layer_schema } from '../validate_geodata';
import { check_layers_and_levels } from './check_layers_and_levels';

/**
 * Confirm that the given spatial_hierarchy config object is valid against the given array of geodata layers.
 * For example, that the fields exist, that all layers contain only polygons, and that id fields are unique, exist on
 * all features and have consistent type.
 * @param {TSpatialHierarchy} spatial_hierarchy
 * @param {TGeodata} geodata
 * @returns {TValidationResponse}
 */
export function validate_spatial_hierarchy(spatial_hierarchy: TSpatialHierarchy, geodata: TGeodata): TValidationResponse {
  const geodata_layer_names = Object.keys(geodata)
  const sh_level_names = spatial_hierarchy.levels.map(level => level.name)

  // Check every geodata layer is valid, and return early if not
  const validated_layers = geodata_layer_names.map(layer_name => {
    const layer = geodata[layer_name]
    return validate_layer_schema(layer);
  });

  if (!validated_layers.every(l => l.status === EValidationStatus.Green)) {
    const support_messages = flatten(validated_layers.map(l => l.support_messages));
    return {
      message: 'Some layers are not valid geodata',
      status: EValidationStatus.Red,
      support_messages
    };
  }


  // Check every spatial_hierarchy level exists in geodata, return early
  const layers_and_levels = check_layers_and_levels(geodata_layer_names, sh_level_names)
  if (layers_and_levels.status === EValidationStatus.Red) {
    return layers_and_levels
  }

  // Every property given in spatial_hierarchy level exists in the geodata

  // `markers` propertiers are valid
  // planning_level_name is a level
  // record_location_selection_level_name is a level
  // denominator_fields exist on the planning_level_name level


  // Given ID fields are unique, exist on all features, and are of consistent type



  return {
    message: 'Invalid spatial_hierarchy',
    status: EValidationStatus.Red,
    support_messages: ['a']
  };
}


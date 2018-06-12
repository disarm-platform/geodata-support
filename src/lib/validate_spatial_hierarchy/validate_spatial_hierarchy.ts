import { flatten } from 'lodash';
import { TGeodata } from '../../config_types/TGeodata';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';
import { validate_layer_schema } from '../validate_geodata';

/**
 * Confirm that the given spatial_hierarchy config object is valid against the given array of geodata layers.
 * For example, that the fields exist, that all layers contain only polygons, and that id fields are unique, exist on
 * all features and have consistent type.
 * @param {TSpatialHierarchy} spatial_hierarchy
 * @param {TGeodata} geodata
 * @returns {TValidationResponse}
 */
export function validate_spatial_hierarchy(spatial_hierarchy: TSpatialHierarchy, geodata: TGeodata): TValidationResponse {
  // Every geodata layer is valid
  const validated_layers = Object.keys(geodata).map(layer_name => {
    return validate_layer_schema(geodata[layer_name]);
  });

  if (!validated_layers.every(l => l.status === EValidationStatus.Green)) {
    const support_messages = flatten(validated_layers.map(l => l.support_messages));
    return {
      message: 'Some layers are not valid geodata',
      status: EValidationStatus.Red,
      support_messages
    };
  }

  // Every spatial_hierarchy level exists in geodata
  const level_names = spatial_hierarchy.levels.map(level => level.name)

  if (!level_names.every(l => Object.keys(geodata).includes(l))) {
    return {
      message: 'Missing some levels from geodata',
      status: EValidationStatus.Red,
      support_messages: ['Name the problem levels']
    }
  }

  if (!Object.keys(geodata).every(k => level_names.includes((k)))) {
    return {
      message: 'Missing some geodata from levels',
      status: EValidationStatus.Red,
      support_messages: ['Name the problem levels']
    }
  }

  // Every property given in spatial_hierarchy level exists in the geodata
  // const level_field_names = ["group_by_field", "field_name", "display_field_name"];

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
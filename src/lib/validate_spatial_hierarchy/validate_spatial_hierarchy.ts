import { flatten } from 'lodash';
import { TGeodata } from '../../config_types/TGeodata';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';
import { summarise } from '../summarise';
import { validate_layer_schema } from '../validate_geodata';
import { check_layers_and_levels } from './check_layers_and_levels';
import { required_properties_on_sh_level } from './required_properties_on_sh_level';
import { summarise_all_levels } from './summarise_all_levels';

/**
 * Confirm that the given spatial_hierarchy config object is valid against the given array of geodata layers.
 * For example, that the fields exist, that all layers contain only polygons, and that id fields are unique, exist on
 * all features and have consistent type.
 * @param {TSpatialHierarchy} spatial_hierarchy
 * @param {TGeodata} geodata
 * @returns {TValidationResponse}
 */
export function validate_spatial_hierarchy(spatial_hierarchy: TSpatialHierarchy, geodata: TGeodata): TValidationResponse {
  const geodata_layer_names = Object.keys(geodata);
  const sh_level_names = spatial_hierarchy.levels.map(level => level.name);

  // Check every geodata layer is valid, and return early if not
  const validated_layers = geodata_layer_names.map(layer_name => {
    const layer = geodata[layer_name];
    return validate_layer_schema(layer);
  });

  if (!validated_layers.every(l => l.status === EValidationStatus.Green)) {
    const support_messages = flatten(validated_layers.map(v => v.support_messages));
    return {
      message: 'Some layers are not valid geodata: either schema failed or some Features are not Polygons',
      status: EValidationStatus.Red,
      support_messages
    };
  }

  // Check every spatial_hierarchy level exists in geodata, return early
  const layers_and_levels = check_layers_and_levels(geodata_layer_names, sh_level_names);
  if (layers_and_levels.status === EValidationStatus.Red) {
    return layers_and_levels;
  }

  // Every property given in spatial_hierarchy level exists in the geodata
  const required_properties_on_all_levels = spatial_hierarchy.levels.map(level => {
    const fields_summary = summarise(geodata[level.name]);
    return required_properties_on_sh_level(level, fields_summary);
  });

  if (!required_properties_on_all_levels.every(l => l.status === EValidationStatus.Green)) {
    const support_messages = flatten(required_properties_on_all_levels.map(v => v.support_messages));
    return {
      message: 'Some fields missing from the level definition',
      status: EValidationStatus.Red,
      support_messages
    };
  }

  return {
    message: 'Incomplete tests',
    status: EValidationStatus.Green
  }
  // TODO: `markers` properties are valid
  const summary = summarise_all_levels(geodata);

  // TODO: planning_level_name is a level
  // TODO: record_location_selection_level_name is a level
  // TODO: denominator_fields exist on the planning_level_name level


  // TODO: The given ID fields are unique, exist on all features, and are of consistent type
  // unique_on_all()
  
  return {
    message: 'Invalid spatial_hierarchy',
    status: EValidationStatus.Red,
    support_messages: ['a']
  };
}



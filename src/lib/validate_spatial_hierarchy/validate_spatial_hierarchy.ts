import { flatten } from 'lodash';
import { TGeodata } from '../../config_types/TGeodata';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';
import { summarise } from '../summarise';
import { validate_layer_schema } from '../validate_geodata';
import { check_layers_and_levels } from './check_layers_and_levels';
import { required_properties_on_sh_level } from './required_properties_on_sh_level';
import { summarise_all_levels } from './summarise_all_levels';
import { markers_valid } from './markers_valid';
import { valid_id_fields } from './valid_id_fields';

/**
 * Confirm that the given spatial_hierarchy config object is valid against the given geodata layers.
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
  if (layers_and_levels.status !== EValidationStatus.Green) {
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
  const geodata_summary = summarise_all_levels(geodata)

  // Check `markers` properties are valid
  const markers_are_valid = markers_valid(spatial_hierarchy, geodata_summary);
  
  if (markers_are_valid.status !== EValidationStatus.Green) {
    return {
      message: 'Some fields missing from the level definition',
      status: EValidationStatus.Red,
      support_messages: markers_are_valid.support_messages
    };
  }
  
  return {
    message: 'Incomplete tests',
    status: EValidationStatus.Green
  }
  
  // The given ID fields are unique, exist on all features, and are of consistent type
  const id_fields_are_valid = valid_id_fields(spatial_hierarchy, geodata_summary)
  if (!id_fields_are_valid.every(l => l.status === EValidationStatus.Green)) {
    const support_messages = flatten(id_fields_are_valid.map(v => v.support_messages));
    return {
      message: 'Problems with fields used as IDs',
      status: EValidationStatus.Red,
      support_messages
    };
  }

  // No failures, so must be a pass. Right?
  return {
    message: 'Spatial hierarchy and geodata are valid',
    status: EValidationStatus.Green
  };
}

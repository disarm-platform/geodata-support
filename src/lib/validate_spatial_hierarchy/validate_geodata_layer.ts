import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';
import { validate_layer_schema } from '../validate_geodata/validate_layer_schema';
import { TGeodataLayer } from '../../config_types/TGeodata';

/**
 * Validate geodata
 * Geodata a `GeoJsonFeatureCollection`, with
 * metadata on the FC's `properties`
 * @param {GeoJson} layer
 * @returns {TValidationResponse}
 */
export function validate_geodata_layer(layer: TGeodataLayer): TValidationResponse {
  // Basic schema check
  const schema_is_valid = validate_layer_schema(layer).status === EValidationStatus.Green;

  if (!schema_is_valid) {
    return {
      message: 'Geodata has invalid schema',
      status: EValidationStatus.Red
    }
  }

  // More specific rules, only run on a valid schema
  // Check all Features are Polygons
  // const id_field = spatial_hierarchy.levels[0].field_name; // TODO: Yup, this is wrong
  const custom_rules_passed = true // check_all_polygons(layer) && id_field_unique(layer, id_field);

  if (custom_rules_passed) {
    return {
      message: "Geodata is valid against schema and custom rules",
      status: EValidationStatus.Green,
    }
  } else {
    return {
      message: "Geodata not valid against custom rules",
      status: EValidationStatus.Red
    }
  }
}

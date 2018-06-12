import { check_all_polygons } from './rules/check_all_polygons';
import { GeoJsonFeatureCollection } from '../../config_types/TGeoJSON';
import { EValidationStatus, TValidationResponse } from './TValidationResponse';
import { validate_schema } from './validate_schema';
import { id_field_unique } from './rules/id_field_unique';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';

/**
 * Validate geodata against the GeoJSON schema
 * @param {GeoJson} geodata
 * @returns {TValidationResponse}
 */
export function validate_geodata(geodata: GeoJsonFeatureCollection): TValidationResponse {
  // Basic schema check
  const schema_is_valid = validate_schema(geodata).status === EValidationStatus.Green;

  if (!schema_is_valid) {
    return {
      message: 'Geodata has invalid schema',
      status: EValidationStatus.Red
    }
  }

  // More specific rules, only run on a valid schema
  // Check all Features are Polygons
  const id_field = spatial_hierarchy.levels[0].field_name; // TODO: Yup, this is wrong
  const custom_rules_passed = check_all_polygons(geodata) && id_field_unique(geodata, id_field);

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

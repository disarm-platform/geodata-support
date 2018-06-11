import { check_all_polygons } from '../rules/check_all_polygons';
import { GeoJsonFeatureCollection } from '../support/TGeoJSON';
import { EValidationStatus, TValidationResponse } from './TValidationResponse';
import { validate_schema } from './validate_schema';

/**
 * Validate geodata
 * @param {GeoJson} geodata
 * @returns {TValidationResponse}
 */
export function validate_geodata(geodata: GeoJsonFeatureCollection): TValidationResponse {
  // Basic schema check
  const schema_is_valid = validate_schema(geodata).status === EValidationStatus.Green;

  // More specific rules
  // Check all Features are Polygons
  const custom_rules_passed = check_all_polygons(geodata);

  if (schema_is_valid && custom_rules_passed) {
    return {
      message: "Geodata is valid against schema and custom rules",
      status: EValidationStatus.Green,
    }
  } else {
    return {
      message: "Geodata is not valid",
      status: EValidationStatus.Red
    }
  }
}
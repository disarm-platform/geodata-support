import Ajv from 'ajv';
import GeojsonSchema from '../../config_types/geojson.schema.json';
import { GeoJson } from '../../config_types/TGeoJSON';
import { EValidationStatus, TValidationResponse } from './TValidationResponse';

const ajv = new Ajv();

/**
 * Check if given geodata is valid GeoJSON
 *
 * @export
 * @param {GeoJson} geodata
 * @returns {TValidationResponse}
 */
export function validate_schema(geodata: GeoJson): TValidationResponse {
  const geojson_schema = GeojsonSchema;
  const schema_valid = ajv.validate(geojson_schema, geodata);

  if (schema_valid) {
    return {
      message: 'Schema validation passed',
      status: EValidationStatus.Green,
    };
  } else {
    return {
      message: `Schema validation errors`,
      status: EValidationStatus.Red,
      support_messages: ajv.errors.map(e => e.message)
    };
  }
}

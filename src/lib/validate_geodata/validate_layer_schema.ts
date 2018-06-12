import Ajv from 'ajv';
import GeojsonSchema from '../../config_types/geojson.schema.json';
import { TGeodataLayer } from '../../config_types/TGeodata';
import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';

const ajv = new Ajv();

/**
 * Check if given geodata is valid GeoJSON
 * @param {TGeodataLayer} layer
 * @returns {TValidationResponse}
 */
export function validate_layer_schema(layer: TGeodataLayer): TValidationResponse {
  const geojson_schema = GeojsonSchema;
  const schema_valid = ajv.validate(geojson_schema, layer);

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

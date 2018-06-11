import Ajv from 'ajv';
import GeojsonSchema from '../support/geojson.schema.json';
import { GeoJson } from '../support/TGeoJSON';
import { EValidationStatus, TValidationResponse } from './TValidationResponse';

const ajv = new Ajv();

export function validate_schema(config: GeoJson): TValidationResponse {
  const geojson_schema = GeojsonSchema;
  const schema_valid = ajv.validate(geojson_schema, config);

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

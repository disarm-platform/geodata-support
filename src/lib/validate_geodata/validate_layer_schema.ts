import Ajv from 'ajv';
import GeojsonSchema from '../../config_types/geojson.schema.json';
import { TGeodataLayer } from '../../config_types/TGeodata';
import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';
import { all_polygons } from '../helpy/all_polygons';

// tslint:disable:no-submodule-imports
import draft_6 from 'ajv/lib/refs/json-schema-draft-06.json';
import draft_7 from 'ajv/lib/refs/json-schema-draft-07.json';
const ajv = new Ajv();

// tslint:disable:no-expression-statement
ajv.addMetaSchema(draft_6)
ajv.addMetaSchema(draft_7)

/**
 * Check if given geodata is a valid GeoJSON FeatureCollection, and that every
 * feature is only of type Polygon
 * @param {TGeodataLayer} layer
 * @returns {TValidationResponse}
 */
export function validate_layer_schema(layer: TGeodataLayer): TValidationResponse {
  const geojson_schema = GeojsonSchema;

  // Basic checks for validity
  const schema_valid = ajv.validate(geojson_schema, layer);
  const checked_all_polygons = all_polygons(layer);

  if (schema_valid && checked_all_polygons) {
    return {
      message: 'Schema validation passed and all polygons',
      status: EValidationStatus.Green,
    }
  } else if (schema_valid && !checked_all_polygons) {
    return {
      message: "Schema passed, but not all features are Polygons",
      status: EValidationStatus.Red,
      support_messages: ['Not all Features are Polygons']
    }
  } else if (!schema_valid && checked_all_polygons) {
    return {
      message: 'Schema validation failed, but all features are Polygons',
      status: EValidationStatus.Red,
      support_messages: [ajv.errorsText()]
    }
  } else {
    return {
      message: 'Schema validation errors',
      status: EValidationStatus.Red,
      support_messages: [ajv.errorsText()]
    };
  }
}

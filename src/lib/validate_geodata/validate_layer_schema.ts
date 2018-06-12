import Ajv from 'ajv';
import GeojsonSchema from '../../config_types/geojson.schema.json';
import { TGeodataLayer } from '../../config_types/TGeodata';
import { EValidationStatus, TValidationResponse } from '../../config_types/TValidationResponse';
import { all_polygons } from '../helpy/all_polygons';

const ajv = new Ajv();

/**
 * Check if given geodata is a valid GeoJSON FeatureCollection, and that every
 * feature is only of type Polygon
 * @param {TGeodataLayer} layer
 * @returns {TValidationResponse}
 */
export function validate_layer_schema(layer: TGeodataLayer): TValidationResponse {
  const geojson_schema = GeojsonSchema;
  const schema_valid = ajv.validate(geojson_schema, layer);

  const checked_all_polygons = all_polygons(layer);

  if (schema_valid && checked_all_polygons) {
    return {
      message: 'Schema validation passed and all polygons',
      status: EValidationStatus.Green,
    }
  } else if (schema_valid && !checked_all_polygons) {
    return {
      message: "Schema"
    }
  } else {
    return {
      message: 'Schema validation errors',
      status: EValidationStatus.Red,
      support_messages: ajv.errors.map(e => e.message)
    };
  }
}

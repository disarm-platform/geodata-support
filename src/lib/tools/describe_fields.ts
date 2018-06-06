import { GeoJsonFeatureCollection } from "./TGeoJSON";

export function all_property_fields(geodata: GeoJsonFeatureCollection) {
  return geodata.features.reduce((acc, f) => {
    return [...acc, ...Object.keys(f.properties)]
  }, [])
}

export function unique_property_fields(geodata: GeoJsonFeatureCollection) {
  return Array.from(new Set(all_property_fields(geodata)))
}

enum FieldType {
  Unknown,
  Inconsistent
}

interface FieldDescription {
  name: string;
  type: string | FieldType;
  count: number;
}

/**
 * If the type of a field is inconsistent (i.e. not the same for every feature), then give it as 'inconsistent'
 */
export function describe_fields(geodata: GeoJsonFeatureCollection, fields: string[]): FieldDescription[] {
  const features = geodata.features

  let result: FieldDescription[] = fields.map(field => {
    return {
      name: field,
      type: FieldType.Unknown,
      count: 0
    }
  })

  fields.forEach(field => {
    features.forEach(feature => {
      let found = result.find(r => r.name === field)
      
      const new_value = feature.properties[field]
      const new_type = new_value ? typeof new_value : FieldType.Unknown

      if (found && new_value) {
        found.type = figure_type(found.type, new_type)
        found.count += 1
      }
    })
  })

  return result

}

function figure_type(existing_type, new_type) {
  if (existing_type === FieldType.Inconsistent) {
    return FieldType.Inconsistent
  } // Not going to get MORE consistent

  if (existing_type === FieldType.Unknown && new_type !== FieldType.Unknown) {
    return new_type
  } // Now you know something

  if (existing_type === new_type) {
    return existing_type
  } // If exist and new are the same, then it's consistent


}

export function common_fields(geodata: GeoJsonFeatureCollection) {
  const features = geodata.features
  const unique_fields = unique_property_fields(geodata);

  return unique_fields.filter(field => {
    return features.every(feature => {
      return feature.properties.hasOwnProperty(field)
    })
  })
}

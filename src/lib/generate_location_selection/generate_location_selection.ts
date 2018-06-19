import { TSpatialHierarchy, TLevel } from "../../config_types/TSpatialHierarchy";
import { TGeodata, TGeodataLayer } from "../../config_types/TGeodata";
import { TLocationSelection, TLocationSelectionOption } from "../../config_types/TLocationSelection";
import { validate_spatial_hierarchy } from "../validate_spatial_hierarchy";
import { EValidationStatus, TValidationResponse } from "../../config_types/TValidationResponse";


export function generate_location_selection(spatial_hierarchy: TSpatialHierarchy, geodata: TGeodata): TLocationSelection | TValidationResponse {
  const validation_result = validate_spatial_hierarchy(spatial_hierarchy, geodata)
  if (validation_result.status === EValidationStatus.Red) {
    return validation_result
  }

  const location_selection: TLocationSelection = {}

  for (const level of spatial_hierarchy.levels) {
    const geodata_layer = geodata[level.name]
    // tslint:disable:no-expression-statement
    // tslint:disable:no-object-mutation
    location_selection[level.name] = generate_location_selection_for_level(geodata_layer, level)
  }


  return location_selection
}

function generate_location_selection_for_level(geodata_layer: TGeodataLayer, level: TLevel): TLocationSelectionOption[] {
  return geodata_layer.features.map(feature => {
    return {
      id: feature.properties[level.field_name],
      name: feature.properties[level.display_field_name],
      category: feature.properties[level.group_by_field]
    }
  })
}

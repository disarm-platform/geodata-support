// Copied from config-validation
export interface TSpatialHierarchy {
  ignore_planning_level_restriction?: boolean;
  data_version: number;
  markers: TMarkers;
  levels: TLevel[];
}

export interface TDenominatorFields {
  [k: string]: string;
}

export interface TMarkers {
  planning_level_name: string;
  record_location_selection_level_name: string;
  denominator_fields: TDenominatorFields;
}

export interface TLevel {
  name: string; // Name of the level
  field_name: string; // Exists on this level
  display_field_name: string; // Only for display, can be same as `field_name`
  group_by_field?: string; // Exists on this level
}


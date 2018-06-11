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
  group_by_field?: string;
  field_name: string;
  display_field_name: string;
  name: string;
}


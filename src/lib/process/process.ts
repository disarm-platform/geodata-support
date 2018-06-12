// import { GeoJson } from '../../config_types/TGeoJSON';
// import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
//
// export interface TGeodataSummary {
//   location_selection?: TLocationSelection[];
//   spatial_hierarchy: TSpatialHierarchy;
//   spatial_hierarchy_valid: boolean; // Whether
//   status: EGeodataValid;
//   messages: string[];
// }
//
// enum EGeodataValid {
//   Green = 'Green, valid',
//   Red = 'Red, invalid'
// }
//
// export interface TFieldSummary {
//   field_name: string,
//   type: string;
//   type_is_consistent: boolean;
//   exists_on_all: boolean; // Exists on every feature
//   unique: boolean; // Where it exists, is it unique
// }
//
// export interface TLocationSelection {
//   id: string | number;
//   name: string;
//   category: string; // The reference to the parent/grouping object
// }
//
// export function process(_geodata: GeoJson, _spatial_hierarchy: TSpatialHierarchy): TGeodataSummary {
//   // if (!validate_geodata(geodata)) return {} // Check we've got inputs required
//
//   // is_valid_spatial_hierarchy = check TFieldSummary[] against spatial_hierarchy
//
//   // if spatial_hierarchy is valid against TFieldSummary[]
//   // generate location_selection
//
//   // return {
//   //   location_selection, // optionally
//   //   spatial_hierarchy,
//   //   status,
//   //   messages
//   // }
//   return {} as TGeodataSummary;
// }
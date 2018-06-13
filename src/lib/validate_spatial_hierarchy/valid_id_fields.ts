import { TValidationResponse, EValidationStatus } from "../../config_types/TValidationResponse";
import { TSpatialHierarchy } from "../../config_types/TSpatialHierarchy";
import { EFieldType, TGeodataSummary } from '../../config_types/TGeodataSummary';
import { TFieldSummary} from "../../config_types/TGeodataSummary";

export function valid_id_fields(spatial_hierarchy: TSpatialHierarchy, geodata_summary: TGeodataSummary): TValidationResponse[] {
  return spatial_hierarchy.levels.map(level => {
    const level_summary = geodata_summary[level.name]
    level.field_name // needs to exist_on_all, be unique, consistent type
    level.display_field_name // needs to exist_on_all, 
    level.group_by_field // if given, needs to exists in summary_fields

    const support_messages = [`Level: ${JSON.stringify(level)}`, `Summary: ${level_summary}`];

    const valid_level_field_name = unique_omnipresent_reliable(find(level.field_name, level_summary));
    if (!valid_level_field_name) {
      return {
        message: 'Invalid level field_name',
        status: EValidationStatus.Red,
        support_messages
      }
    }
    const valid_level_display_field_name = unique_omnipresent_reliable(find(level.display_field_name, level_summary));
    if (!valid_level_display_field_name) {
      return {
        message: 'Invalid level display_field_name',
        status: EValidationStatus.Red,
        support_messages
      }
    }
    const valid_level_group_by_field = level.group_by_field ? unique_omnipresent_reliable(find(level.group_by_field, level_summary)) : true;
    if (!valid_level_group_by_field) {
      return {
        message: 'Invalid level group_by_field',
        status: EValidationStatus.Red,
        support_messages
      }
    }

    return {
      message: `Valid level fields`,
      status: EValidationStatus.Green,
      support_messages
    }
  })
}

function unique_omnipresent_reliable(found: TFieldSummary): boolean {
  return found.unique && found.exists_on_all && valid_type(found.type)
}

function valid_type(type: EFieldType): boolean {
  return (type !== EFieldType.Unreliable) && (type !== EFieldType.NotSet);
}

function find(field_name: string, level_summary: TFieldSummary[]) {
  return level_summary.find(l => l.field_name === field_name);
}
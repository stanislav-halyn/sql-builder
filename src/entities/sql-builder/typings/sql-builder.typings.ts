// Constants
import { SearchConditionTypesE, ColumnTypesE } from '../constants/sql-builder.constants';

export interface ColumnI {
  label: string;
  value: string;
  type: ColumnTypesE;
  placeholder: string;
}

export interface SearchConditionI<V> {
  column: string;
  conditionType: SearchConditionTypesE;
  value: V;
}

export interface SearchConditionOptionI {
  label: string;
  value: SearchConditionTypesE;
  columnTypes: ColumnTypesE[];
}

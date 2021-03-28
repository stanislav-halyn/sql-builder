export enum SearchConditionTypesE {
  EQUALS = 'equals',
  CONTAINS = 'contains',
  STARTS_WITH = 'startsWith',
  IN_LIST = 'inList',
  BETWEEN = 'between',
  GREATER_THAN = 'greaterThan',
  LESS_THAN = 'lessThan',
}

export enum ColumnTypesE {
  STRING = 'string',
  NUMBER = 'number',
}

export const SEARCH_CONDITIONS_OPTIONS = [
  {
    value: SearchConditionTypesE.EQUALS,
    label: 'equals',
    columnTypes: [ColumnTypesE.NUMBER, ColumnTypesE.STRING],
  },
  { value: SearchConditionTypesE.CONTAINS, label: 'contains', columnTypes: [ColumnTypesE.STRING] },
  {
    value: SearchConditionTypesE.STARTS_WITH,
    label: 'starts with',
    columnTypes: [ColumnTypesE.STRING],
  },
  {
    value: SearchConditionTypesE.IN_LIST,
    label: 'in list',
    columnTypes: [ColumnTypesE.NUMBER, ColumnTypesE.STRING],
  },
  { value: SearchConditionTypesE.BETWEEN, label: 'between', columnTypes: [ColumnTypesE.NUMBER] },
  {
    value: SearchConditionTypesE.GREATER_THAN,
    label: 'greater than',
    columnTypes: [ColumnTypesE.NUMBER],
  },
  {
    value: SearchConditionTypesE.LESS_THAN,
    label: 'less than',
    columnTypes: [ColumnTypesE.NUMBER],
  },
];

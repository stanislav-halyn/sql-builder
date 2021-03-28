// Constants
import {
  SearchConditionTypesE,
  SEARCH_CONDITIONS_OPTIONS,
} from '../constants/sql-builder.constants';

// Typings
import { SearchConditionI, ColumnI, SearchConditionOptionI } from '../typings/sql-builder.typings';

// Utils
import {
  equals,
  contains,
  startsWith,
  inList,
  between,
  greaterThan,
  lessThan,
} from './sql-builder.utils';

const SEARCH_CONDITION_PARSERS_MAPPER = {
  [SearchConditionTypesE.EQUALS]: (condition: SearchConditionI<string | number>) =>
    equals(condition.column, condition.value),
  [SearchConditionTypesE.CONTAINS]: (condition: SearchConditionI<string>) =>
    contains(condition.column, condition.value),
  [SearchConditionTypesE.STARTS_WITH]: (condition: SearchConditionI<string>) =>
    startsWith(condition.column, condition.value),
  [SearchConditionTypesE.IN_LIST]: (condition: SearchConditionI<string>) => {
    const parsedValue = condition.value
      .split(', ')
      .map(value => (Number.isNaN(+value) ? value : +value));

    return inList(condition.column, parsedValue);
  },
  [SearchConditionTypesE.BETWEEN]: (condition: SearchConditionI<number[]>) =>
    between(condition.column, condition.value),
  [SearchConditionTypesE.GREATER_THAN]: (condition: SearchConditionI<number>) =>
    greaterThan(condition.column, condition.value),
  [SearchConditionTypesE.LESS_THAN]: (condition: SearchConditionI<number>) =>
    lessThan(condition.column, condition.value),
};

/**
 * Gets search condition sql query which
 * should be inserted into WHERE clause.
 */
export const getSearchConditionSql = (searchCondition: SearchConditionI<any>) => {
  const searchConditionParser = SEARCH_CONDITION_PARSERS_MAPPER[searchCondition.conditionType];
  const parsedSql = searchConditionParser(searchCondition);

  return parsedSql;
};

/**
 * Gets search condition options based
 * on the selected column type
 */
export const getSearchConditionOptions = (column: ColumnI): SearchConditionOptionI[] => {
  const options = SEARCH_CONDITIONS_OPTIONS.filter(option =>
    option.columnTypes.includes(column.type)
  );

  return options;
};

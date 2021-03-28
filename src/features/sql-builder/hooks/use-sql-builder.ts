// Modules
import { useMemo, useState, useCallback } from 'react';

// Hooks
import { useArrayFields } from '@hooks/use-form';

// Entities
import {
  SearchConditionTypesE,
  SearchConditionI,
  sqlBuilderUtils,
  searchConditionUtils,
  ColumnTypesE,
} from '@entities/sql-builder';

// Mocks
import { ColumnsFieldsE, TABLE_MOCK } from '../mocks/table-mock';

const getInitialCondition = (): SearchConditionI<any> => ({
  column: ColumnsFieldsE.USER_EMAIL,
  conditionType: SearchConditionTypesE.EQUALS,
  value: '',
});

const initialState = [getInitialCondition()];

/**
 * Wrapper for `useArrayFields` adjusted to search conditions
 */
export const useSearchConditions = () => {
  const {
    items: searchConditions,
    addItem: addSearchCondition,
    updateItem: updateSearchCondition,
    removeItem: removeSearchCondition,
    resetItems: resetSearchConditions,
  } = useArrayFields({ initialState, getInitialEntity: getInitialCondition });

  return {
    searchConditions,
    addSearchCondition,
    updateSearchCondition,
    removeSearchCondition,
    resetSearchConditions,
  };
};

/**
 * Parses search conditions to sql query
 */
export const useSearchConditionsParser = () => {
  const [sqlQuery, setSqlQuery] = useState('');

  const parseSearchConditions = useCallback(
    (searchConditions: SearchConditionI<any>[]) => {
      const whereClause = searchConditions.map(searchConditionUtils.getSearchConditionSql);

      const sql = sqlBuilderUtils.toSql({
        select: sqlBuilderUtils.select('*'),
        from: sqlBuilderUtils.from(TABLE_MOCK.value),
        where: sqlBuilderUtils.where(sqlBuilderUtils.and(whereClause)),
      });

      setSqlQuery(sql);
    },
    [setSqlQuery]
  );

  const resetSqlQuery = useCallback(() => {
    setSqlQuery('');
  }, [setSqlQuery]);

  return {
    sqlQuery,
    resetSqlQuery,
    parseSearchConditions,
  };
};

/**
 * A hook for getting current column object.
 *
 * NOTE: in real code, this hook for take that value
 * from a selector for finding the object
 */
export const useSearchConditionColumn = (columnValue: string) => {
  const selectedColumnObj = useMemo(
    () => TABLE_MOCK.columns.find(column => columnValue === column.value),
    [columnValue]
  );

  return selectedColumnObj;
};

/**
 * A hook for getting input settings based on the
 * selected condition and column
 */
export const useSearchConditionInputSettings = ({
  columnValue,
  conditionType,
}: {
  columnValue: string;
  conditionType: SearchConditionTypesE;
}) => {
  const selectedColumnObj = useSearchConditionColumn(columnValue);

  const placeholder = useMemo(() => {
    if (conditionType === SearchConditionTypesE.IN_LIST) {
      return 'item, item2';
    }

    return selectedColumnObj?.placeholder || '';
  }, [conditionType, selectedColumnObj]);

  const type = useMemo(() => {
    if (
      conditionType === SearchConditionTypesE.IN_LIST ||
      selectedColumnObj?.type === ColumnTypesE.STRING
    ) {
      return 'text';
    }

    return 'number';
  }, [conditionType, selectedColumnObj]);

  return { placeholder, type };
};

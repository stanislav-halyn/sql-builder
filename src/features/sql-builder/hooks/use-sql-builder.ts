// Modules
import { useState, useCallback } from 'react';

// Hooks
import { useArrayFields } from '@hooks/use-form';

// Entities
import {
  SearchConditionTypesE,
  SearchConditionI,
  sqlBuilderUtils,
  searchConditionUtils,
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

  return {
    sqlQuery,
    parseSearchConditions,
  };
};

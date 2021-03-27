// Modules
import React, { useMemo, useCallback, memo } from 'react';

// Entities
import {
  SearchConditionI,
  SearchConditionTypesE,
  searchConditionUtils,
} from '@entities/sql-builder';

// Components
import SearchConditionBase from '../search-condition-base';
import SearchConditionBetween from '../search-condition-between';

// Mocks
import { TABLE_MOCK } from '../../../mocks/table-mock';

/**
 * Local typings
 */
interface SearchConditionItemPropsI {
  index: number;
  selectedColumn: string;
  conditionType: SearchConditionTypesE;
  value: any;

  updateSearchCondition: (
    index: number,
    updater: (oldItem: SearchConditionI<any>) => SearchConditionI<any>
  ) => void;
  removeSearchCondition: (index: number) => void;
}

/**
 * Search condition item factory which returns
 * search condition depending on the props
 *
 * NOTE: We could've achieved much simpler solution
 * by using `react-hook-form` library for managing the
 * form, but since the requirement is not to use
 * any libraries, I had to come up with this solution
 */
const SearchConditionItem = ({
  index,
  selectedColumn,
  conditionType,
  value,
  updateSearchCondition,
  removeSearchCondition,
}: SearchConditionItemPropsI) => {
  const searchConditionOptions = useMemo(() => {
    const selectedColumnObj = TABLE_MOCK.columns.find(column => selectedColumn === column.value);

    return searchConditionUtils.getSearchConditionOptions(selectedColumnObj!);
  }, [selectedColumn]);

  /**
   * Initializing partial function for updating search condition
   */
  const handleUpdateItem = useMemo(() => updateSearchCondition.bind(null, index), [
    updateSearchCondition,
    index,
  ]);

  const handleRemoveItem = useCallback(() => {
    removeSearchCondition(index);
  }, [removeSearchCondition, index]);

  const memoizedItem = useMemo(() => {
    switch (conditionType) {
      case SearchConditionTypesE.BETWEEN:
        return (
          <SearchConditionBetween
            selectedColumn={selectedColumn}
            conditionType={conditionType}
            value={value}
            searchConditionOptions={searchConditionOptions}
            handleUpdateItem={handleUpdateItem}
            handleRemoveItem={handleRemoveItem}
          />
        );
      default:
        return (
          <SearchConditionBase
            selectedColumn={selectedColumn}
            conditionType={conditionType}
            value={value}
            searchConditionOptions={searchConditionOptions}
            handleUpdateItem={handleUpdateItem}
            handleRemoveItem={handleRemoveItem}
          />
        );
    }
  }, [
    conditionType,
    handleRemoveItem,
    handleUpdateItem,
    selectedColumn,
    value,
    searchConditionOptions,
  ]);

  return memoizedItem;
};

export default memo(SearchConditionItem);

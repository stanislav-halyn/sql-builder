// Modules
import React, { useMemo, useCallback, memo, useEffect } from 'react';
import { MdClear } from 'react-icons/md';
import CSSModules from 'react-css-modules';

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

// Styles
import styles from './search-condition-item.scss';

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
  const selectedColumnObj = useMemo(
    () => TABLE_MOCK.columns.find(column => selectedColumn === column.value),
    [selectedColumn]
  );

  const inputPlaceholder = useMemo(() => {
    if (conditionType === SearchConditionTypesE.IN_LIST) {
      return 'item, item2';
    }

    return selectedColumnObj?.placeholder || '';
  }, [conditionType, selectedColumnObj]);

  const searchConditionOptions = useMemo(
    () => searchConditionUtils.getSearchConditionOptions(selectedColumnObj!),
    [selectedColumnObj]
  );

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

  /**
   * We should reset the `conditionType` field when the user
   * changes `selectedColumn`
   */
  useEffect(() => {
    handleUpdateItem(oldItem => ({
      ...oldItem,
      conditionType: SearchConditionTypesE.EQUALS,
    }));
  }, [selectedColumn, handleUpdateItem]);

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
          />
        );
      default:
        return (
          <SearchConditionBase
            inputPlaceholder={inputPlaceholder}
            selectedColumn={selectedColumn}
            conditionType={conditionType}
            value={value}
            searchConditionOptions={searchConditionOptions}
            handleUpdateItem={handleUpdateItem}
          />
        );
    }
  }, [
    inputPlaceholder,
    conditionType,
    handleUpdateItem,
    selectedColumn,
    value,
    searchConditionOptions,
  ]);

  return (
    <div styleName="common">
      <MdClear styleName="remove-icon" onClick={handleRemoveItem} />

      {memoizedItem}
    </div>
  );
};

export default memo(CSSModules(SearchConditionItem, styles));

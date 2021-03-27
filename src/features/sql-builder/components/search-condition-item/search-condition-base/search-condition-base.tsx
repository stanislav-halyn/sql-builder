// Modules
import React, { ChangeEvent, useCallback } from 'react';

// Entities
import {
  SearchConditionTypesE,
  SearchConditionI,
  SearchConditionOptionI,
} from '@entities/sql-builder';

// Mocks
import { TABLE_MOCK } from '../../../mocks/table-mock';

// Components
import SearchConditionWrapper from '../search-condition-wrapper';

/**
 * Local typings
 */
interface SearchConditionBasePropsI {
  selectedColumn: string;
  conditionType: SearchConditionTypesE;
  value: string;
  searchConditionOptions: SearchConditionOptionI[];
  handleUpdateItem: (
    updater: (oldCondition: SearchConditionI<string>) => SearchConditionI<string>
  ) => void;
}

/**
 * Search condition base which shows basic content
 * for any search condition case
 */
const SearchConditionBase = ({
  selectedColumn,
  conditionType,
  value,
  searchConditionOptions,
  handleUpdateItem,
}: SearchConditionBasePropsI) => {
  const handleColumnChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) =>
      handleUpdateItem(oldCondition => ({
        ...oldCondition,
        column: e.target.value,
      })),
    [handleUpdateItem]
  );

  const handleConditionChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) =>
      handleUpdateItem(oldCondition => ({
        ...oldCondition,
        conditionType: e.target.value as SearchConditionTypesE,
      })),
    [handleUpdateItem]
  );

  const handleValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleUpdateItem(oldCondition => ({
        ...oldCondition,
        value: e.target.value,
      }));
    },
    [handleUpdateItem]
  );

  return (
    <SearchConditionWrapper>
      <select name="columns" value={selectedColumn} onChange={handleColumnChange}>
        {TABLE_MOCK.columns.map(column => (
          <option key={`columns-option-${column.value}`} value={column.value}>
            {column.label}
          </option>
        ))}
      </select>

      <select name="condition" value={conditionType} onChange={handleConditionChange}>
        {searchConditionOptions.map(searchCondition => (
          <option key={`conditions-option-${searchCondition.value}`} value={searchCondition.value}>
            {searchCondition.label}
          </option>
        ))}
      </select>

      <input type="text" value={value} onChange={handleValueChange} />
    </SearchConditionWrapper>
  );
};

export default SearchConditionBase;

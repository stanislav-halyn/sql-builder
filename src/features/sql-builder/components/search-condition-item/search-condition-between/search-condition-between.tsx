// Modules
import React, { ChangeEvent, useCallback, Fragment } from 'react';

// Entities
import {
  SearchConditionTypesE,
  SearchConditionI,
  SearchConditionOptionI,
} from '@entities/sql-builder';

// Utils
import { updateArrayItem } from '@utils/array.utils';

// Mocks
import { TABLE_MOCK } from '../../../mocks/table-mock';

// Components
import SearchConditionWrapper from '../search-condition-wrapper';

/**
 * Local typings
 */
interface SearchConditionBetweenPropsI {
  selectedColumn: string;
  conditionType: SearchConditionTypesE;
  value: number[];
  searchConditionOptions: SearchConditionOptionI[];
  handleUpdateItem: (
    updater: (oldCondition: SearchConditionI<number[]>) => SearchConditionI<number[]>
  ) => void;
}

/**
 * Search condition between which shows the
 * search condition for `between`
 */
const SearchConditionBetween = ({
  selectedColumn,
  conditionType,
  value,
  searchConditionOptions,
  handleUpdateItem,
}: SearchConditionBetweenPropsI) => {
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
      const valueIndex = +(e.target.dataset.valueIndex || 0);

      handleUpdateItem(oldCondition => {
        const arr = oldCondition.value || new Array(2);
        const newValue = updateArrayItem(arr, valueIndex, () => +e.target.value);

        return {
          ...oldCondition,
          value: newValue,
        };
      });
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

      <span>is</span>

      <select name="condition" value={conditionType} onChange={handleConditionChange}>
        {searchConditionOptions.map(searchCondition => (
          <option key={`conditions-option-${searchCondition.value}`} value={searchCondition.value}>
            {searchCondition.label}
          </option>
        ))}
      </select>

      <Fragment>
        <input type="text" data-value-index={0} value={value[0]} onChange={handleValueChange} />

        <span>and</span>

        <input type="text" data-value-index={1} value={value[1]} onChange={handleValueChange} />
      </Fragment>
    </SearchConditionWrapper>
  );
};

export default SearchConditionBetween;

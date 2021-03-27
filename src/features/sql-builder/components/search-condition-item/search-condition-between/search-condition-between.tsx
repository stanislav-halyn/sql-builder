// Modules
import React, { ChangeEvent, useCallback, Fragment } from 'react';

// Entities
import {
  SearchConditionTypesE,
  SearchConditionI,
  SearchConditionOptionI,
  ColumnI,
} from '@entities/sql-builder';

// Utils
import { updateArrayItem } from '@utils/array.utils';

// Mocks
import { TABLE_MOCK } from '../../../mocks/table-mock';

// Components
import { Input, Select } from '@components/controls';
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
 * Local helpers
 */
const getValue = <T extends SearchConditionOptionI | ColumnI>(option: T) => option.value;

const getLabel = <T extends SearchConditionOptionI | ColumnI>(option: T) => option.label;

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
      <Select
        name="columns"
        value={selectedColumn}
        onChange={handleColumnChange}
        options={TABLE_MOCK.columns}
        getValue={getValue}
        getLabel={getLabel}
      />

      <span>is</span>

      <Select
        name="condition"
        value={conditionType}
        onChange={handleConditionChange}
        options={searchConditionOptions}
        getValue={getValue}
        getLabel={getLabel}
      />

      <Fragment>
        <Input type="text" data-value-index={0} value={value[0]} onChange={handleValueChange} />

        <span>and</span>

        <Input type="text" data-value-index={1} value={value[1]} onChange={handleValueChange} />
      </Fragment>
    </SearchConditionWrapper>
  );
};

export default SearchConditionBetween;

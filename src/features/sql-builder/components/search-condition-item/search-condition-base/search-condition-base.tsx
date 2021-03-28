// Modules
import React, { ChangeEvent, useCallback } from 'react';

// Entities
import {
  SearchConditionTypesE,
  SearchConditionI,
  SearchConditionOptionI,
  ColumnI,
} from '@entities/sql-builder';

// Mocks
import { TABLE_MOCK } from '../../../mocks/table-mock';

// Components
import { Input, Select } from '@components/controls';
import SearchConditionWrapper from '../search-condition-wrapper';

/**
 * Local typings
 */
interface SearchConditionBasePropsI {
  inputPlaceholder: string;
  selectedColumn: string;
  conditionType: SearchConditionTypesE;
  value: string;
  searchConditionOptions: SearchConditionOptionI[];
  handleUpdateItem: (
    updater: (oldCondition: SearchConditionI<string>) => SearchConditionI<string>
  ) => void;
}

/**
 * Local helpers
 */
const getValue = <T extends SearchConditionOptionI | ColumnI>(option: T) => option.value;

const getLabel = <T extends SearchConditionOptionI | ColumnI>(option: T) => option.label;

/**
 * Search condition base which shows basic content
 * for any search condition case
 */
const SearchConditionBase = ({
  inputPlaceholder,
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
      <Select
        name="columns"
        value={selectedColumn}
        onChange={handleColumnChange}
        options={TABLE_MOCK.columns}
        getValue={getValue}
        getLabel={getLabel}
      />

      <Select
        name="condition"
        value={conditionType}
        onChange={handleConditionChange}
        options={searchConditionOptions}
        getValue={getValue}
        getLabel={getLabel}
      />

      <Input
        type="text"
        value={value}
        onChange={handleValueChange}
        placeholder={inputPlaceholder}
      />
    </SearchConditionWrapper>
  );
};

export default SearchConditionBase;

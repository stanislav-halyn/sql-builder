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

// Hooks
import { useSearchConditionInputSettings } from '../../../hooks/use-sql-builder';

/**
 * Local typings
 */
interface SearchConditionBasePropsI {
  selectedColumn: string;
  conditionType: SearchConditionTypesE;
  value: string | number;
  searchConditionOptions: SearchConditionOptionI[];
  handleUpdateItem: (
    updater: (oldCondition: SearchConditionI<string | number>) => SearchConditionI<string | number>
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
  selectedColumn,
  conditionType,
  value,
  searchConditionOptions,
  handleUpdateItem,
}: SearchConditionBasePropsI) => {
  const { placeholder, type } = useSearchConditionInputSettings({
    columnValue: selectedColumn,
    conditionType,
  });

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
      const newValue = type === 'text' ? e.target.value : +e.target.value;

      handleUpdateItem(oldCondition => ({
        ...oldCondition,
        value: newValue,
      }));
    },
    [handleUpdateItem, type]
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

      <Input type={type} value={value} onChange={handleValueChange} placeholder={placeholder} />
    </SearchConditionWrapper>
  );
};

export default SearchConditionBase;

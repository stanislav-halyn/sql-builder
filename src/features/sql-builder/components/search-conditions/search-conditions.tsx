// Modules
import React, { memo } from 'react';

// Entities
import { SearchConditionI } from '@entities/sql-builder';

// Components
import { SearchConditionItem } from '../search-condition-item';

/**
 * Local typings
 */
interface SearchConditionsPropsI {
  searchConditions: SearchConditionI<any>[];
  updateSearchCondition: (
    index: number,
    updater: (oldItem: SearchConditionI<any>) => SearchConditionI<any>
  ) => void;
  removeSearchCondition: (index: number) => void;
}

/**
 * Search conditions which shows a list of the
 * user's selected conditions
 */
const SearchConditions = ({
  searchConditions,
  updateSearchCondition,
  removeSearchCondition,
}: SearchConditionsPropsI) => (
  <div>
    {searchConditions.map((searchCondition, index) => (
      <SearchConditionItem
        key={`search-condition-item-${index}`}
        index={index}
        selectedColumn={searchCondition.column}
        conditionType={searchCondition.conditionType}
        value={searchCondition.value}
        updateSearchCondition={updateSearchCondition}
        removeSearchCondition={removeSearchCondition}
      />
    ))}
  </div>
);

export default memo(SearchConditions);

// Modules
import React, { useCallback } from 'react';

// Hooks
import { useSearchConditions, useSearchConditionsParser } from '../../hooks/use-sql-builder';

// Components
import SearchConditions from '../search-conditions';
import GeneratedSql from '../generated-sql';

/**
 * Wrapper for handling the sql builder logic
 */
const SqlBuilder = () => {
  const {
    searchConditions,
    addSearchCondition,
    updateSearchCondition,
    removeSearchCondition,
    resetSearchConditions,
  } = useSearchConditions();

  const { sqlQuery, parseSearchConditions } = useSearchConditionsParser();

  const parseSql = useCallback(() => {
    parseSearchConditions(searchConditions);
  }, [parseSearchConditions, searchConditions]);

  return (
    <div>
      <SearchConditions
        searchConditions={searchConditions}
        updateSearchCondition={updateSearchCondition}
        removeSearchCondition={removeSearchCondition}
      />

      <div>
        <button onClick={addSearchCondition}>Add</button>
      </div>

      <div>
        <button onClick={parseSql}>Parse</button>
        <button onClick={resetSearchConditions}>Reset</button>
      </div>

      <GeneratedSql sqlQuery={sqlQuery} />
    </div>
  );
};

export default SqlBuilder;

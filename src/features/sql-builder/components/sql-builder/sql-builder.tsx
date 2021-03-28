// Modules
import React, { useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import CSSModules from 'react-css-modules';

// Hooks
import { useSearchConditions, useSearchConditionsParser } from '../../hooks/use-sql-builder';

// Components
import { Button, ButtonSizesE, ButtonThemesE } from '@components/controls';
import SearchConditions from '../search-conditions';
import GeneratedSql from '../generated-sql';

// Mocks
import { TABLE_MOCK } from '../../mocks/table-mock';

// Styles
import styles from './sql-builder.scss';

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

  const { sqlQuery, resetSqlQuery, parseSearchConditions } = useSearchConditionsParser();

  const handleRemoveSearchCondition = useCallback(
    (index: number) => {
      if (searchConditions.length === 1) {
        resetSearchConditions();
      } else {
        removeSearchCondition(index);
      }
    },
    [searchConditions, resetSearchConditions, removeSearchCondition]
  );

  const handleSearch = useCallback(() => {
    parseSearchConditions(searchConditions);
  }, [parseSearchConditions, searchConditions]);

  const handleReset = useCallback(() => {
    resetSearchConditions();
    resetSqlQuery();
  }, [resetSqlQuery, resetSearchConditions]);

  return (
    <div styleName="common">
      <h4 styleName="heading">Search for {TABLE_MOCK.label}</h4>

      <SearchConditions
        searchConditions={searchConditions}
        updateSearchCondition={updateSearchCondition}
        removeSearchCondition={handleRemoveSearchCondition}
      />

      <div>
        <Button onClick={addSearchCondition} size={ButtonSizesE.SMALL}>
          And
        </Button>
      </div>

      <div styleName="control-buttons">
        <Button onClick={handleSearch} styleName="search-button">
          <FaSearch size={14} styleName="search-icon" />
          Search
        </Button>

        <Button onClick={handleReset} theme={ButtonThemesE.SECONDARY}>
          Reset
        </Button>
      </div>

      <GeneratedSql sqlQuery={sqlQuery} />
    </div>
  );
};

export default CSSModules(SqlBuilder, styles);

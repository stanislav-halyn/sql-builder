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
        <Button onClick={addSearchCondition} size={ButtonSizesE.SMALL}>
          And
        </Button>
      </div>

      <div styleName="control-buttons">
        <Button onClick={parseSql} styleName="search-button">
          <FaSearch size={14} styleName="search-icon" />
          Search
        </Button>

        <Button onClick={resetSearchConditions} theme={ButtonThemesE.SECONDARY}>
          Reset
        </Button>
      </div>

      <GeneratedSql sqlQuery={sqlQuery} />
    </div>
  );
};

export default CSSModules(SqlBuilder, styles);

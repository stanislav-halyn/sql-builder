// Modules
import React, { memo } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './generated-sql.scss';

/**
 * Local typings
 */
interface GeneratedSqlPropsI {
  sqlQuery: string;
}

/**
 * Generated sql component for showing the
 * the sql query generated using the search conditions
 */
const GeneratedSql = ({ sqlQuery }: GeneratedSqlPropsI) =>
  sqlQuery ? (
    <div styleName="common">
      <pre styleName="query">{sqlQuery}</pre>
    </div>
  ) : null;

export default memo(CSSModules(GeneratedSql, styles));

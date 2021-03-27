// Modules
import React, { memo } from 'react';

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
const GeneratedSql = ({ sqlQuery }: GeneratedSqlPropsI) => (
  <div>
    <textarea readOnly value={sqlQuery} />
  </div>
);

export default memo(GeneratedSql);

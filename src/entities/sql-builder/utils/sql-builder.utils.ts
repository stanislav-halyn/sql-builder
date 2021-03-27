/**
 * Parses a clause value depending on
 * if it's a string or number
 */
const parseClauseValue = (value: string | number) =>
  typeof value === 'string' ? `'${value}'` : value;

/**
 * Builds `select` clause for sql
 */
export const select = (field: string | string[]) => {
  const fieldQuery = Array.isArray(field) ? field.join(', ') : field;

  return `SELECT ${fieldQuery}`;
};

/**
 * Builds `from` clause for sql
 */
export const from = (table: string) => `FROM ${table}`;

/**
 * Builds `where` clause for sql
 */
export const where = (condition: string) => `WHERE ${condition}`;

/**
 * Builds `and` clause for sql
 */
export const and = (conditions: string[]) => `(${conditions.join(' AND ')})`;

/**
 * Builds `or` clause for sql
 */
export const or = (conditions: string[]) => `(${conditions.join(' OR ')})`;

/**
 * Builds `equals` clause for sql
 */
export const equals = (fieldName: string, fieldValue: string | number) => {
  const parsedValue = parseClauseValue(fieldValue);

  return `${fieldName}=${parsedValue}`;
};

/**
 * Builds `contains` clause for sql
 */
export const contains = (fieldName: string, fieldValue: string) =>
  `${fieldName} LIKE '%${fieldValue}%'`;

/**
 * Builds `startsWith` clause for sql
 */
export const startsWith = (fieldName: string, fieldValue: string) =>
  `${fieldName} LIKE '${fieldValue}%'`;

/**
 * Builds `inList` clause for sql
 */
export const inList = <T extends number | string>(fieldName: string, fieldValue: T[]) => {
  const whereValue = fieldValue.map(value => parseClauseValue(value)).join(', ');

  return `${fieldName} IN (${whereValue})`;
};

/**
 * Builds `between` clause for sql
 */
export const between = (fieldName: string, [start, end]: number[]) =>
  `${fieldName} BETWEEN ${start} AND ${end}`;

/**
 * Builds `greaterThan` clause for sql
 */
export const greaterThan = (fieldName: string, fieldValue: number) =>
  `${fieldName} > ${fieldValue}`;

/**
 * Builds `lessThan` clause for sql
 */
export const lessThan = (fieldName: string, fieldValue: number) => `${fieldName} < ${fieldValue}`;

/**
 * Builds sql query
 */
export const toSql = ({
  select: selectClause,
  from: fromClause,
  where: whereClause,
}: {
  select: string;
  from: string;
  where: string;
}) => `${selectClause}\n${fromClause}\n${whereClause}`;

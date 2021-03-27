// Utils
import {
  select,
  from,
  where,
  and,
  or,
  equals,
  contains,
  startsWith,
  inList,
  between,
  greaterThan,
  lessThan,
  toSql,
} from '../sql-builder.utils';

describe('sql-builder.utils.ts', () => {
  describe('`select` should return correct query', () => {
    it('single field', () => {
      const query = select('*');
      const expectedQuery = 'SELECT *';

      expect(query).toEqual(expectedQuery);
    });

    it('array of  fields', () => {
      const query = select(['name', 'age']);
      const expectedQuery = 'SELECT name, age';

      expect(query).toEqual(expectedQuery);
    });
  });

  it('`from` should return correct query', () => {
    const query = from('users');
    const expectedQuery = 'FROM users';

    expect(query).toEqual(expectedQuery);
  });

  describe('`where` should return correct query', () => {
    it('simple query', () => {
      const query = where(equals('user', 1));
      const expectedQuery = 'WHERE user=1';

      expect(query).toEqual(expectedQuery);
    });

    it('complex query', () => {
      const query = where(
        and([
          or([equals('user', 'John'), greaterThan('age', 18)]),
          and([startsWith('user', 'Da'), lessThan('age', 65)]),
        ])
      );
      const expectedQuery = `WHERE ((user='John' OR age > 18) AND (user LIKE 'Da%' AND age < 65))`;

      expect(query).toEqual(expectedQuery);
    });
  });

  it('`and` should return correct query', () => {
    const query = and(['age=10', `name='Jo%'`]);
    const expectedQuery = `(age=10 AND name='Jo%')`;

    expect(query).toEqual(expectedQuery);
  });

  it('`or` should return correct query', () => {
    const query = or(['age=10', `name='Jo%'`]);
    const expectedQuery = `(age=10 OR name='Jo%')`;

    expect(query).toEqual(expectedQuery);
  });

  describe('`equals` should return correct query', () => {
    it('string param', () => {
      const query = equals('username', 'John');
      const expectedQuery = `username='John'`;

      expect(query).toEqual(expectedQuery);
    });

    it('number param', () => {
      const query = equals('age', 18);
      const expectedQuery = 'age=18';

      expect(query).toEqual(expectedQuery);
    });
  });

  it('`contains` should return correct query', () => {
    const query = contains('username', 'oh');
    const expectedQuery = `username LIKE '%oh%'`;

    expect(query).toEqual(expectedQuery);
  });

  it('`startsWith` should return correct query', () => {
    const query = startsWith('username', 'Jo');
    const expectedQuery = `username LIKE 'Jo%'`;

    expect(query).toEqual(expectedQuery);
  });

  describe('`inList` should return correct query', () => {
    it('string param', () => {
      const query = inList('username', ['John', 'David']);
      const expectedQuery = `username IN ('John', 'David')`;

      expect(query).toEqual(expectedQuery);
    });

    it('number param', () => {
      const query = inList('age', [18, 65]);
      const expectedQuery = `age IN (18, 65)`;

      expect(query).toEqual(expectedQuery);
    });
  });

  it('`between` should return correct query', () => {
    const query = between('age', [18, 65]);
    const expectedQuery = `age BETWEEN 18 AND 65`;

    expect(query).toEqual(expectedQuery);
  });

  it('`greaterThan` should return correct query', () => {
    const query = greaterThan('age', 18);
    const expectedQuery = `age > 18`;

    expect(query).toEqual(expectedQuery);
  });

  it('`lessThan` should return correct query', () => {
    const query = lessThan('age', 65);
    const expectedQuery = `age < 65`;

    expect(query).toEqual(expectedQuery);
  });

  it('`toSql` should return correct query', () => {
    const query = toSql({ select: 'SELECT *', from: 'FROM users', where: 'WHERE user=1' });
    const expectedQuery = 'SELECT *\nFROM users\nWHERE user=1';

    expect(query).toEqual(expectedQuery);
  });
});

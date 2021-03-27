// Modules
import { renderHook, act } from '@testing-library/react-hooks';

// Hooks
import { useSearchConditionsParser } from '../use-sql-builder';

// Entities
import { SearchConditionTypesE } from '@entities/sql-builder';

describe('use-sql-builder.ts', () => {
  it('`useSearchConditionsParser` should work correctly', () => {
    const searchConditions = [
      { column: 'username', conditionType: SearchConditionTypesE.EQUALS, value: 'Casey' },
    ];
    const { result } = renderHook(() => useSearchConditionsParser());

    expect(result.current.sqlQuery).toEqual('');

    act(() => {
      result.current.parseSearchConditions(searchConditions);
    });

    expect(result.current.sqlQuery).toEqual(`SELECT *\nFROM sessions\nWHERE (username='Casey')`);
  });
});

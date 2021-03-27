// Modules
import { renderHook, act } from '@testing-library/react-hooks';

// Hooks
import { useArrayFields } from '../use-form';

/**
 * Local typings
 */
interface EntityI {
  name: string;
}

describe('use-form.ts', () => {
  describe('`useArrayFields()` should work correctly', () => {
    const getInitialEntity = (): EntityI => ({ name: 'John' });

    it('should add a new item', () => {
      const initialState = [] as EntityI[];
      const { result } = renderHook(() => useArrayFields({ initialState, getInitialEntity }));

      expect(result.current.items).toEqual([]);

      act(() => {
        result.current.addItem();
      });

      expect(result.current.items).toEqual([{ name: 'John' }]);
    });

    it('should update an item', () => {
      const initialState = [{ name: 'David' }];
      const { result } = renderHook(() => useArrayFields({ initialState, getInitialEntity }));

      act(() => {
        result.current.updateItem(0, { name: 'Joe' });
      });

      expect(result.current.items).toEqual([{ name: 'Joe' }]);
    });

    it('should remove an item', () => {
      const initialState = [{ name: 'Stan' }];
      const { result } = renderHook(() => useArrayFields({ initialState, getInitialEntity }));

      act(() => {
        result.current.removeItem(0);
      });

      expect(result.current.items).toEqual([]);
    });

    it('should reset items', () => {
      const initialState = [] as EntityI[];
      const { result } = renderHook(() => useArrayFields({ initialState, getInitialEntity }));

      act(() => {
        result.current.addItem();
        result.current.addItem();
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.resetItems();
      });

      expect(result.current.items).toEqual([]);
    });
  });
});
